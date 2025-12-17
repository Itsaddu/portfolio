const c = document.getElementById("shooter");
const x = c.getContext("2d");

let ship = { x: 150, y: 360 };
let bullets = [];

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") ship.x -= 15;
  if (e.key === "ArrowRight") ship.x += 15;
  if (e.key === " ") bullets.push({ x: ship.x + 10, y: ship.y });
});

function loop() {
  x.fillStyle = "#0f0f1e";
  x.fillRect(0, 0, c.width, c.height);

  x.fillStyle = "#00d4ff";
  x.fillRect(ship.x, ship.y, 20, 20);

  bullets.forEach(b => {
    b.y -= 5;
    x.fillRect(b.x, b.y, 4, 10);
  });

  bullets = bullets.filter(b => b.y > 0);
}

setInterval(loop, 60);
