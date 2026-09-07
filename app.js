document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));tab.classList.add("active");
    document.querySelectorAll(".category").forEach(c=>c.classList.add("hidden"));
    document.getElementById(tab.dataset.category).classList.remove("hidden");
  });
  const modal=document.getElementById("modal"),area=document.getElementById("gameArea");
  document.querySelectorAll(".game-card button").forEach(btn=>btn.onclick=()=>{
    const game=btn.closest(".game-card").dataset.game;
    modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
    if(LogicGames[game])LogicGames[game](area);
    else if(MathGames[game])MathGames[game](area);
    else if(WordGames[game])WordGames[game](area);
  });
  function close(){modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");area.innerHTML=""}
  document.getElementById("closeModal").onclick=close;
  modal.onclick=e=>{if(e.target===modal)close()};
});
