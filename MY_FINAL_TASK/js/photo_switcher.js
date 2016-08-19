var largeImg = document.querySelector('.large-image');
var thumbs = document.querySelector('.thumbs');

	thumbs.onclick = function(e){
		var target = e.target;
		if(target.href === largeImg.src){
			return;
		}
		while (target != this) {

        if (target.nodeName == 'A') {
        	var targetImg = target.querySelector('img');        	
          showThumb(target.href);
          getDark(targetImg);
          return false;
        }

        target = target.parentNode;
      }
	}
	function showThumb(href){
		largeImg.src = href;
	}
	function getDark(elem){
		var usedThumb = document.querySelector('.used-thumb');
		usedThumb.classList.remove('used-thumb');
		elem.classList.add('used-thumb');
	}