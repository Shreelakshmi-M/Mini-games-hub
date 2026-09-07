window.MathGames = {
  fibonacci(area){
    area.innerHTML=`<h2 class="game-title">🌀 Fibonacci Sequence</h2><p class="game-note">Enter the number of terms.</p><div class="game-actions"><input id="n" type="number" min="1" max="30" value="10"><button class="primary" id="go">Generate</button></div><pre class="output" id="out"></pre>`;
    area.querySelector("#go").onclick=()=>{let n=Math.max(1,Math.min(30,Number(area.querySelector("#n").value)||1)),a=0,b=1,res=[];for(let i=0;i<n;i++){res.push(a);[a,b]=[b,a+b]}area.querySelector("#out").textContent="Fibonacci Sequence: "+res.join(", ");GameHub.addScore(5)}
  },
  rps(area){
    let choices=["Rock","Paper","Scissors"];
    area.innerHTML=`<h2 class="game-title">✊ Rock-Paper-Scissors</h2><p class="game-note">Choose your move and play against the computer.</p><div class="choice-row">${choices.map(c=>`<button class="choice" data-c="${c}">${c}</button>`).join("")}</div><div class="status" id="rStatus">Make a choice.</div>`;
    area.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{let u=b.dataset.c,c=choices[Math.floor(Math.random()*3)],win=(u==="Rock"&&c==="Scissors")||(u==="Paper"&&c==="Rock")||(u==="Scissors"&&c==="Paper");let msg=u===c?"Tie!":win?"You win! +10 points.":"Computer wins.";area.querySelector("#rStatus").textContent=`You: ${u} | Computer: ${c} — ${msg}`;if(win)GameHub.addScore(10)})
  },
  guess(area){
    let n=GameHub.rand(1,100),attempts=0;
    area.innerHTML=`<h2 class="game-title">🎲 Guess My Number</h2><p class="game-note">Guess a number between 1 and 100.</p><div class="game-actions"><input id="g" type="number" min="1" max="100"><button class="primary" id="try">Guess</button></div><div class="status" id="gStatus">Attempts: 0</div>`;
    area.querySelector("#try").onclick=()=>{let x=Number(area.querySelector("#g").value);attempts++;let s=area.querySelector("#gStatus");if(x===n){s.textContent=`Correct in ${attempts} attempts! +15 points.`;GameHub.addScore(15)}else s.textContent=x>n?"Too high! Try again.":"Too low! Try again."}
  },
  kenken(area){
    let solution=10;
    area.innerHTML=`<h2 class="game-title">➗ KenKen (Simplified)</h2><p class="game-note">Solve the arithmetic challenge used in the report's simplified implementation.</p><div class="question"><strong>Solve: 5 + 5 = ?</strong></div><div class="game-actions"><input id="k" type="number"><button class="primary" id="kgo">Submit</button></div><div class="status" id="kStatus"></div>`;
    area.querySelector("#kgo").onclick=()=>{let ok=Number(area.querySelector("#k").value)===solution;area.querySelector("#kStatus").textContent=ok?"Correct! +10 points.":"Wrong. The correct answer is 10.";if(ok)GameHub.addScore(10)}
  },

};
