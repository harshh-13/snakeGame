function init(){
	canvas = document.getElementById('mycanvas')
	canvas.style.visibility = "visible";
	W = canvas.width = H = canvas.height = 495;
	pen = canvas.getContext('2d');
	cs = 33;
	game_over = false;
	score = 0;

	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:3,
		color:"#064420",
		cells:[],
		direction:"right",
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=1;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs+1,cs+1);
			}

			pen.fillStyle = "#4AA96C";
			pen.fillRect(this.cells[0].x*cs,this.cells[0].y*cs,cs+1,cs+1);
		},

		updateSnake:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				food = getRandomFood();
				score++;
			}
			else {
				this.cells.pop();
			}

			var nextX,nextY;
			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else if(this.direction=="up"){
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > 14 || this.cells[0].y > 14){
				game_over = true;
			}
		}
	};

	snake.createSnake();
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else if(e.key=="ArrowUp"){
			snake.direction = "up";
		}
	}
	document.addEventListener('keydown',keyPressed) ;	
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.drawImage(food_img,food.x*cs,food.y*cs-2,cs,cs);
	pen.drawImage(trophy,18,20,cs,cs);

	pen.fillStyle = "black"
	pen.font = "14px Roboto"
	if(score < 10)
		pen.fillText(score,31,35);
	else
		pen.fillText(score,29,35);
}

function update(){
	snake.updateSnake(); 
}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY
	}
	return food;
}

function JSalert(){
	swal("Game Over! Your score is "+score, 
		"Reload the page to Restart the game :)");
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		JSalert();
		return;
	}
	draw();
	update();
}

init();
var f = setInterval(gameloop,100);
