var newItems = JSON.parse(localStorage.getItem("itemToBag"));
function checkLastChild(){		
		if(newItems !== null){
		var lastElement = newItems[newItems.length-1];		
	
		for(var i =0; i<newItems.length-1; i++){
			var item = newItems[i];
			if(lastElement.name === item.name && lastElement.color === item.color && lastElement.size === item.size){				
				item.quantity = +item.quantity + 1;				
				newItems.pop();
				newItems = JSON.stringify(newItems);
				localStorage.setItem('itemToBag', newItems);
				return;
			}
		}	
		}	
	}	
checkLastChild();