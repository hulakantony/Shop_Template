
function carouselMove(){
	
	

}
var carousel = document.querySelectorAll('.carousel');
var points = document.querySelectorAll('.points li a');
function addActiveClass(elem, shift){
	for(var i =0; i< points.length; i++){
		var point = points[i];
		point.classList.remove('active');
	}
	points[1].classList.add('active');
	carousel.style.left = -100 + '%';
	return false;
}
points[1].addEventListener('click', addActiveClass);

(function(){
	var position = 0;
	function nextStep(){
		carousel.style.left = position - 100 + '%';
		position = parseInt(carousel.getComputedStyle().left);
		if(position === 300){
			position = 0;
		}
	}
})()