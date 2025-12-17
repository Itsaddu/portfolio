const symbols = ["🍎","🍌","🍇","🍉","🍒","🍓"];
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const grid = document.getElementById("grid");
let first = null, lock = false;

function showWinMessage() {
  const winDiv = document.createElement('div');
  winDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,255,0,0.3);display:flex;align-items:center;justify-content:center;z-index:9999';
  winDiv.innerHTML = `<div style="background:#00ff00;color:#000;padding:30px;border-radius:10px;text-align:center;font-size:30px;font-weight:bold;box-shadow:0 0 30px rgba(0,255,0,0.8)">🎉 YOU WON! 🎉</div>`;
  document.body.appendChild(winDiv);
  setTimeout(() => winDiv.remove(), 3000);
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

