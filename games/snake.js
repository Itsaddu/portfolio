const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const size = 20;
let snake = [{ x: 160, y: 160 }];
let dir = { x: size, y: 0 };
let food = spawnFood();

function showGameOver() {
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '20px Arial';
  ctx.fillText('Press any arrow key to restart', canvas.width / 2, canvas.height / 2 + 30);
}

function showGameOverWithButtons() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:9999';
  overlay.innerHTML = `
    <div style="background:#000;color:#fff;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 30px rgba(255,0,0,0.8)">
      <h2 style="font-size:40px;margin-bottom:20px;text-shadow:0 0 10px #f00">GAME OVER</h2>
      <div style="display:flex;gap:15px;justify-content:center;margin-top:30px">
        <button onclick="location.reload()" style="padding:12px 30px;font-size:16px;background:#ff4444;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:bold">Retry</button>
        <button onclick="window.location.href='../games/games.html'" style="padding:12px 30px;font-size:16px;background:#444;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:bold">Go Back</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

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
        showGameOverWithButtons();
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") dir = { x: 0, y: -size };
  if (e.key === "ArrowDown") dir = { x: 0, y: size };
  if (e.key === "ArrowLeft") dir = { x: -size, y: 0 };
  if (e.key === "ArrowRight") dir = { x: size, y: 0 };
});

setInterval(loop, 120);


