const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.ALLOWED_ORIGIN || "*" } });

// --- SEO QUE YA TENIAS, LO CONSERVE ---
app.get('/google554feee44a838a44.html', (req, res) => {
    // Pega aquí el contenido exacto que te da Google Search Console
    res.type('text/html').send('google-site-verification: google554feee44a838a44.html');
});

app.get('/sitemap.xml', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url></urlset>`);
});

app.get('/robots.txt', (req,res)=>{
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
});
// --- FIN SEO ---

app.get('/', (req, res) => {
res.send(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Omegle - Talk to strangers! / Habla con desconocidos</title>
<meta name="description" content="Omegle Legacy: chat aleatorio de texto y video. Habla con desconocidos.">
<meta name="keywords" content="omegle, omegle español, chat random, video chat">
<meta name="robots" content="index, follow">
<style>*{box-sizing:border-box;margin:0;padding:0;font-family:Arial}body{background:#fff}header{width:900px;max-width:100%;margin:10px auto;padding:5px;display:flex;gap:15px;align-items:baseline}.logo{color:#FF6A00;font-size:52px;font-weight:900;letter-spacing:-3px;text-decoration:none}#landing{width:900px;max-width:calc(100% - 20px);margin:20px auto;border:1px solid #ccc;background:#f6f6f6;padding:15px}.modeBtn{background:#4d90d2;color:#fff;font-weight:bold;font-size:18px;padding:8px 22px;border:1px solid #315b87;cursor:pointer;margin:5px}.main{width:900px;max-width:100%;margin:0 auto;border:1px solid #999;background:#eee;display:none;flex-direction:column}body.chat.main{display:flex}body.chat #landing{display:none}.videos{height:380px;display:flex;background:#000}.box{flex:1;background:#000;position:relative}video{width:100%;height:100%;object-fit:contain;background:#000}#local{transform:scaleX(-1)}.chat{height:250px;background:#fff;overflow-y:auto;padding:10px;font-size:14px;border-top:1px solid #999;border-bottom:1px solid #999}.you{color:blue;font-weight:bold}.stranger{color:red;font-weight:bold}.ctrl{display:flex;gap:6px;padding:6px;background:#d5d5d5}input{flex:1;border:1px solid #999;height:34px;padding:0 8px}button{border:1px solid #999;height:34px;padding:0 12px;font-weight:bold;cursor:pointer}</style></head><body>
<header><a class="logo" href="/">omegle</a> Talk to strangers!</header>
<div id="landing"><h1 style="font-size:16px;margin-bottom:10px">Omegle: Habla con desconocidos!</h1><p style="font-size:14px">Chat de texto y video aleatorio. Proyecto independiente.</p><div style="margin-top:15px;text-align:center"><button class="modeBtn" data-m="text">Texto</button><button class="modeBtn" data-m="video">Video</button></div></div>
<div class="main" id="main"><div class="videos"><div class="box"><video id="local" autoplay playsinline muted></video></div><div class="box"><video id="remote" autoplay playsinline></video></div></div><div class="chat" id="chat"></div><div class="ctrl"><button id="action">Start</button><input id="msg" placeholder="Type..."><button id="send">Send</button></div></div>
<script src="/socket.io/socket.io.js"></script><script>
const socket=io();let ls=null,pc=null,room=null,search=false,video=false,gen=0;
const lv=document.getElementById('local'),rv=document.getElementById('remote'),chat=document.getElementById('chat'),msg=document.getElementById('msg'),action=document.getElementById('action');
const rtc={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'turn:openrelay.metered.ca:80',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443?transport=tcp',username:'openrelayproject',credential:'openrelayproject'}]};
document.querySelectorAll('.modeBtn').forEach(b=>b.onclick=()=>{video=b.dataset.m==='video';document.body.classList.add('chat');start(); if(video) navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(s=>{ls=s;lv.srcObject=s;});});
function start(){if(search||room) return; search=true; action.innerText='Stop'; socket.emit('find',{mode:video?'video':'text'});}
function disc(){ if(room) socket.emit('leave',room); socket.emit('cancel'); close(); }
function close(){gen++;pc&&pc.close();pc=null;rv.srcObject=null;room=null;search=false;action.innerText='Start';}
function sendM(){ const t=msg.value.trim(); if(!t||!room) return; socket.emit('msg',{room,text:t}); add('You: '+t,'you'); msg.value='';}
document.getElementById('send').onclick=sendM; msg.onkeydown=e=>e.key==='Enter'&&sendM(); action.onclick=()=>{ if(room||search) disc(); else start(); };
function add(t,c){ const d=document.createElement('div'); d.className=c; d.innerText=t; chat.appendChild(d); chat.scrollTop=chat.scrollHeight; }
socket.on('matched',async d=>{ room=d.room; search=false; add('Conectado!',''); if(d.mode==='video'&&video){ if(!ls){ try{ls=await navigator.mediaDevices.getUserMedia({video:true,audio:true}); lv.srcObject=ls;}catch(e){} } setup(d.init,d.room);} });
socket.on('left',()=>{add('Stranger disconnected',''); close();}); socket.on('msg',t=>add('Stranger: '+t,'stranger')); socket.on('signal',async s=>{ if(!pc) return; if(s.sdp){await pc.setRemoteDescription(s.sdp); if(s.sdp.type==='offer'){ const a=await pc.createAnswer(); await pc.setLocalDescription(a); socket.emit('signal',{room:room,sdp:pc.localDescription}); }} else if(s.candidate){ try{await pc.addIceCandidate(s.candidate);}catch(e){} } });
function setup(init,rid){ const my=++gen; pc=new RTCPeerConnection(rtc); ls.getTracks().forEach(t=>pc.addTrack(t,ls)); pc.ontrack=e=>{ if(my!==gen) return; if(!rv.srcObject) rv.srcObject=new MediaStream(); rv.srcObject.addTrack(e.track); rv.play().catch(()=>{}); }; pc.onicecandidate=e=>e.candidate&&socket.emit('signal',{room:rid,candidate:e.candidate}); if(init) pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>socket.emit('signal',{room:rid,sdp:pc.localDescription})); }
</script></body></html>`);
});

let q=[]; io.on('connection',s=>{ s.on('find',d=>{ s.mode=d.mode; q=q.filter(x=>x.connected); let i=q.findIndex(p=>p.mode===s.mode); if(i!==-1){ const p=q.splice(i,1)[0]; const r='r_'+s.id+'_'+p.id; s.join(r); p.join(r); s.room=r; p.room=r; s.emit('matched',{room:r,init:true,mode:s.mode}); p.emit('matched',{room:r,init:false,mode:s.mode}); }else{ q.push(s); } }); s.on('cancel',()=>q=q.filter(x=>x.id!==s.id)); s.on('signal',d=>s.to(d.room).emit('signal',d)); s.on('msg',d=>s.to(d.room).emit('msg',d.text)); s.on('leave',r=>{ s.to(r).emit('left'); s.leave(r); s.room=null; }); s.on('disconnect',()=>{ q=q.filter(x=>x.id!==s.id); if(s.room) s.to(s.room).emit('left'); }); });
server.listen(process.env.PORT||3000,()=>console.log('listo con SEO + TURN'));