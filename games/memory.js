const symbols = ["🍎","🍌","🍇","🍉","🍒","🍓"];
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const grid = document.getElementById("grid");
let first = null, lock = false;

function showWinMessage() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,255,0,0.3);display:flex;align-items:center;justify-content:center;z-index:9999';
  overlay.innerHTML = `
    <div style="background:#000;color:#0f0;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 30px rgba(0,255,0,0.8)">
      <h2 style="font-size:40px;margin-bottom:20px;text-shadow:0 0 10px #0f0">YOU WON!</h2>
      <div style="display:flex;gap:15px;justify-content:center;margin-top:30px">
        <button onclick="location.reload()" style="padding:12px 30px;font-size:16px;background:#00aa00;color:#000;border:none;border-radius:5px;cursor:pointer;font-weight:bold">Retry</button>
        <button onclick="window.location.href='../games/games.html'" style="padding:12px 30px;font-size:16px;background:#444;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:bold">Go Back</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
cards.forEach(sym => {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = "❓";

  card.onclick = () => {
    if (lock || card.classList.contains("open")) return;
    card.textContent = sym;
    card.classList.add("open");

    if (!first) {
      first = card;
    } else {
      lock = true;
      if (first.textContent !== sym) {
        setTimeout(() => {
          first.textContent = "❓";
          card.textContent = "❓";
          first.classList.remove("open");
          card.classList.remove("open");
          first = null;
          lock = false;
        }, 800);
      } else {
                    const allMatched = cards.length === grid.querySelectorAll('.open').length;
            if (allMatched) showWinMessage();
        first = null;
        lock = false;
      }
    }
  };

  grid.appendChild(card);
});



