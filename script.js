// 背景动画
const canvas=document.getElementById('backgroundCanvas');
const ctx=canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;
const particles=[];
for(let i=0;i<150;i++) particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
function animate(){
  ctx.fillStyle='rgba(15,23,42,0.1)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#ffec99';
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0)p.x=w;if(p.x>w)p.x=0;
    if(p.y<0)p.y=h;if(p.y>h)p.y=0;
  });
  requestAnimationFrame(animate);
}
animate();

// 元素选择
const overlay=document.getElementById('musicOverlay');
const mainContent=document.getElementById('mainContent');
const musicBtns=document.querySelectorAll('.musicBtn');
const audio=document.getElementById('bgMusic');
const skipBtn=document.getElementById('skipButton');
const closeBtn=document.getElementById('closeButton');
const angryOverlay=document.getElementById('angryOverlay');
const officialBtn=document.getElementById('officialBtn');
const retryBtn=document.getElementById('retryBtn');
const angryMessage=document.getElementById('angryMessage');
const smileEmoji=document.getElementById('smileEmoji');

// 音乐选择
musicBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    audio.src = btn.dataset.src;
    audio.play();
    overlay.style.display='none';
    mainContent.style.display='block';
    smileEmoji.style.display='block';
    document.body.style.overflowY='auto'; // 恢复滚动
  });
});

// 跳过按钮逃跑
skipBtn.addEventListener('mousemove',e=>{
  skipBtn.style.left=Math.random()*(window.innerWidth-100)+'px';
  skipBtn.style.top=Math.random()*(window.innerHeight-50)+'px';
});
skipBtn.addEventListener('click',e=>{ e.preventDefault(); alert('必须选择音乐！'); });

// 关闭叉叉 → 弹出愤怒
closeBtn.addEventListener('click',()=>{
  overlay.style.display='none';
  angryOverlay.style.display='flex';
  angryMessage.textContent='请点击下面选项或刷新页面重新选择音乐！';
  document.body.style.overflow='hidden'; // 禁止滚动
});

// 官方推荐按钮
officialBtn.addEventListener('click',()=>{
  angryMessage.textContent='任何事情把握在自己手中，我们不会帮你做任何选择。';
});

// 再次选择按钮
retryBtn.addEventListener('click',()=>{
  angryOverlay.style.display='none';
  overlay.style.display='flex';
  angryMessage.textContent='';
  document.body.style.overflow='hidden';
});
