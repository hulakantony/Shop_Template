
	function removeCatalogItem(e){
		var totalPrice = document.querySelector('.total-price');
		var target = e.target;
		if(target.className !== 'remove-button'){
			target = target.parentNode;
		}
		e.preventDefault();
		var currentItem = target.parentNode;
		while(currentItem.className !== 'item existed'){
			currentItem = currentItem.parentNode;
		}
		
		var currentItemPrice = currentItem.querySelector('.item-price').textContent;
		var headerPrice = document.querySelector('.header-price');
		var intRemovedPrice = currentItemPrice.split('').slice(1).join('').replace(/\s+/g, '');
		var intHeaderPrice = headerPrice.textContent.split('').slice(1).join('').replace(/\s+/g, '');
		var newPrice = parseFloat(intHeaderPrice) - parseFloat(intRemovedPrice);
		newPrice = ''  + newPrice.toFixed(2);
		newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
		headerPrice.textContent = '£' + newPrice;
		totalPrice.textContent = '£' + newPrice;
		localStorage.setItem('headerPrice', headerPrice.textContent);

		var headerCount = document.querySelector('.header-count');
		var countStringArr = headerCount.textContent.split('');
		var count = countStringArr.slice(1, countStringArr.length-1).join('');
		var itemQuantity = +currentItem.querySelector('.quantity').textContent;
		count = +count - itemQuantity;		
		headerCount.textContent = '('+ count + ')';
		localStorage.setItem('headerCount', headerCount.textContent);

		container.removeChild(currentItem);
		localStorage.setItem('someItemsRemoved', 'true');		
		var existedItems = document.querySelectorAll('.existed');//сохраняем html использованных элементов
		var existedInnerHTML = '';
		for(var i=0; i<existedItems.length; i++){
			existedInnerHTML += existedItems[i].outerHTML;
		}
		localStorage.setItem('shoppingBagHTML', existedInnerHTML);
		if(!existedItems.length){
			localStorage.setItem('shoppingBagHTML', '');
		}
		if(count === 0){
			headerCount.textContent = '';
			headerPrice.textContent = '';
			localStorage.setItem('headerPrice', headerPrice.textContent);
			localStorage.setItem('headerCount', headerCount.textContent);
			container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
			localStorage.setItem('isEmpty', 'true');
			localStorage.setItem('newItemAdded', 'false');
			totalPrice.textContent = ''			
		}
		return false;
	}

	var items = document.querySelectorAll('.existed');
	for(var j=0; j<items.length; j++){		
		items[j].addEventListener('click', removeCatalogItem);				
	}
