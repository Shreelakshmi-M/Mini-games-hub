window.WordGames = {
  scramble(area){
    const words=["paper","banana","pear","orange","grapes"];
    let i=0, score=0;
    area.innerHTML=`<h2 class="game-title">🔤 Word Scramble</h2><p class="game-note">Unscramble the displayed word.</p><div class="status" id="wPrompt"></div><div class="game-actions"><input id="ans" type="text" placeholder="Your answer"><button class="primary" id="submit">Submit</button></div><div class="status" id="wStatus">Score: 0</div>`;
    const scramble=w=>GameHub.shuffle(w.split("")).join("");
    const next=()=>{ if(i>=words.length){area.querySelector("#wPrompt").textContent=`Finished! Score: ${score}`; area.querySelector("#submit").disabled=true; return;} area.querySelector("#wPrompt").textContent=`Solve: ${scramble(words[i])}`; area.querySelector("#ans").value=""; };
    area.querySelector("#submit").onclick=()=>{const a=area.querySelector("#ans").value.trim().toLowerCase(); if(a===words[i]){score+=10;GameHub.addScore(10);area.querySelector("#wStatus").textContent=`Correct! Score: ${score}`;i++;next();}else area.querySelector("#wStatus").textContent="Wrong answer. Try again.";};
    next();
  },
  chain(area){
    const steps=[["apple","elephant"],["tiger","rabbit"],["turtle","elephant"]]; let i=0;
    area.innerHTML=`<h2 class="game-title">🔗 Word Chain</h2><p class="game-note">Give a word beginning with the requested letter.</p><div class="status" id="cPrompt"></div><div class="game-actions"><input id="cAns" type="text"><button class="primary" id="cGo">Submit</button></div><div class="status" id="cStatus"></div>`;
    const next=()=>{if(i>=steps.length){area.querySelector("#cPrompt").textContent="Chain complete!";area.querySelector("#cGo").disabled=true;return;}area.querySelector("#cPrompt").textContent=`Start with "${steps[i][0]}". Next word starts with "${steps[i][1][0].toUpperCase()}".`;};
    area.querySelector("#cGo").onclick=()=>{const a=area.querySelector("#cAns").value.trim().toLowerCase();if(a.startsWith(steps[i][1][0])){area.querySelector("#cStatus").textContent="Correct! +10 points.";GameHub.addScore(10);i++;next();}else area.querySelector("#cStatus").textContent=`Try a word beginning with ${steps[i][1][0].toUpperCase()}.`;}; next();
  },
  trivia(area){
    const qs=[["What is the capital of France?","paris"],["Who wrote Romeo and Juliet?","shakespeare"],["What is the largest ocean on Earth?","pacific"],["Who was the first president of the United States?","george washington"],["What is the smallest planet in our solar system?","mercury"]]; let i=0,score=0;
    area.innerHTML=`<h2 class="game-title">🌍 Trivia Quiz</h2><div class="question" id="q"></div><div class="game-actions"><input id="tAns" type="text"><button class="primary" id="tGo">Submit</button></div><div class="status" id="tStatus"></div>`;
    const next=()=>{if(i>=qs.length){area.querySelector("#q").textContent=`Quiz complete! Score: ${score}/50`;area.querySelector("#tGo").disabled=true;return;}area.querySelector("#q").textContent=`Question ${i+1}: ${qs[i][0]}`;area.querySelector("#tAns").value="";};
    area.querySelector("#tGo").onclick=()=>{const a=area.querySelector("#tAns").value.trim().toLowerCase();if(a===qs[i][1]){score+=10;GameHub.addScore(10);area.querySelector("#tStatus").textContent="Correct! +10 points.";}else area.querySelector("#tStatus").textContent=`Wrong. Correct answer: ${qs[i][1]}`;i++;next();}; next();
  }
};
