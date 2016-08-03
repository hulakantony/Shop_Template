var menuButton = document.querySelector('.menu-phone a');
var dropMenu = document.querySelector('.dropdown-menu-wrap');
menuButton.onclick = function(e){
	dropMenu.classList.toggle('pressed');
}