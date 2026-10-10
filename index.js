const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- TU SEO (NO LO TOQUE) ---
app.get('/google554feee44a838a44.html', (req,res)=> res.type('text/html').send('google-site-verification: google554feee44a838a44.html'));
app.get('/sitemap.xml', (req,res)=>{
  const base = `${req.protocol}://${req.get('host')}`;
  res.type('application/xml').send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url></urlset>`);
});
app.get('/robots.txt', (req,res)=> res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`));

app.get('/', (req,res)=>{ res.send(`
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Omegle - Talk to strangers!</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Arial}
html,body{height:100%;overflow:hidden}
body{background:#fff;display:flex;flex-direction:column;height:100vh;height:100dvh}
header{width:900px;max-width:100%;margin:0 auto;padding:8px 10px;flex-shrink:0;display:flex;gap:12px;align-items:baseline;background:#fff}
.logo{color:#FF6A00;font-size:42px;font-weight:900;letter-spacing:-3px;text-decoration:none}
#landing{width:900px;max-width:calc(100% - 20px);margin:20px auto;border:1px solid #ccc;background:#f6f6f6;padding:20px;text-align:center}
.modeBtn{background:#4d90d2;color:#fff;font-weight:bold;font-size:18px;padding:10px 24px;border:1px solid #315b87;cursor:pointer;margin:8px;border-radius:3px}
#main{width:900px;max-width:100%;margin:0 auto;border:1px solid #999;background:#eee;display:none;flex-direction:column;flex:1;min-height:0;overflow:hidden}
body.is-chatting #landing{display:none!important}
body.is-chatting #main{display:flex!important}
body.is-text.videos{display:none!important}
.videos{height:240px;flex-shrink:0;display:flex;background:#000}
.box{flex:1;background:#111;position:relative;overflow:hidden}
video{width:100%;height:100%;object-fit:cover;background:#000}#local{transform:scaleX(-1)}
.chat{flex:1;background:#fff;overflow-y:auto;padding:10px;font-size:14px;min-height:0}
.you{color:blue;font-weight:bold}.stranger{color:red;font-weight:bold}
.ctrl{height:54px;min-height:54px;flex-shrink:0;display:flex;gap:6px;padding:6px;background:#d5d5d5;border-top:1px solid #999;align-items:center;position:sticky;bottom:0}
.ctrl input{flex:1;border:1px solid #999;height:38px;padding:0 10px;font-size:14px;border-radius:2px}
.ctrl button{border:1px solid #777;height:38px;padding:0 16px;font-weight:bold;cursor:pointer;background:#fff;border-radius:2px}
#action{min-width:70px}
#action.stop{background:#ff3b30;color:#fff;border-color:#b00}
#status{width:900px;max-width:100%;margin:0 auto;background:#f0f0f0;border:1px solid #999;border-top:0;padding:4px 8px;font-size:11px;color:#333;flex-shrink:0}
@media(max-width:600px){
  header.logo{font-size:32px}
 .videos{height:44vw;max-height:220px}
 .ctrl{height:56px}
}
</style></head><body>
<header><a class="logo" href="/">omegle</a> Talk to strangers!</header>
<div id="landing">
  <p style="font-size:14px;margin-bottom:12px">Omegle te conecta con desconocidos al azar.</p>
  <div><button class="modeBtn" id="btnText">Text</button><button class="modeBtn" id="btnVideo">Video</button></div>
</div>
<div id="main">
  <div class="videos"><div class="box"><video id="local" autoplay playsinline muted></video></div><div class="box"><video id="remote" autoplay playsinline></video></div></div>
  <div class="chat" id="chat"><div>Presiona Start</div></div>
  <div class="ctrl"><button id="action">Start</button><input id="msg" placeholder="Type a message..." autocomplete="off"><button id="send">Send</button></div>
</div>
<div id="status">Ready</div>
<script src="/socket.io/socket.io.js"></script><script>
const socket=io();let ls=null,pc=null,room=null,search=false,isVideo=false,gen=0;
const lv=document.getElementById('local'),rv=document.getElementById('remote'),chat=document.getElementById('chat'),msg=document.getElementById('msg'),action=document.getElementById('action'),status=document.getElementById('status');
const rtc={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'turn:openrelay.metered.ca:80',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443?transport=tcp',username:'openrelayproject',credential:'openrelayproject'}]};
function add(t,c){const d=document.createElement('div');d.className=c;d.innerText=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;}
function setStatus(s){status.innerText=s;}
document.getElementById('btnText').onclick=()=>{isVideo=false;document.body.classList.add('is-chatting');document.body.classList.add('is-text');if(ls){ls.getTracks().forEach(t=>t.stop());ls=null;lv.srcObject=null;}chat.innerHTML='';start();};
document.getElementById('btnVideo').onclick=async()=>{isVideo=true;document.body.classList.add('is-chatting');document.body.classList.remove('is-text');chat.innerHTML='';try{ls=await navigator.mediaDevices.getUserMedia({video:true,audio:true});lv.srcObject=ls;}catch(e){alert('Activa camara y usa HTTPS: '+e.message);isVideo=false;document.body.classList.add('is-text');}start();};
function start(){if(search||room) return;search=true;action.innerText='Stop';action.classList.add('stop');setStatus('Buscando '+ (isVideo?'Video':'Texto')+'...');socket.emit('find',{mode:isVideo?'video':'text'});}
function disc(){if(room) socket.emit('leave',room);socket.emit('cancel');close();}
function close(){gen++;if(pc){try{pc.close()}catch(e){}pc=null;}rv.srcObject=null;room=null;search=false;action.innerText='Start';action.classList.remove('stop');setStatus('Desconectado');}
function sendM(){const t=msg.value.trim();if(!t||!room) return;socket.emit('msg',{room,text:t});add('You: '+t,'you');msg.value='';}
document.getElementById('send').onclick=sendM;msg.onkeydown=e=>e.key==='Enter'&&sendM();action.onclick=()=>{if(room||search) disc(); else start();};
socket.on('matched',async d=>{room=d.room;search=false;chat.innerHTML='';add('Conectado!','');setStatus('Conectado '+d.mode);if(d.mode==='video'&&isVideo)setup(d.init,d.room);});
socket.on('left',()=>{add('Stranger disconnected','');close();});socket.on('msg',t=>add('Stranger: '+t,'stranger'));
socket.on('signal',async s=>{if(!pc) return; if(s.sdp){await pc.setRemoteDescription(s.sdp); if(s.sdp.type==='offer'){const a=await pc.createAnswer();await pc.setLocalDescription(a);socket.emit('signal',{room,s:pc.localDescription});}} else if(s.candidate){try{await pc.addIceCandidate(s.candidate);}catch(e){}}});
function setup(init,rid){if(!ls) return; const my=++gen; pc=new RTCPeerConnection(rtc); ls.getTracks().forEach(t=>pc.addTrack(t,ls)); pc.ontrack=e=>{if(my!==gen) return; if(!rv.srcObject) rv.srcObject=new MediaStream(); rv.srcObject.addTrack(e.track); rv.play().catch(()=>{});}; pc.onicecandidate=e=>e.candidate&&socket.emit('signal',{room:rid,candidate:e.candidate}); if(init) pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>socket.emit('signal',{room:rid,s:pc.localDescription}));}
</script></body></html>`);
});

let q=[]; io.on('connection',s=>{
  s.on('find',d=>{s.mode=d.mode;q=q.filter(x=>x.connected&&x.id!==s.id);let i=q.findIndex(p=>p.connected&&p.mode===s.mode);if(i!==-1){const p=q.splice(i,1)[0];const r='r_'+s.id+'_'+p.id;s.join(r);p.join(r);s.room=r;p.room=r;s.emit('matched',{room:r,init:true,mode:s.mode});p.emit('matched',{room:r,init:false,mode:s.mode});}else{q.push(s);}});
  s.on('cancel',()=>q=q.filter(x=>x.id!==s.id));
  s.on('signal',d=>{if(d.s) s.to(d.room).emit('signal',{sdp:d.s}); if(d.candidate) s.to(d.room).emit('signal',{candidate:d.candidate});});
  s.on('msg',d=>s.to(d.room).emit('msg',d.text));
  s.on('leave',r=>{s.to(r).emit('left');s.leave(r);s.room=null;});
  s.on('disconnect',()=>{q=q.filter(x=>x.id!==s.id); if(s.room) s.to(s.room).emit('left');});
});
server.listen(process.env.PORT||3000,()=>console.log('ARREGLADO: botones arriba + video chico'));
`);