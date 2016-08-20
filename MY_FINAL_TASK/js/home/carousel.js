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

	var carousel = document.querySelectorAll('.carousel');
	var carouselPhone = document.querySelector('.carousel-phone')
	var points = document.querySelectorAll('.points li a');
	var position = +document.querySelector('.points li a.active').getAttribute('data-shift');
	var interval = setInterval(nextStep, 3000);
	function addActiveClass(e){
		for(var i =0; i< points.length; i++){
			var point = points[i];
			point.classList.remove('active');
		}
		e.target.classList.add('active');
		for(var j =0; j<carousel.length; j++){
			carousel[j].style.left = e.target.dataset.shift + '%';
		}
		position = +e.target.dataset.shift;
		clearInterval(interval);
		return false;
	}
	for(var i =0; i<points.length; i++){
		var point = points[i];
		addEvent('click', point, addActiveClass);
	}
	
	function nextStep(){
		if(position <= -300){
			position = 0;
			carousel[0].style.left = 0;	
			carouselPhone.style.left = 0		
		} else{			
			carousel[0].style.left = position - 100 + '%';
			carouselPhone.style.left = position - 100 + '%';
			position -= 100;			
		}
		for(var i = 0; i<points.length; i++){
			var point = points[i];
			point.classList.remove('active');
			if(+point.dataset.shift === position){
				point.classList.add('active');
			}
		}				
	}