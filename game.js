// --- Loading Screen Logic ---
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('chef-loading').style.display = 'none';
    document.getElementById('chef-home').style.display = '';
    chefAnimHomepage();
    chefBindUI();
    chefShowLoginPanel();
  }, 1400);
});

// --- HOMEPAGE Animation: Realistic, animated kitchen & chef with ingredients ---
function chefAnimHomepage() {
  const c = document.getElementById('chef-home-anim');
  if (!c) return;
  const ctx = c.getContext('2d');
  let t = 0;
  function drawKitchen() {
    ctx.fillStyle="#f8efde";
    ctx.fillRect(0,0,1120,420);
    ctx.fillStyle="#e9cfa6";
    ctx.fillRect(0,355,1120,65);
    ctx.fillStyle="#e1bb89";
    ctx.fillRect(0,380,1120,40);
    ctx.fillStyle="#d1eaf6";
    ctx.fillRect(750,40,240,70);
    ctx.strokeStyle="#b3d0e2"; ctx.lineWidth=4;
    ctx.strokeRect(750,40,240,70);
    ctx.beginPath();
    ctx.moveTo(870,40); ctx.lineTo(870,110);
    ctx.moveTo(750,75); ctx.lineTo(990,75);
    ctx.stroke();
    ctx.save(); ctx.globalAlpha=0.11;
    ctx.beginPath(); ctx.ellipse(200,410,90,18,0,0,2*Math.PI); ctx.fillStyle="#000"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(660,410,90,16,0,0,2*Math.PI); ctx.fill(); ctx.restore();
  }
  function drawAnimatedObjects() {
    // Tomato
    ctx.save();
    ctx.translate(320, 390 - Math.abs(Math.sin(t/22))*14);
    ctx.beginPath(); ctx.arc(0,0,22,0,2*Math.PI);
    ctx.fillStyle="#e63727"; ctx.shadowColor="#c90d0d"; ctx.shadowBlur=12; ctx.fill();
    ctx.shadowBlur=0;
    ctx.font="2.3em serif"; ctx.fillText("🍅",-17,12);
    ctx.restore();
    // Cheese
    ctx.save();
    ctx.translate(380, 395 - Math.abs(Math.sin(t/18))*11);
    ctx.beginPath(); ctx.arc(0,0,20,0,2*Math.PI);
    ctx.fillStyle="#ffe46a"; ctx.shadowColor="#ffb700"; ctx.shadowBlur=10; ctx.fill();
    ctx.shadowBlur=0;
    ctx.font="2.1em serif"; ctx.fillText("🧀",-16,10);
    ctx.restore();
    // Egg
    ctx.save();
    ctx.translate(440, 400 - Math.abs(Math.sin(t/14))*9);
    ctx.beginPath(); ctx.arc(0,0,17,0,2*Math.PI);
    ctx.fillStyle="#fffbe9"; ctx.shadowColor="#eee1b7"; ctx.shadowBlur=8; ctx.fill();
    ctx.shadowBlur=0;
    ctx.font="2em serif"; ctx.fillText("🥚",-13,8);
    ctx.restore();
    // Knife
    ctx.save();
    ctx.translate(520, 395 - 12*Math.abs(Math.sin(t/19)));
    ctx.rotate(Math.sin(t/18)*0.08-0.08);
    ctx.fillStyle="#dedede"; ctx.fillRect(-30,-5,60,10);
    ctx.fillStyle="#b0a090"; ctx.fillRect(30,-5,16,10);
    ctx.restore();
    // Chef avatar (SVG style, animated waving)
    ctx.save(); ctx.translate(180,170);
    // Body
    ctx.beginPath(); ctx.ellipse(0,86,40,60,0,0,2*Math.PI); ctx.fillStyle="#ffeebd"; ctx.fill();
    // Apron
    ctx.beginPath(); ctx.ellipse(0,124,26,32,0,0,2*Math.PI); ctx.fillStyle="#fff"; ctx.fill();
    // Arms
    ctx.save(); ctx.translate(-42,37); ctx.rotate(Math.sin(t/16)*0.2+0.2);
    ctx.fillStyle="#f6d4b8"; ctx.fillRect(-10,0,20,60);
    ctx.beginPath(); ctx.arc(0,63,14,0,2*Math.PI); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(42,37); ctx.rotate(-0.19);
    ctx.fillStyle="#f6d4b8"; ctx.fillRect(-10,0,20,60);
    ctx.beginPath(); ctx.arc(0,63,14,0,2*Math.PI); ctx.fill();
    ctx.restore();
    // Head
    ctx.beginPath(); ctx.arc(0,0,40,0,2*Math.PI); ctx.fillStyle="#f6d4b8"; ctx.fill();
    // Eyes
    ctx.save(); ctx.translate(-13,-8);
    ctx.beginPath(); ctx.ellipse(0,0,6, (t%80<35)?2:6,0,0,2*Math.PI);
    ctx.ellipse(26,0,6, (t%80<35)?2:6,0,0,2*Math.PI);
    ctx.fillStyle="#2a2222"; ctx.fill();
    ctx.restore();
    // Smile
    ctx.beginPath(); ctx.arc(7,18,13,0.07*Math.PI,0.75*Math.PI,false); ctx.lineWidth=3; ctx.strokeStyle="#a44"; ctx.stroke();
    // Hat
    ctx.beginPath(); ctx.ellipse(0,-34,30,12,0,0,2*Math.PI); ctx.fillStyle="#fff"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,-52,19+Math.sin(t/22)*2,10,0,0,2*Math.PI); ctx.fill();
    ctx.restore();
  }
  function draw() {
    ctx.clearRect(0,0,1120,420);
    drawKitchen();
    drawAnimatedObjects();
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
  chefClearMainApp && chefClearMainApp();
}
function chefShowLogin(){
  document.getElementById('chef-login-box').classList.add('active');
  document.getElementById('chef-register-box').classList.remove('active');
  chefSetMsg && chefSetMsg('chef-login-msg',"",true);
  chefSetMsg && chefSetMsg('chef-register-msg',"",true);
}
function chefShowRegister(){
  document.getElementById('chef-login-box').classList.remove('active');
  document.getElementById('chef-register-box').classList.add('active');
  chefSetMsg && chefSetMsg('chef-login-msg',"",true);
  chefSetMsg && chefSetMsg('chef-register-msg',"",true);
}

// Place your full ChefMaster game logic, shop, minigames, etc. below
// (from your latest working version - not repeated here for brevity).
