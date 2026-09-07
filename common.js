window.GameHub = {
  score: Number(localStorage.getItem("miniGamesScore") || 0),
  addScore(points){
    this.score += points;
    localStorage.setItem("miniGamesScore", this.score);
    const el=document.getElementById("totalScore");
    if(el) el.textContent=this.score;
  },
  shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); },
  escape(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));},
  rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
};
document.addEventListener("DOMContentLoaded",()=>document.getElementById("totalScore").textContent=GameHub.score);
