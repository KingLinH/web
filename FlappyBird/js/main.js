function $(id) {
	return document.getElementById(id);
}
var box = $('box');
var start = $('start');
var bird = $('bird');
var over = $('over');
var finalscore = $('finalscore');
var h6 = $('score');
var img = $('img');
var regame = $('regame');
var score = 0;
var mark = 0;
var birdTimer = null;
var same = null;

start.onclick = function() {
	start.style.display = 'none';
	birdTimer = setInterval(function() {
		if (bird.offsetTop >= 464) {
			bird.style.top = 464 + 'px';
		}
		bird.style.top = bird.offsetTop + 1 + 'px';
	}, 8)

	/* 鸟 */
	document.onclick = function() {
		if (bird.offsetTop <= 24) {
			bird.style.top = 24 + 'px';
		}
		bird.style.top = bird.offsetTop - 35 + 'px';

	}


	/* 柱子 */
	var pillarsTimer = setInterval(pillars, 2000);

	function pillars() {
		var pillarsDown = document.createElement('div');
		var pillarsUp = document.createElement('div');
		pillarsDown.id = new Date().getTime();
		pillarsDown.className = 'pillarsDown';
		pillarsUp.className = 'pillarsUp';
		pillarsUp.style.top = parseInt(Math.random() * 228 + 192) + 'px';
		pillarsUp.style.left = 288 + 'px';
		pillarsDown.style.top = -(420 - parseInt(pillarsUp.style.top)) + 'px';
		pillarsDown.style.left = 288 + 'px';
		box.appendChild(pillarsDown);
		box.appendChild(pillarsUp);
		var pillarsGo = setInterval(function() {
				pillarsDown.style.left = pillarsDown.offsetLeft - 1 + 'px';
				pillarsUp.style.left = pillarsUp.offsetLeft - 1 + 'px';

				var pillar = document.getElementsByClassName('pillarsDown');
				var pillarUp = document.getElementsByClassName('pillarsUp');

				for (var i = 0; i < pillar.length; i++) {
					if (bird.offsetLeft + 48 >= pillarsDown.offsetLeft && bird.offsetLeft <= pillarsDown.offsetLeft + 52) {
						if (pillar[i].id != same) {
							mark++;
						}
						score = parseInt(mark / 202);
						h6.innerHTML = 'score:' + score;
					}
					if (checkBlockCollision(bird, pillar[i]) || checkBlockCollision(bird, pillarUp[i])) {
						clearInterval(pillarsTimer);
						clearInterval(birdTimer);
						clearInterval(pillarsGo);
						document.onclick = null;
						finalscore.innerHTML = 'score:' + score;
						if (score >= 0 && score <= 50) {
							img.src = 'img/tong.png';
						} else if (score > 50 && score <= 100) {
							img.src = 'img/yin.png';
						} else {
							img.src = 'img/jin.png';
						}
						over.style.display = 'block';
						regame.style.display = 'block';
					}
				}

				if (pillarsDown.offsetLeft <= -52) {
					clearInterval(pillarsGo);
					box.removeChild(pillarsDown);
					box.removeChild(pillarsUp);
				}
			},
			10)
	}

	/* 死亡检测 */
	function checkBlockCollision(block1, block2) {
		var left1 = block1.offsetLeft;
		var left2 = block2.offsetLeft;

		var top1 = block1.offsetTop;
		var top2 = block2.offsetTop;

		var width1 = block1.offsetWidth;
		var width2 = block2.offsetWidth;

		var height1 = block1.offsetHeight;
		var height2 = block2.offsetHeight;

		var center1 = {
			x: left1 + width1 / 2,
			y: top1 + height1 / 2
		}
		var center2 = {
			x: left2 + width2 / 2,
			y: top2 + height2 / 2
		}

		var diffX = Math.abs(center1.x - center2.x);
		var diffY = Math.abs(center1.y - center2.y);

		if (diffX < (width1 + width2) / 2 && diffY < (height1 + height2) / 2) {
			return true;
		} else {
			return false;
		}
	}
}

regame.onclick = function() {
	location.reload();
}
