const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- TU SEO ---
app.get('/google554feee44a838a44.html', (req,res)=> res.type('text/html').send('google-site-verification: google554feee44a838a44.html'));
app.get('/sitemap.xml', (req,res)=>{
  const base = `${req.protocol}://${req.get('host')}`;
  res.type('application/xml').send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url></urlset>`);
});
app.get('/robots.txt', (req,res)=> res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`));

app.get('/', (req,res)=>{ res.send(`
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Omegle - Talk to strangers!</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Arial}
body{background:#fff}
header{width:900px;max-width:100%;margin:0 auto;padding:8px 10px;display:flex;gap:12px;align-items:baseline}
.logo{color:#FF6A00;font-size:42px;font-weight:900;letter-spacing:-3px;text-decoration:none}
#landing{width:900px;max-width:calc(100% - 20px);margin:20px auto;border:1px solid #ccc;background:#f6f6f6;padding:20px;text-align:center}
.modeBtn{background:#4d90d2;color:#fff;font-weight:bold;font-size:18px;padding:10px 24px;border:1px solid #315b87;cursor:pointer;margin:8px}
#main{width:900px;max-width:100%;margin:0 auto;border:1px solid #999;background:#eee;display:none}
body.is-chatting #landing{display:none!important}
body.is-chatting #main{display:block!important}
.videos{height:150px!important;display:flex;background:#000}
body.is-text .videos{display:none!important}
.box{flex:1;background:#111;overflow:hidden}video{width:100%;height:100%;object-fit:cover;background:#000}#local{transform:scaleX(-1)}
.chat{height:160px!important;overflow-y:auto;background:#fff;padding:10px;font-size:14px;border-top:1px solid #999;border-bottom:1px solid #999}
.you{color:blue;font-weight:bold}.stranger{color:red;font-weight:bold}
.ctrl{display:flex;gap:6px;padding:6px;background:#d5d5d5;border-top:1px solid #999}
.ctrl input{flex:1;border:1px solid #999;height:38px;padding:0 10px}
.ctrl button{border:1px solid #777;height:38px;padding:0 16px;font-weight:bold;background:#fff}
#action.stop{background:#ff3b30;color:#fff}
#status{width:900px;max-width:100%;margin:0 auto;padding:4px 8px;font-size:11px;background:#f0f0f0;border:1px solid #999;border-top:0}
@media(max-width:600px){.videos{height:40vw!important;max-height:160px}}
</style></head><body>
<header><a class="logo" href="/">omegle</a> Talk to strangers!</header>
<div id="landing"><p>Omegle te conecta con desconocidos al azar.</p><div><button class="modeBtn" id="btnText">Text</button><button class="modeBtn" id="btnVideo">Video</button></div></div>
<div id="main"><div class="videos"><div class="box"><video id="local" autoplay playsinline muted></video></div><div class="box"><video id="remote" autoplay playsinline></video></div></div><div class="chat" id="chat"><div>Presiona Start</div></div><div class="ctrl"><button id="action">Start</button><input id="msg" placeholder="Type a message..." autocomplete="off"><button id="send">Send</button></div></div>
<div id="status">Ready</div>
<script src="/socket.io/socket.io.js"></script><script>
const socket=io();let ls=null,pc=null,room=null,search=false,isVideo=false,gen=0;
const lv=document.getElementById('local'),rv=document.getElementById('remote'),chat=document.getElementById('chat'),msg=document.getElementById('msg'),action=document.getElementById('action'),status=document.getElementById('status');
const rtc={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'turn:openrelay.metered.ca:80',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443?transport=tcp',username:'openrelayproject',credential:'openrelayproject'}]};
function add(t,c){const d=document.createElement('div');d.className=c;d.innerText=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;}
function setStatus(s){status.innerText=s;}
document.getElementById('btnText').onclick=()=>{isVideo=false;document.body.classList.add('is-chatting');document.body.classList.add('is-text');if(ls){ls.getTracks().forEach(t=>t.stop());ls=null;lv.srcObject=null;}chat.innerHTML='';start();};
document.getElementById('btnVideo').onclick=async()=>{isVideo=true;document.body.classList.add('is-chatting');document.body.classList.remove('is-text');chat.innerHTML='';try{ls=await navigator.mediaDevices.getUserMedia({video:true,audio:true});lv.srcObject=ls;}catch(e){alert('Activa camara y usa HTTPS: '+e.message);isVideo=false;document.body.classList.add('is-text');}start();};
function start(){if(search||room) return;search=true;action.innerText='Stop';action.classList.add('stop');setStatus('Buscando '+(isVideo?'Video':'Texto')+'...');socket.emit('find',{mode:isVideo?'video':'text'});}
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
server.listen(process.env.PORT||3000,()=>console.log('BOTONES ARRIBA'));
