//------------------подгружаем свойства товара из каталога-----
	window.onload = function(){
		var itemObj = JSON.parse(localStorage.getItem("itemProp"));
		var largeImage = document.querySelector('.large-image');
		var itemName = document.querySelector('.item-name');
		var itemPrice = document.querySelector('.info-price');
		largeImage.src = itemObj.image;
		itemName.textContent = itemObj.name;
		itemPrice.textContent = itemObj.price;
		var thumbsImg = document.querySelectorAll('.thumbs li img');
		for(var i =0; i<thumbsImg.length; i++){
			thumbsImg[i].src = itemObj.image;
		}
		var thumbsA = document.querySelectorAll('.thumbs li a');
		for(var j =0; j<thumbsA.length; j++){
			thumbsA[j].href = itemObj.image;
		}	
		//-------------------в отдельный скрипт на async
		var newHeaderPrice = localStorage.getItem('headerPrice');
			var newHeaderCount = localStorage.getItem('headerCount');
			if(newHeaderCount !== null || newHeaderPrice !== null){
				var headerPrice = document.querySelector('.header-price');
				var headerCount = document.querySelector('.header-count');
				headerPrice.textContent = newHeaderPrice;
				headerCount.textContent = newHeaderCount;
			} else {
				return;
			}
		//-------------------------------------------------------
	}
	window.onbeforeunload = function() {
	  localStorage.removeItem("ItemProp");
	};
	
//--------------обработчик события добавления товара в корзину--------

	function AddToBagOptions(image, price, name, size, color, quantity){
		this.image = image;
		this.price = price;
		this.name = name;
		this.color = color;
		this.size = size;
		this.quantity = quantity;
	}
	
	function addToBag(e){
	 var itemObj = JSON.parse(localStorage.getItem("itemProp"));
	 	jsonArray = JSON.parse(localStorage.getItem('itemToBag'));
	 	if(!jsonArray){
	 		var jsonArray = [];
	 	}
		var image = itemObj.image;
		var price = itemObj.price;
		var name = itemObj.name;
		var size = document.querySelector('.size-buttons li.selected').textContent;
		var color = document.querySelector('.color-buttons li.selected').textContent;
		var quantity = 1;

		var bagObject = new AddToBagOptions(image, price, name, size, color, quantity);
			jsonArray.push(bagObject);
		var bagJson = JSON.stringify(jsonArray);		
		localStorage.setItem('itemToBag', bagJson);

		updateHeaderPrice(price);
		updateItemsCount();
		localStorage.setItem('newItemAdded', 'true');//запоминаем в хранилище, что добавили элемент, для проверки на странице корзины
		window.location.href = 'shopping_bag.html'
	}
	var addToBagButton = document.querySelector('.add-to-bag-btn');
	addToBagButton.addEventListener('click', addToBag);


//------------------изменение цены в хедере--------------
	function updateHeaderPrice(value){
		var headerPrice = document.querySelector('.header-price');
		var intAddedPrice = value.split('').slice(1).join('').replace(/\s+/g, '');
		var intHeaderPrice = headerPrice.textContent.split('').slice(1).join('').replace(/\s+/g, '');
		var newPrice = 0;
		if(headerPrice.textContent === ''){		//если значений нет	
			newPrice =  parseFloat(intAddedPrice);
			newPrice = ''  + newPrice.toFixed(2);
			newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
			headerPrice.textContent = '£' + newPrice;
			localStorage.setItem('headerPrice', headerPrice.textContent);
		} else {		//если значения есть 		
			newPrice = parseFloat(intHeaderPrice) + parseFloat(intAddedPrice);
			newPrice = ''  + newPrice.toFixed(2);
			newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
			headerPrice.textContent = '£' + newPrice;
			localStorage.setItem('headerPrice', headerPrice.textContent);
		}
	}

//------------------изменение кол-ва в хедере----------------
	function updateItemsCount(){
		var headerCount = document.querySelector('.header-count');
		var countStringArr = headerCount.textContent.split('');
		var count = countStringArr.slice(1, countStringArr.length-1).join('');
		count = +count + 1;
		console.log(count);
		headerCount.textContent = '('+ count + ')';
		localStorage.setItem('headerCount', headerCount.textContent);		
	}