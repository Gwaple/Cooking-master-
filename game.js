// --- Loading & Homepage Logic ---
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('chef-loading').style.display = 'none';
    document.getElementById('chef-home').style.display = '';
    chefInitHomepage();
  }, 1000);
});

function chefInitHomepage() {
  chefBindUI();
  chefHomepageMusic();
  chefHomepageCuisineSelect();
}

function chefBindUI() {
  document.getElementById('home-login-btn').onclick = chefShowLoginPanel;
}

function chefHomepageMusic() {
  const music = document.getElementById('lofi-music');
  const btn = document.getElementById('music-btn');
  let playing = false;
  btn.onclick = () => {
    playing = !playing;
    if (playing) { music.play(); btn.classList.add('playing'); }
    else { music.pause(); btn.classList.remove('playing'); }
  };
}

function chefHomepageCuisineSelect() {
  const zones = document.querySelectorAll('.cuisine-zone');
  const holo = document.getElementById('holo-cuisine');
  const globe = document.getElementById('holo-globe');
  const label = document.querySelector('.holo-cuisine-label');
  let selectedCuisine = null;
  zones.forEach(zone=>{
    zone.onclick = () => {
      selectedCuisine = zone.dataset.cuisine;
      chefShowHoloGlobe(selectedCuisine);
    };
  });
  document.getElementById('start-cuisine-select').onclick = ()=>{
    document.querySelector('.cuisine-zone').click();
  };
  document.getElementById('holo-back-btn').onclick = ()=>{
    holo.style.display="none";
    document.getElementById('chef-home').style.display='';
  };
  document.getElementById('holo-confirm-btn').onclick = ()=>{
    holo.style.display="none";
    chefShowLoginPanel();
  };
}
function chefShowHoloGlobe(cuisine) {
  document.getElementById('chef-home').style.display="none";
  const holo = document.getElementById('holo-cuisine');
  holo.style.display = "flex";
  let cuisineData = {
    italian: {label:"Italian", color:"#ffb87a", lat:37, lon:15, emoji:"🍕"},
    japanese: {label:"Japanese", color:"#aaf", lat:35, lon:139, emoji:"🍣"},
    mexican: {label:"Mexican", color:"#ff7a7a", lat:19, lon:-99, emoji:"🌮"},
    french: {label:"French", color:"#fac", lat:48, lon:2, emoji:"🥐"},
    chinese: {label:"Chinese", color:"#fd5", lat:30, lon:112, emoji:"🥟"},
    indian: {label:"Indian", color:"#fd9", lat:28, lon:77, emoji:"🍛"},
    american: {label:"American", color:"#ff9", lat:40, lon:-74, emoji:"🍔"}
  };
  let cinfo = cuisineData[cuisine];
  let globe = document.getElementById('holo-globe');
  let ctx = globe.getContext('2d');
  let angle = 0, stopAngle = 2*Math.PI*(cinfo.lon+180)/360;
  let anim;
  function drawGlobe() {
    ctx.clearRect(0,0,530,530);
    // Earth
    ctx.save();
    ctx.beginPath();
    ctx.arc(265,265,210,0,2*Math.PI);ctx.fillStyle="#3af";ctx.shadowBlur=30;ctx.shadowColor="#5ef";ctx.fill();
    ctx.shadowBlur=0;
    // Continents (simple, stylized)
    ctx.beginPath();
    ctx.moveTo(265,265);
    ctx.arc(265,265,195,angle,angle+1.8,false);
    ctx.closePath();
    ctx.globalAlpha=0.72;
    ctx.fillStyle="#5cf8b4";ctx.fill();ctx.globalAlpha=1;
    // Cuisine dot
    let rad = 180, theta = angle + 0.02;
    let x = 265 + rad * Math.cos(theta), y = 265 + rad * Math.sin(theta);
    ctx.beginPath();
    ctx.arc(x,y,22,0,2*Math.PI);ctx.fillStyle=cinfo.color;ctx.shadowBlur=18;ctx.shadowColor=cinfo.color;ctx.fill();ctx.shadowBlur=0;
    ctx.font = "2em serif";
    ctx.fillText(cinfo.emoji, x-16, y+12);
    // Holo lines
    ctx.strokeStyle="#b0e5ff99";ctx.lineWidth=2;ctx.beginPath();
    for(let a=0;a<2*Math.PI;a+=Math.PI/6){
      ctx.moveTo(265,265);
      ctx.lineTo(265+210*Math.cos(a),265+210*Math.sin(a));
    }
    ctx.stroke();
    // Holo grid
    ctx.strokeStyle="#b0e5ff33";ctx.setLineDash([7,14]);
    for(let r=80;r<210;r+=50){
      ctx.beginPath();
      ctx.arc(265,265,r,0,2*Math.PI);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();
  }
  let frame = 0, target = stopAngle;
  function spin() {
    frame++;
    if(angle<target) angle += Math.min(0.05,(target-angle)/7);
    else angle = target;
    drawGlobe();
    if(angle<target) requestAnimationFrame(spin);
    else document.getElementById('holo-confirm-btn').style.display='';
  }
  label.textContent = `${cinfo.label} Cuisine`;
  document.getElementById('holo-confirm-btn').style.display='none';
  spin();
}

// --- Login/Register Logic ---
function chefShowLoginPanel() {
  document.getElementById('chef-auth').style.display = 'flex';
  chefShowLogin();
}
function chefShowLogin() {
  document.getElementById('chef-login-box').classList.add('active');
  document.getElementById('chef-register-box').classList.remove('active');
  chefSetMsg('chef-login-msg', "", true);
  chefSetMsg('chef-register-msg', "", true);
}
function chefShowRegister() {
  document.getElementById('chef-login-box').classList.remove('active');
  document.getElementById('chef-register-box').classList.add('active');
  chefSetMsg('chef-login-msg', "", true);
  chefSetMsg('chef-register-msg', "", true);
}
function chefSetMsg(id, msg, ok) {
  let el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = ok ? "#32b632" : "#ff6060";
}
function chefUserKey(u) { return 'chef-user-'+u; }
function chefProgressKey(u) { return 'chef-progress-'+u; }
function chefSaveUser(u, p) { localStorage.setItem(chefUserKey(u), JSON.stringify({password:p})); }
function chefGetUser(u) { try { return JSON.parse(localStorage.getItem(chefUserKey(u))); } catch(e){ return null; } }
function chefLogin() {
  let u = document.getElementById('chef-login-user').value.trim(),
      p = document.getElementById('chef-login-pass').value;
  let user = chefGetUser(u);
  if(!u||!p) return chefSetMsg('chef-login-msg', "Enter username & password.", false);
  if(!user) return chefSetMsg('chef-login-msg', "User not found.", false);
  if(user.password!==p) return chefSetMsg('chef-login-msg', "Wrong password.", false);
  chefCurrentUser = u;
  chefLoadProgress && chefLoadProgress();
  document.getElementById('chef-auth').style.display = 'none';
  document.getElementById('chef-home').style.display = 'none';
  document.getElementById('chef-userbar').style.display = '';
  document.getElementById('chef-userbar-welcome').textContent = "Hello, " + u + "!";
  chefShowXP && chefShowXP();
  chefDrawMainApp && chefDrawMainApp();
}
function chefRegister() {
  let u = document.getElementById('chef-reg-user').value.trim(),
      p = document.getElementById('chef-reg-pass').value;
  if(!u||!p) return chefSetMsg('chef-register-msg', "Enter username & password.", false);
  if(chefGetUser(u)) return chefSetMsg('chef-register-msg', "User already exists.", false);
  chefSaveUser(u, p);
  chefSetMsg('chef-register-msg', "Registered! You can sign in now.", true);
}

// -- BASIC ORIGINAL GAME LOGIC INTEGRATION (stubs for your game) --
let chefCurrentUser = "";
function chefLogout() {
  chefCurrentUser = "";
  document.getElementById('chef-userbar').style.display = "none";
  document.getElementById('chef-home').style.display = '';
}
function chefLoadProgress() {
  // Your per-user game state loading here
}
function chefShowXP() {
  // Your coins/xp/level UI here
}
function chefDrawMainApp() {
  // Draw your main cooking game here
}
function chefShowShop() {
  // Show shop (ingredients, upgrades, etc)
}
function chefShowCustomize() {
  // Show chef customization
}
function chefStartMinigame() {
  // Launch a cooking minigame
}
