// --- Loading Screen Logic ---
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('chef-loading').style.display = 'none';
    document.getElementById('chef-home').style.display = '';
    chefAnimHomepage();
    chefBindUI();
    chefShowLoginPanel();
  }, 1500); // Simulate loading ~1.5s
});

// --- HOMEPAGE Animation: Realistic, animated kitchen & chefs ---
function chefAnimHomepage() {
  const c = document.getElementById('chef-home-anim');
  if (!c) return;
  const ctx = c.getContext('2d');
  let t = 0;
  function drawChef(x,y,face,apron,hat,blink,wave,skin) {
    ctx.save();
    ctx.globalAlpha=0.21;
    ctx.beginPath(); ctx.ellipse(x+12,y+135,60,25,0,0,2*Math.PI); ctx.fillStyle="#000"; ctx.fill();
    ctx.globalAlpha=1;
    ctx.translate(x,y);
    ctx.beginPath(); ctx.ellipse(0,95,48,68,0,0,2*Math.PI); ctx.fillStyle=apron; ctx.fill();
    ctx.save(); ctx.translate(-44,45); ctx.rotate(Math.sin(t/18)*0.4*(wave?1:0)+0.15);
    ctx.fillStyle=skin; ctx.fillRect(-11,0,22,70);
    ctx.beginPath(); ctx.arc(0,75,17,0,2*Math.PI); ctx.fillStyle=skin; ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(44,45); ctx.rotate(-0.18);
    ctx.fillStyle=skin; ctx.fillRect(-11,0,22,70);
    ctx.beginPath(); ctx.arc(0,75,17,0,2*Math.PI); ctx.fillStyle=skin; ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.arc(0,0,50,0,2*Math.PI); ctx.fillStyle=skin; ctx.fill();
    ctx.save(); ctx.translate(-19,-12);
    ctx.beginPath(); ctx.ellipse(0,0,8,blink?2:8,0,0,2*Math.PI);
    ctx.ellipse(38,0,8,blink?2:8,0,0,2*Math.PI);
    ctx.fillStyle="#222"; ctx.fill();
    ctx.restore();
    ctx.font="2.5em serif"; ctx.fillText(face, -22,22);
    ctx.save(); ctx.globalAlpha=0.12;
    ctx.beginPath(); ctx.ellipse(0,-44,59,18,0,0,2*Math.PI); ctx.fillStyle="#000"; ctx.fill();
    ctx.restore();
    ctx.font="2.4em serif"; ctx.fillText(hat, -25, -54);
    ctx.restore();
  }
  function drawKitchen() {
    ctx.fillStyle="#fff7e6"; ctx.fillRect(0,0,1120,420);
    ctx.save(); ctx.globalAlpha=0.08;
    for(let i=0;i<28;i++) for(let j=0;j<10;j++) {
      ctx.fillStyle="#e2ceae";
      ctx.fillRect(i*40, j*40, 39, 39);
    }
    ctx.restore();
    ctx.fillStyle="#d1eaf6"; ctx.fillRect(780,22,170,70);
    ctx.strokeStyle="#b3d0e2"; ctx.lineWidth=3;
    ctx.strokeRect(780,22,170,70);
    ctx.beginPath(); ctx.moveTo(865,22); ctx.lineTo(865,92); ctx.moveTo(780,57); ctx.lineTo(950,57);
    ctx.stroke();
    ctx.fillStyle="#e1bb89"; ctx.fillRect(0,320,1120,60);
    ctx.strokeStyle="#c98f4a"; ctx.lineWidth=2; ctx.strokeRect(0,320,1120,60);
    ctx.fillStyle="#aaa"; ctx.fillRect(880,360,135,38);
    ctx.fillStyle="#e2e2e2"; ctx.fillRect(900,370,95,22);
    ctx.save(); ctx.translate(400,350); ctx.rotate(-0.11); ctx.fillStyle="#e4c494";
    ctx.fillRect(0,0,88,22); ctx.restore();
    ctx.save(); ctx.translate(970,352);
    ctx.rotate(Math.sin(t/19)*0.10);
    ctx.beginPath(); ctx.ellipse(0,0,32,14,0,0,2*Math.PI); ctx.fillStyle="#555"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,0,24,7,0,0,2*Math.PI); ctx.fillStyle="#333"; ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(900,353); ctx.rotate(0.09-Math.cos(t/17)*0.06);
    ctx.beginPath(); ctx.ellipse(0,0,14,9,0,0,2*Math.PI); ctx.fillStyle="#a2c4c9"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,0,8,5,0,0,2*Math.PI); ctx.fillStyle="#7bb8b8"; ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle="#987"; ctx.lineWidth=4; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(180,330); ctx.lineTo(180,220); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(210,330); ctx.lineTo(210,230); ctx.stroke();
    ctx.lineWidth=2; ctx.beginPath(); ctx.arc(210,228,8,0,Math.PI*2); ctx.strokeStyle="#aaa"; ctx.stroke();
    ctx.restore();
    ctx.font="2.5em serif";
    ctx.fillText("🍅", 280, 375+Math.sin(t/13)*5);
    ctx.fillText("🧀", 460, 370+Math.cos(t/17)*5);
    ctx.fillText("🥦", 520, 373+Math.sin(t/18)*5);
    ctx.fillText("🍞", 660, 372+Math.cos(t/14)*4);
    ctx.fillText("🥕", 300, 371+Math.sin(t/12)*4);
    ctx.fillText("🍳", 980, 368+Math.sin(t/16)*5);
  }
  function draw() {
    ctx.clearRect(0,0,1120,420);
    drawKitchen();
    drawChef(230,200,"😊","#ffe7c9","👨‍🍳", Math.floor(t/48)%2==0, true, "#f0c4a2");
    drawChef(570,210,"😎","#fb8c00","👑", false, false, "#ffe7c9");
    drawChef(900,180,"😉","#1abc9c","🧑‍🎨", Math.floor(t/53)%3==0, false, "#d1a176");
    t++;
    requestAnimationFrame(draw);
  }
  draw();
}

// UI binding for login/register toggling and transition
function chefBindUI() {
  document.getElementById('home-login-btn').onclick = chefShowLoginPanel;
  chefShowLogin(); // Default to login
}
function chefShowLoginPanel(){
  document.getElementById('chef-home').style.display='none';
  document.getElementById('chef-auth').style.display='flex';
  chefShowLogin();
}
function chefGoHome(){
  document.getElementById('chef-home').style.display='';
  document.getElementById('chef-auth').style.display='none';
  document.getElementById('chef-userbar').style.display="none";
  chefClearMainApp();
}
function chefShowLogin(){
  document.getElementById('chef-login-box').classList.add('active');
  document.getElementById('chef-register-box').classList.remove('active');
  chefSetMsg('chef-login-msg',"",true);chefSetMsg('chef-register-msg',"",true);
}
function chefShowRegister(){
  document.getElementById('chef-login-box').classList.remove('active');
  document.getElementById('chef-register-box').classList.add('active');
  chefSetMsg('chef-login-msg',"",true);chefSetMsg('chef-register-msg',"",true);
}

// --- Shop, Customize, User/Storage, Game Logic (same as above, omitted for brevity) ---
// Use your latest ChefMaster game.js core, minigames, and UI logic here (see previous messages for the full JS core).
// You can paste your main game/minigame logic after this UI code.
