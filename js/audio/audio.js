(function(global){
	
	function audioComp(el, src){
		// construct DOM
		el.innerHTML = ` <div class="audioBtn icon-play"></div>
                            <div class="audioBar">
                                <div class="audioIcon icon-btn"></div>
                            </div>
                            <div class="audioTime">
                                <span class="currentTime"></span>
                                <span class="duration"></span>
                            </div>
                        <audio src="${src}"></audio>`;
        // get elements
        el.audio = el.querySelector('audio');
        el.audioBtn = el.querySelector('.audioBtn');
        el.audioIcon = el.querySelector('.audioIcon');
        el.currentTime = el.querySelector('.currentTime');
        el.duration = el.querySelector('.duration');
        el.timer = null;

        el.audio.oncanplay = function(){
        	// toggle play and pause
        	el.audioBtn.addEventListener("click", function(){togglePlay();});
        	el.audioBtn.addEventListener("touchstart", function(){togglePlay();});

        	function togglePlay(){
        		if(el.audioBtn.className.indexOf('icon-play') != -1){
	        		// audio currently paused
	        		el.audio.play();
	        		el.audioBtn.className = 'audioBtn icon-pause';
	        		curTime();
	        		el.timer = setInterval(curTime, 200);
	        	} else {
	        		// audio currently playing
	        		el.audio.pause();
	        		el.audioBtn.className = 'audioBtn icon-play';
	        		clearInterval(el.timer);
	        	}
        	}
        	
        	// when ended
        	el.audio.onended = function(){
        		el.audioBtn.className = 'audioBtn icon-play';
        		clearInterval(el.timer);
        	};

        	// display current time and duration
			el.currentTime.innerHTML = formateTime(el.audio.currentTime);
			el.duration.innerHTML = ' / ' + formateTime(el.audio.duration);

			// init drag function of the audioIcon
			hDrag(el.audioIcon);
        };

		function curTime(){
			var scale = el.audio.currentTime/el.audio.duration;
			// 15 is the approximate site of el.audioIcon
			var maxDist = el.audioIcon.parentNode.clientWidth - 15;
			el.currentTime.innerHTML = formateTime(el.audio.currentTime);
			el.audioIcon.style.left = (scale * maxDist) + 'px';
		}
		
		function hDrag(btn){
			btn.addEventListener('mousedown', function(e){
				var posX = e.clientX - btn.offsetLeft;
				// 15 is the approximate site of el.audioIcon
				var maxDist = btn.parentNode.clientWidth - 15;

				document.onmousemove = function(e){
					var l = e.clientX - posX;

					l = l < 0 ? 0 : l > maxDist ? maxDist : l;
					btn.style.left = l + 'px';

					var scale = l/maxDist;
					el.audio.currentTime = scale * el.audio.duration;
					curTime();
				};

				document.onmouseup = function(){
					document.onmousemove = null;
				}

				return false;
			}, false);

			btn.addEventListener('touchstart', function(e){
				var posX = e.clientX - btn.offsetLeft;
				// 15 is the approximate site of el.audioIcon
				var maxDist = btn.parentNode.clientWidth - 15;

				document.touchmove = function(e){
					var l = e.clientX - posX;

					l = l < 0 ? 0 : l > maxDist ? maxDist : l;
					btn.style.left = l + 'px';

					var scale = l/maxDist;
					el.audio.currentTime = scale * el.audio.duration;
					curTime();
				};
				
				document.touchend = function(){
					document.onmousemove = null;
				}

				return false;
			}, false);

			
		}

	}

	function formateTime(seconds){
		return padZero(Math.floor(seconds/60)) + ":" + padZero(Math.floor(seconds%60));

		function padZero(num){
			num = num < 10 ? '0' + num : String(num);
			return num;
		}
	}

	// Expose utility to the global object
	global.audioComp = audioComp;

})(window);