

// ======================= script.js =======================
const TERMS=[
"Checkst du","FDP","FDP yap","schreit unnütz","Ausnahme","Porsche","Porsche yap","Ich binn nicht reich",
"Ich bin nicht so einer","fasst jemand an","Was?","Digga","Hassen mich alle/ du","Find ich nicht so gut/ nett","Is nicht lustig","Mein Vater...","Mein Motorrad...","Motorrad yap","Jungs...","War'n Joke","Ich hoffe du verstehst/ checkst was ich meine","Rechtfertigung"
];

let board=[];
let checked=[];

const lobby=document.getElementById("lobby");
const game=document.getElementById("game");
const grid=document.getElementById("grid");
const bingoOverlay=document.getElementById("bingoOverlay");
const startBtn=document.getElementById("startBtn");
const blackBtn=document.getElementById("blackBtn");
const blackScreen=document.getElementById("blackScreen");
const unlockRange=document.getElementById("unlockRange");
const blackImg=document.getElementById("blackImg");

function shuffle(arr){
return [...arr].sort(()=>Math.random()-0.5);
}

function showLobby(){
lobby.style.display="block";
game.style.display="none";
}

function startGame(){
board=shuffle(TERMS).slice(0,16);
checked=[];
renderBoard();
lobby.style.display="none";
game.style.display="block";
}

function renderBoard(){
grid.innerHTML="";
board.forEach((term,i)=>{
const cell=document.createElement("div");
cell.className="cell";
cell.innerText=term;
cell.onclick=()=>toggleCell(i,cell);
grid.appendChild(cell);
});
}

function checkBingos(){
const wins=[
[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],
[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],
[0,5,10,15],[3,6,9,12]
];
let count=0;
wins.forEach(combo=>{
if(combo.every(i=>checked.includes(i))) count++;
});
return count;
}

function toggleCell(i,cell){
if(checked.includes(i)) return;
checked.push(i);
cell.classList.add("active");
const bingoCount=checkBingos();
if(bingoCount>0){
showBingo(bingoCount);
}
}

function showBingo(count){
if(count===1) bingoOverlay.innerText="BINGO!";
else if(count===2) bingoOverlay.innerText="DOUBLE BINGO!";
else bingoOverlay.innerText="TRIPLE BINGO!";
bingoOverlay.style.display="flex";
setTimeout(()=>{
bingoOverlay.style.display="none";
showLobby();
},3000);
}

// Black Screen
blackBtn.onclick=()=>{
blackScreen.style.display="flex";
};



let startAngle = 0;
let currentAngle = 0;
let rotating = false;

blackImg.addEventListener("pointerdown", (e)=>{
    e.preventDefault();
    rotating = true;
    const rect = blackImg.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180/Math.PI - currentAngle;
    blackImg.setPointerCapture(e.pointerId);
});

blackImg.addEventListener("pointermove", (e)=>{
    if(!rotating) return;
    const rect = blackImg.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;

    // Neue Drehung berechnen
    let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180/Math.PI - startAngle;

    // Absolute Drehung (0° bis 360°)
    currentAngle = ((angle % 360) + 360) % 360;

    blackImg.style.transform = `rotate(${currentAngle}deg)`;

    // Entsperren bei >= 270°
    if(currentAngle >= 270){
        blackScreen.style.display="none";
        currentAngle = 0;
        blackImg.style.transform = `rotate(0deg)`;
        rotating = false;
    }
});

blackImg.addEventListener("pointerup", (e)=>{
    rotating = false;
});
blackImg.addEventListener("pointercancel", (e)=>{
    rotating = false;
});

startBtn.onclick=startGame;
showLobby();