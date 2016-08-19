​(function(e){

e.matches || (e.matches=e.matchesSelector||function(selector){
  var matches = document.querySelectorAll(selector), th = this;
  return Array.prototype.some.call(matches, function(e){
     return e === th;
  });
});

})(Element.prototype);