(function(){

	window.onload = function(){
		toggleMenu();
	}

	// toggle navigation menu
	function toggleMenu(){
		var menuBtn = document.getElementById('menuBtn');
		var nav = document.getElementById('nav');
		menuBtn.onclick = function(){
			if(nav.className.indexOf('nav-active')==-1){
				// menu is hiding
				nav.className = 'nav nav-active';
			} else{
				// menu is showing
				nav.className = 'nav';
			}
		}
	}

	
})();