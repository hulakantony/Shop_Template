var values = document.querySelectorAll('.values');
 var dragging = false;
 var valuesPosition = 0;
 var contentElem = document.querySelector('.content-wrap');
 var contentLeftPosition = contentElem.getBoundingClientRect().left;
 document.body.onresize = function(){
		contentLeftPosition = contentElem.getBoundingClientRect().left;
	}
function dragStart(e){
		var target = e.target;
		if(target.className !== 'values'){
			target = target.parentElement;
		}
		
		var valueElems = target.querySelectorAll('.value');
		var notSelectedElem = target.querySelector('.not-selected');		
		var valuesCoords = getCoords(target);
		var shiftX = e.pageX - valuesCoords.left;
		var minDistance = 0;
		var bodyCoords = getCoords(document.body);
		var lastChildPosition = valueElems[valueElems.length-1].getBoundingClientRect().left;
		
		document.onmousemove = function(e){
			contentLeftPosition = contentElem.getBoundingClientRect().left;
			e.stopImmediatePropagation();
			var newLeft = e.pageX - shiftX - bodyCoords.left;
			if(newLeft > 0){
				newLeft = 0;
			}
			lastChildPosition = valueElems[valueElems.length-1].getBoundingClientRect().left;			
			if(lastChildPosition < contentLeftPosition){					
				dragging = true;
				return;
			
			}
			target.style.left = newLeft + 'px';			
			dragging = true;
			target.style.transition = 'none';
				
		}
		document.onmouseup = function(e){
			document.onmousemove = null;
			var minDistance = getMinDistance(valueElems).minDistance;		
			target.style.left = target.getBoundingClientRect().left - minDistance + 'px';			
		}	
		
		
		dragging = false;
		target.style.transition = '';
		valuesPosition = getComputedStyle(target).left;
		return false;
	}
//------------------------------------------------------------------------------
	function getMinDistance(array){
		var firstElem = array[0];
		var firstElemPosition = firstElem.getBoundingClientRect().left;
		var minDistance = 0;
		if(firstElemPosition < 0){
			minDistance = Math.abs(firstElemPosition) + contentLeftPosition;
		} else {
			minDistance = firstElemPosition - contentLeftPosition;
		}
		
		for(var i =1; i< array.length; i++){
			var elem = array[i];
			var elemPosition = elem.getBoundingClientRect().left;
			var elemDistance = 0;
			if(elemPosition < 0){				
				continue;
			} else {
				elemDistance = elemPosition - contentLeftPosition;
			}			
			if(elemDistance < minDistance) {
				minDistance = elemDistance;				
			}	
		}
		return {
			minDistance: minDistance,
			
		};
	}

//--------------------------------------------------------------------------------
	function selectFilterValue(e){
		if(!dragging){
			var target = e.target;			
			if(!target.classList.contains('value')){
				target = target.parentElement;
			}
			
			var valuesContainer = target.closest('.values');
			var valuesWrap = valuesContainer.closest('.values-wrap');
			var valuesContainerTitle = valuesWrap.querySelector('.style-title');

			var filterTablet  = document.querySelector('.filter-tablet');
			var filterTabletCategories = filterTablet.querySelectorAll('.tablet-filter-text span');			
			var targetLeftPosition = target.getBoundingClientRect().left;
			valuesPosition = getComputedStyle(valuesContainer).left;			
			var values = valuesContainer.querySelectorAll('.value');
			console.log(valuesContainerTitle.innerHTML);
			for(var i =0; i<values.length; i++){
				values[i].classList.remove('selected');				
			}
			for(var j = 0; j<filterTabletCategories.length; j++){
				if(valuesContainerTitle.classList.contains(filterTabletCategories[j].className)){
					filterTabletCategories[j].textContent = target.firstChild.textContent;
					filterTabletCategories[j].style.color = "#c82749";
				}
			}
			target.classList.add('selected');
			
			var notSelectedElem = valuesContainer.querySelector('.not-selected');
			
			if(notSelectedElem !== null){
				valuesContainer.style.left = parseInt(valuesPosition) -targetLeftPosition + contentLeftPosition + notSelectedElem.offsetWidth + 'px';
				valuesContainer.removeChild(notSelectedElem);		
			} else {		
				valuesContainer.style.left = parseInt(valuesPosition) + contentLeftPosition - targetLeftPosition + 'px';			
			}	
		}
	}
	
	function getCoords(elem) { 
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
  }
 	
	
document.addEventListener('mousedown', dragStart, true);
	for(var i = 0; i< values.length; i++){			
		values[i].addEventListener('click', selectFilterValue);		
		
		values[i].ondragstart = function() {return false;};
}
	function addEvent(evnt, elem, func) {
	   if (elem.addEventListener)  
	      elem.addEventListener(evnt,func,false);
	   else if (elem.attachEvent) { 
	      elem.attachEvent("on"+evnt, func);
	   }
	   else { 
	      elem[evnt] = func;
	   }
	}