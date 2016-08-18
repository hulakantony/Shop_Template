	var items = document.querySelectorAll('.item');
	function ItemOptions(image, name, price){
		this.image = image;
		this.name = name;
		this.price = price;
	}
	function saveOptions(e){
		var target = e.target;
		if(target.className !== 'item-link'){
			target = target.parentElement;
		}
		//e.preventDefault();
		var item = target.parentElement;
		while(item.classList.contains('item')){
			item = item.parentElement;
		}
		var itemName = item.querySelector('.item-descr').textContent;
		var itemPhoto = item.querySelector('.item-image').src;
		var itemPrice = item.querySelector('.item-price').textContent;

		var itemObject = new ItemOptions(itemPhoto, itemName, itemPrice);
		var jsonItem = JSON.stringify(itemObject);

		localStorage.setItem("itemProp", jsonItem);
		alert(jsonItem);
		//return false;
	}
	for(var i = 0; i<items.length; i++){
		items[i].addEventListener('click', saveOptions);
	}

	window.onload = function(){
		var itemObj = JSON.parse(localStorage.getItem("itemProp"));
		var largeImage = document.querySelector('.large-image');
		var itemName = document.querySelector('.item-name');
		var itemPrice = document.querySelector('.info-price');
		largeImage.src = itemObj.image;
		itemName.textContent = itemObj.name;
		itemPrice.textContent = itemObj.price;
		var thumbsImg = document.querySelectorAll('.thumbs li img');
		for(var i =0; i<thumbs.length; i++){
			thumbsImg[i].src = itemObj.image;
		}
		var thumbsA = document.querySelectorAll('.thumbs li a');
		for(var j =0; j<thumbs.length; j++){
			thumbsA[i].href = itemObj.image;
		}
	}
	var jsonArray =[];
//--------------------------------------------------------------
	function AddToBagOptions(image, price, name, size, color){
		this.image = image;
		this.price = price;
		this.name = name;
		this.color = color;
		this.size = size;
	}
	var addToBagButton = document.querySelector('.add-to-bag-btn');

	function addToBag(e){
	 
		var image = document.querySelector('.large-image').src;
		var price = document.querySelector('.info-price').textContent;
		var name = document.querySelector('.info-name').textContent;
		var size = document.querySelector('.size-buttons li.selected').textContent;
		var color = document.querySelector('.color-buttons li.selected').textContent;

		var bagObject = new AddToBagOptions(image, price, name, size, color);
		jsonArray.push(bagObject);
		var bagJson = JSON.stringify(jsonArray);

		localStorage.setItem('itemToBag', bagJson);
	}
	addToBagButton.addEventListener('click', addToBag);
//--------------------------------------------------------------------

	window.onload = function(){
		var newItem = JSON.parse(localStorage.getItem("itemToBag"));

		var item = document.createElement('article');
		item.className = 'item';

		var photoPriceDiv = document.createElement('div');
		photoPriceDiv.className = 'photo-price';
		photoPriceDiv.classList.add('remove');

		var imageWrap = document.createElement('div');
		imageWrap.className = 'image-wrap';

		var itemImage = document.createElement('img');
		itemImage.src = newItem.image;
		var hidePhoto = document.createElement('div');
		hidePhoto.className = 'hide-photo';
		
		imageWrap.appendChild(itemImage);
		imageWrap.appendChild(hidePhoto);

		var itemPrice = document.createElement('p');
		itemPrice.className = 'item-price';
		itemPrice.classList.add('remove');
		itemPrice.textContent = newItem.price;

		photoPriceDiv.appendChild(imageWrap);
		photoPriceDiv.appendChild(hidephoto);

		var itemDescription = document.createElement('div');
		itemDescription.className ='item-description';
		itemDescription.classList.add('remove');

		var itemName = document.createElement('p');
		itemName.className ='item-name';
		itemName.textContent = newItem.name;

		var itemColor = document.createElement('p');
		itemColor.className ='item-color';
		itemColor.classList.add('characteristics');
		itemColor.textContent = 'Color: ' + newItem.color;

		var itemSize = document.createElement('p');
		itemColor.className ='item-size';
		itemColor.classList.add('characteristics');
		itemColor.textContent = 'Size: ' + newItem.size;

		var itemQuantity = document.createElement('p');
		itemQuantity.className ='item-quantity';
		itemQuantity.classList.add('characteristics');
		itemColor.textContent = 'Quantity: 1';

		var removeButton = document.createElement('a');
		removeButton.className = 'remove-button';
		removeButton.classList.add('remove');

		var removeButtonText = document.createElement('p');
		removeButtonText.textContent = 'Remove item';

		removeButton.appendChild(removeButtonText);

		itemDescription.appendChild(itemName);
		itemDescription.appendChild(itemColor);
		itemDescription.appendChild(itemSize);
		itemDescription.appendChild(itemQuantity);
		itemDescription.appendChild(removeButton);

		item.appendChild(photoPriceDiv);
		item.appendChild(itemDescription);

		var bagSection = document.querySelector('.shopping-bag-items');
		bagSection.appendChild(item);

	}

