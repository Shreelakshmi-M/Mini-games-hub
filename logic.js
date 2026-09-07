window.LogicGames = {
  tictactoe(area){
    let b=Array(9).fill(""), turn="X", over=false, vsAI=true;
    area.innerHTML=`<h2 class="game-title">❌ Tic-Tac-Toe</h2><p class="game-note">Matches the report's friend/computer mode.</p>
      <div class="game-actions"><button class="secondary" id="mode">Mode: Computer</button><button class="secondary" id="reset">New Game</button></div>
      <div class="status" id="tttStatus">Your turn (X)</div><div class="board ttt" id="tttBoard"></div>`;
    const board=area.querySelector("#tttBoard"), st=area.querySelector("#tttStatus");
    const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function winner(x){return wins.find(w=>w.every(i=>b[i]===x));}
    function draw(){board.innerHTML="";b.forEach((v,i)=>{let x=document.createElement("button");x.className="cell";x.textContent=v;x.onclick=()=>move(i);board.appendChild(x)})}
    function end(){let w=winner("X")||winner("O"); if(w){over=true;st.textContent=`${w} wins!`;if(w==="X")GameHub.addScore(10)}else if(b.every(Boolean)){over=true;st.textContent="It's a draw."} }
    function move(i){if(over||b[i]||(vsAI&&turn==="O"))return;b[i]=turn;draw();end();if(!over&&vsAI){turn="O";st.textContent="Computer is thinking…";setTimeout(ai,250)}else if(!over){turn=turn==="X"?"O":"X";st.textContent=`${turn}'s turn`}}
    function ai(){let open=b.map((v,i)=>v?null:i).filter(v=>v!==null);let i=open[Math.floor(Math.random()*open.length)];if(i!==undefined)b[i]="O";draw();end();if(!over){turn="X";st.textContent="Your turn (X)"}}
    area.querySelector("#mode").onclick=()=>{vsAI=!vsAI;area.querySelector("#mode").textContent=vsAI?"Mode: Computer":"Mode: Friend";reset()};
    area.querySelector("#reset").onclick=reset;
    function reset(){b=Array(9).fill("");turn="X";over=false;st.textContent="Your turn (X)";draw()} reset();
  },

  sudoku(area){
    const solution=[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];
    const puzzle=solution.map(r=>r.map(v=>Math.random()<.42?"":v));
    area.innerHTML=`<h2 class="game-title">🔢 Sudoku</h2><p class="game-note">Complete the 9×9 grid using numbers 1–9 without repetition in a row, column or 3×3 box.</p><div class="game-actions"><button class="primary" id="check">Check Solution</button><button class="secondary" id="new">New Puzzle</button></div><div class="status" id="sStatus">Fill the empty cells.</div><div class="board sudoku" id="sBoard"></div>`;
    function render(){const bd=area.querySelector("#sBoard");bd.innerHTML="";puzzle.forEach((r,ri)=>r.forEach((v,ci)=>{let inp=document.createElement("input");inp.type="number";inp.min=1;inp.max=9;inp.value=v;inp.disabled=!!v;inp.dataset.r=ri;inp.dataset.c=ci;bd.appendChild(inp)}))}
    area.querySelector("#check").onclick=()=>{let ok=true;area.querySelectorAll("input").forEach(i=>{if(Number(i.value)!==solution[i.dataset.r][i.dataset.c])ok=false});area.querySelector("#sStatus").textContent=ok?"Correct! +20 points.":"Some cells are incorrect.";if(ok)GameHub.addScore(20)};
    area.querySelector("#new").onclick=()=>location.reload(); render();
  },

  hangman(area){
    const words=["ELEPHANT","JAVASCRIPT","PUZZLE","COMPUTER","ADVENTURE"];let word=words[Math.floor(Math.random()*words.length)], guessed=new Set(), wrong=0,max=6;
    area.innerHTML=`<h2 class="game-title">🎯 Hangman</h2><p class="game-note">Guess the hidden word.</p><div class="status" id="hWord"></div><div id="letters" class="letters"></div><div class="status" id="hStatus">Wrong guesses: 0 / 6</div><button class="secondary" id="hNew">New Word</button>`;
    const render=()=>{area.querySelector("#hWord").textContent=word.split("").map(c=>guessed.has(c)?c:"_").join(" ");};
    const letters=area.querySelector("#letters");"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(c=>{let x=document.createElement("button");x.className="letter-btn";x.textContent=c;x.onclick=()=>{x.disabled=true;if(word.includes(c))guessed.add(c);else wrong++;render();area.querySelector("#hStatus").textContent=`Wrong guesses: ${wrong} / ${max}`;if(word.split("").every(c=>guessed.has(c))){area.querySelector("#hStatus").textContent="You won! +15 points.";GameHub.addScore(15)}if(wrong>=max&&!word.split("").every(c=>guessed.has(c)))area.querySelector("#hStatus").textContent=`Game over. Word: ${word}`};letters.appendChild(x)});area.querySelector("#hNew").onclick=()=>this.hangman(area);render();
  },

  sliding(area){
    let tiles=[1,2,3,4,5,6,7,8,""]; 
    area.innerHTML=`<h2 class="game-title">🧩 Sliding Puzzle</h2><p class="game-note">Click a tile next to the empty space to arrange 1–8.</p><div class="puzzle" id="puzzle"></div><div class="status" id="pStatus">Moves: 0</div><button class="secondary" id="pNew">Shuffle</button>`;
    let moves=0; function shuffle(){tiles=GameHub.shuffle(tiles);moves=0;render()}
    function render(){const p=area.querySelector("#puzzle");p.innerHTML="";tiles.forEach((v,i)=>{let x=document.createElement("button");x.className="tile"+(v===""?" empty":"");x.textContent=v;x.onclick=()=>move(i);p.appendChild(x)});area.querySelector("#pStatus").textContent=`Moves: ${moves}`}
    function move(i){let e=tiles.indexOf(""),ok=[i-3,i+3,i-1,i+1].includes(e)&&!(i%3===2&&e%3===0)&&!(i%3===0&&e%3===2);if(ok){[tiles[i],tiles[e]]=[tiles[e],tiles[i]];moves++;render();if(tiles.join(",")==="1,2,3,4,5,6,7,8,"){area.querySelector("#pStatus").textContent=`Solved in ${moves} moves! +20 points.`;GameHub.addScore(20)}}}
    area.querySelector("#pNew").onclick=shuffle;shuffle();
  }
};
