function startSnake() {
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  let snake = [{x:200, y:200}];
  let dx = 20, dy = 0;
  let food = {x: 100, y: 100};
  let score = 0;
  let gameOver = false;

  document.getElementById("restartSnake").style.display = "none";
  document.getElementById("snakeScore").innerText = "Score: 0";

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy===0) {dx=0; dy=-20;}
    if (e.key === "ArrowDown" && dy===0) {dx=0; dy=20;}
    if (e.key === "ArrowLeft" && dx===0) {dx=-20; dy=0;}
    if (e.key === "ArrowRight" && dx===0) {dx=20; dy=0;}
  });

  function draw() {
    ctx.clearRect(0,0,400,400);
    ctx.strokeStyle="#ddd";
    for(let i=0;i<20;i++){
      ctx.beginPath();
      ctx.moveTo(i*20,0); ctx.lineTo(i*20,400); ctx.stroke();
      ctx.moveTo(0,i*20); ctx.lineTo(400,i*20); ctx.stroke();
    }
    ctx.fillStyle="lime";
    snake.forEach(s => ctx.fillRect(s.x,s.y,20,20));
    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,20,20);
  }

  function update() {
    const head = {x: snake[0].x+dx, y: snake[0].y+dy};
    snake.unshift(head);

    if (head.x===food.x && head.y===food.y) {
      score++;
      document.getElementById("snakeScore").innerText = "Score: "+score;
      food = {x: Math.floor(Math.random()*20)*20, y: Math.floor(Math.random()*20)*20};
    } else {
      snake.pop();
    }

    if (head.x<0 || head.y<0 || head.x>=400 || head.y>=400 ||
        snake.slice(1).some(s => s.x===head.x && s.y===head.y)) {
      gameOver = true;
    }
  }

  function loop() {
    if (gameOver) {
      alert("Game Over! Final Score: "+score);
      document.getElementById("restartSnake").style.display = "inline";
      return;
    }
    update();
    draw();
    setTimeout(loop,150 - Math.min(score*5,100));
  }
  loop();
}
