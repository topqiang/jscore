 (function(){

	window.onload = function(){
		toggleMenu()
		loadContents();
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

	// load contents for contents page
	function loadContents(){
		ajax({
			url: '../contents.json',
			succ: function(d){
				prepareContents(d);
			}
		});

		function prepareContents(d){
			var anchor = document.getElementById('contentsAnchor');
			var loading = document.getElementById('loading');
			var footer = document.getElementById('footer');
			anchor.innerHTML = '';

			// disable loading gif
			loading.style.display = "none";

			// add weekly contents
			for(var i=0, j=d.length; i<j; i++){
				anchor.innerHTML += `
					<div class="col-lg-6"> 
	                    <h2>Week ${d[i].id}</h2>
	                    <div class="text">
	                        <p>${d[i].topicEng}</p>
	                        <p class="ch minor-text">${d[i].topicChi}</p>
	                        <p>
	                        	<div class="audioWrapper" src="../assets/w${d[i].id}/w${d[i].id}-audio.mp3"></div>
                        	</p>
	                        <button class="btn btn-primary">
	                        	<a href="../assets/w${d[i].id}/w${d[i].id}-material.zip">
	                        		<i class="icon-download"></i>Download .zip
	                        	</a>
	                        </button>
	                    </div>
	                </div>`;
			}

			// init audio
			var audios = document.getElementsByClassName('audioWrapper');
			for(var i=0, j=audios.length; i<j; i++){
				audioComp(audios[i], audios[i].getAttribute('src'));
			}

			// add footer
			footer.innerHTML = `<div class="footer">
							        <div class="container">
							            <div class="text-center">
							            	Page crafted by <a href="https://github.com/antipasjiajia">Antipasjiajia</a>.
						            	</div>
							        </div>
							    </div>`;

		}
	}
})();