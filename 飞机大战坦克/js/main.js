/* 背景移动 */
var oBg1 = document.getElementById('bg1');
var oBg2 = document.getElementById('bg2');
var timerBg = setInterval(function() {
	oBg1.style.top = oBg1.offsetTop + 1 + 'px';
	oBg2.style.top = oBg2.offsetTop + 1 + 'px';
	if (oBg1.offsetTop >= 768) {
		oBg1.style.top = '-768px'
	}
	if (oBg2.offsetTop >= 768) {
		oBg2.style.top = '-768px'
	}
}, 10)


/* 开始游戏 */
var start = document.getElementById('start');
var h = document.getElementById('score');
var h1 = document.getElementById('over');
start.onclick = function() {
	var score = 0;
	h1.innerHTML = '';
	start.style.display = 'none';
	/* 飞机移动 */
	var airplane = document.getElementById('airplane');
	var mainScreen = document.getElementById('mainScreen');
	/* 飞机事件 */
	airplane.addEventListener('mousedown', function(e) {
		var evt1 = e || window.event;
		baseX = evt1.pageX;
		baseY = evt1.pageY;
		moveX = 0;
		moveY = 0;
		/* 主屏幕事件 */
		mainScreen.onmousemove = function(e) {
			var evt2 = e || window.event
			moveX = evt2.pageX - baseX;
			baseX = evt2.pageX;
			moveY = evt2.pageY - baseY;
			baseY = evt2.pageY;
			airplane.style.left = airplane.offsetLeft + moveX + 'px';
			airplane.style.top = airplane.offsetTop + moveY + 'px';
		}
	}, false);
	mainScreen.addEventListener('mouseup', function() {
		mainScreen.onmousemove = null;
	})


	/* 死亡检测 */
	var timerDie = setInterval(function() {
		var tanks = document.getElementsByClassName('tank');
		for (var i = 0; i < tanks.length; i++) {
			if (checkBlockCollision(tanks[i], airplane)) {
				for (var j = 0; j < 100; j++) {
					clearInterval(j);
					h1.innerHTML = '游戏结束';
				}
				break;
			}
		}
	}, 100)



	/* 子弹 */
	var timerBullet = setInterval(Bullet, 300);

	function Bullet() {
		var bullet = document.createElement('div');
		bullet.className = 'bullet';
		bullet.style.left = airplane.offsetLeft + 60 + 'px';
		bullet.style.top = airplane.offsetTop + 'px';
		mainScreen.appendChild(bullet);
		var timerBulletFly = setInterval(function() {
			bullet.style.top = bullet.offsetTop - 10 + 'px';
			if (bullet.offsetTop <= -20) {
				clearInterval(timerBulletFly);
				mainScreen.removeChild(bullet);
			}
		}, 50)
		bullet.timer = timerBulletFly; //增加属性
	}


	/* 坦克 */
	var timerTank = setInterval(Tank, 500);

	function Tank() {
		var tank = document.createElement('div');
		tank.className = 'tank';
		tank.style.left = parseInt(Math.random() * 453) + 'px';
		tank.style.top = 0 + 'px';
		mainScreen.appendChild(tank);
		var timerTankGo = setInterval(function() {
			tank.style.top = tank.offsetTop + 10 + 'px';
			if (tank.offsetTop >= 828) {
				clearInterval(timerTankGo);
				mainScreen.removeChild(tank);
			}
		}, 50)
		tank.timer = timerTankGo;
	}


	var timerCheckBlockCollision = setInterval(function() {
		var tanks = document.getElementsByClassName('tank');
		var bullets = document.getElementsByClassName('bullet');
		for (var i = 0; i < bullets.length; i++) {
			for (var j = 0; j < tanks.length; j++) {
				var b = bullets[i];
				var t = tanks[j];

				if (checkBlockCollision(b, t)) {
					score ++;
					h.innerHTML = 'score: '; 
					h.innerHTML += score;
					clearInterval(b.timer);
					clearInterval(t.timer);
					mainScreen.removeChild(b);
					mainScreen.removeChild(t);
					break;
				}
			}
		}
	}, 100)

	/* 碰撞检测 */
	/* function checkBlockCollision(block1, block2) {
		var left1 = block1.offsetLeft;
		var left2 = block2.offsetLeft;
	
		var top1 = block1.offsetTop;
		var top2 = block2.offsetTop;
	
		var width1 = left1 + block1.offsetWidth;
		var width2 = left2 + block2.offsetWidth;
	
		var height1 = top1 + block1.offsetHeight;
		var height2 = top1 + block1.offsetHeight;
	
		if (!(left1 > width2 || width1 < left2 || top1 > height2 || height1 < top2)) {
			return true;
		} else {
			return false;
		}
	} */
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
