const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const size = 20;
let snake = [{ x: 160, y: 160 }];
let dir = { x: size, y: 0 };
let food = spawnFood();

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 16) * size,
    y: Math.floor(Math.random() * 16) * size
  };
}

function loop() {
  ctx.fillStyle = "#0f0f1e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#00d4ff";
  snake.forEach(s => ctx.fillRect(s.x, s.y, size, size));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(s => s.x === head.x && s.y === head.y)
  ) {
    snake = [{ x: 160, y: 160 }];
    dir = { x: size, y: 0 };
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") dir = { x: 0, y: -size };
  if (e.key === "ArrowDown") dir = { x: 0, y: size };
  if (e.key === "ArrowLeft") dir = { x: -size, y: 0 };
  if (e.key === "ArrowRight") dir = { x: size, y: 0 };
});

setInterval(loop, 120);
