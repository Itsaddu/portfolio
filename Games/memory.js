const symbols = ["🍎","🍌","🍇","🍉","🍒","🍓"];
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const grid = document.getElementById("grid");
let first = null, lock = false;

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
        first = null;
        lock = false;
      }
    }
  };

  grid.appendChild(card);
});
