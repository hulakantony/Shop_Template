var filterTablet = document.querySelector('.filter-tablet');
function shiftOnClick(){
	var valueSpans = document.querySelectorAll('.value');
	for(var j = 0; j<valueSpans.length; j++){
		var value = valueSpans[j];
		if(value.classList.contains('selected')){
			var valuesContainer = value.closest('.values');
			var valuePosition = value.getBoundingClientRect().left;
			var valuesContainerPosition = getComputedStyle(valuesContainer).left;
			valuesContainer.style.left = parseInt(valuesContainerPosition) - valuePosition + contentLeftPosition + 'px';
		}
	}	
}
filterTablet.onclick = function(){	
	filterModal.classList.toggle('pressed');	
	shiftOnClick();		
}