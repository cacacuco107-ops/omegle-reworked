const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST'] },
  maxHttpBufferSize: 1e6
});

app.get('/google554feee44a838a44.html', (req, res) => {
  res.type('text/plain').send('google-site-verification: google554feee44a838a44.html');
});
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'), err => {
    if (err && !res.headersSent) res.status(404).type('text/plain').send('sitemap.xml no encontrado');
  });
});

app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Omegle: Talk to strangers!</title>
<meta name="description" content="Omegle Reworked is an independent random text and video chat project.">
<meta name="robots" content="index, follow">
<style>
*{box-sizing:border-box}html,body{margin:0;width:100%;font-family:Arial,Helvetica,sans-serif;color:#333;background:#fff}
body{min-height:100vh;display:flex;flex-direction:column}header{padding:8px 14px;border-bottom:1px solid #ccc}
.brand{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}.logo{font-size:38px;font-weight:bold;letter-spacing:-1px;color:#ff6600;text-decoration:none}.tagline{font-size:14px;color:#555;font-weight:bold;font-style:italic}
.landing{width:min(920px,calc(100% - 24px));margin:18px auto;padding:20px 22px;background:#f7f7f7;border:1px solid #ddd;border-radius:4px;text-align:center}
.landing p{font-size:16px;line-height:1.55;margin:0 auto 12px;max-width:760px}.warning{max-width:760px;margin:16px auto;padding:10px;border:1px solid #e5c36a;background:#fff8df;color:#5d4b1f;font-size:13px;line-height:1.5}
.options{display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap;background:white;padding:10px}.mode{min-width:74px;height:38px;padding:0 18px;border:1px solid #1874c8;border-radius:4px;background:linear-gradient(#4da3f5,#0878d1);color:white;font-size:16px;font-weight:bold;cursor:pointer}
.footer{margin-top:12px;color:#777;font-size:12px}
#chat{display:none;flex:1;min-height:0;padding:8px;gap:8px;flex-direction:column}body.active{height:100dvh;overflow:hidden}body.active .landing{display:none}body.active #chat{display:flex}
.videos{display:flex;gap:6px;height:32vh;min-height:130px;max-height:280px}.vbox{flex:1;position:relative;min-width:0;background:#222;border:1px solid #ccc;overflow:hidden}.vbox video{width:100%;height:100%;object-fit:cover}.vlabel{position:absolute;bottom:8px;left:8px;color:white;background:#111;padding:3px 6px;font-weight:bold;font-size:12px}
body.textmode .videos{display:none}.panel{display:flex;flex:1;min-height:0;flex-direction:column;border:1px solid #aaa;background:#fff}.messages{flex:1;min-height:0;overflow:auto;padding:10px;overflow-wrap:anywhere}.msg{margin:0 0 7px;line-height:1.4}.system{color:#555;font-style:italic}.you{color:#00f;font-weight:bold}.stranger{color:#d00;font-weight:bold}
.controls{display:flex;gap:6px;padding:6px;border-top:1px solid #ccc;background:#f8f8f8;align-items:center}.action,.send{height:40px;min-width:72px;padding:0 12px;border:1px solid #aaa;border-radius:4px;font-size:14px;font-weight:bold;cursor:pointer}.action{background:linear-gradient(#fff,#e6e6e6);color:#333}.action.stop{background:linear-gradient(#ff4d4d,#c00);color:white;border-color:#900}.send{background:linear-gradient(#fff,#e6e6e6);color:#333}.controls input{flex:1;min-width:0;height:40px;border:1px solid #ccc;border-radius:4px;padding:0 10px;font-size:14px}.status{padding:5px 12px;background:#e9e9e9;border-top:1px solid #ccc;font-size:12px}
@media(min-width:700px){#chat{flex-direction:row}.videos{height:auto;max-height:none;min-height:0;flex:1;flex-direction:column}.panel{flex:1}.controls{flex-shrink:0}}
@media(max-width:500px){.logo{font-size:32px}.landing{padding:15px 12px;margin:10px auto}.landing p{font-size:14px}.warning{font-size:12px}.controls{gap:4px;padding:5px}.action,.send{min-width:58px;padding:0 8px}.videos{height:31vh}}
</style>
<script src="/socket.io/socket.io.js"></script>
</head>
<body class="textmode">
<header><div class="brand"><a class="logo" href="/">omegle</a><span class="tagline">Talk to strangers!</span></div></header>
<section class="landing">
<p><strong>Omegle</strong> connects you with random strangers for one-on-one conversations.</p>
<p>Choose text chat or video chat to meet someone new. No account is needed to start.</p>
<div class="warning"><strong>Be careful when chatting with strangers.</strong> Do not share your full name, address, phone number, passwords, school, or other personal information. End the conversation if someone makes you uncomfortable.</div>
<div class="options"><span>Start chatting:</span><button class="mode" data-mode="text">Text</button><button class="mode" data-mode="video">Video</button></div>
<div class="footer">Omegle Reworked is an independent project and is not the original Omegle service.</div>
</section>
<main id="chat">
<div class="videos" id="videos">
<div class="vbox"><video id="localVideo" autoplay playsinline muted></video><span class="vlabel">You</span></div>
<div class="vbox"><video id="remoteVideo" autoplay playsinline></video><span class="vlabel">Stranger</span></div>
</div>
<section class="panel"><div class="messages" id="messages" aria-live="polite"><p class="msg system">You are not connected. Choose Text or Video to start chatting.</p></div>
<div class="controls"><button id="action" class="action">Stop</button><input id="message" maxlength="2000" placeholder="Type your message here..." disabled><button id="send" class="send" disabled>Send</button></div></section>
</main>
<div class="status" id="status">Ready.</div>
<script>
'use strict';
const socket = io();
const $ = id => document.getElementById(id);
const chat = $('chat'), messages = $('messages'), action = $('action'), input = $('message'), send = $('send'), status = $('status');
const localVideo = $('localVideo'), remoteVideo = $('remoteVideo');
let mode = null, searching = false, room = null, localStream = null, pc = null;
let queuedCandidates = [], makingOffer = false, closing = false, matchToken = 0;
const rtcConfig = { iceServers: [
 {urls:'stun:stun.l.google.com:19302'},
 {urls:'stun:stun1.l.google.com:19302'}
]};

function say(text, cls='system') {
 const p=document.createElement('p'); p.className='msg '+cls; p.textContent=text;
 messages.appendChild(p); messages.scrollTop=messages.scrollHeight;
}
function setAction(label, stop=false) { action.textContent=label; action.className='action'+(stop?' stop':''); }
function enterChat(nextMode) {
 if (room || searching) disconnect();
 mode=nextMode; document.body.classList.add('active');
 document.body.classList.toggle('textmode', mode==='text');
 messages.innerHTML='';
 say('Omegle: Talk to strangers!');
 if (mode==='video') startCamera().then(() => startSearch()).catch(err => {
   say('No se pudo acceder a la cámara/micrófono. Revisa los permisos y vuelve a intentarlo.');
   status.textContent='Cámara no disponible; puedes volver e intentar Texto.';
   console.error(err);
 });
 else startSearch();
}
document.querySelectorAll('.mode').forEach(b=>b.addEventListener('click',()=>enterChat(b.dataset.mode)));
action.addEventListener('click',()=>{ if(room || searching) disconnect(); else if(mode) startSearch(); else { document.body.classList.remove('active'); } });
send.addEventListener('click',sendMessage);
input.addEventListener('keydown',e=>{if(e.key==='Enter')sendMessage();});

async function startCamera() {
 if(localStream) return;
 if(!navigator.mediaDevices?.getUserMedia) throw new Error('getUserMedia requiere HTTPS');
 localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
 localVideo.srcObject=localStream;
}
function stopCamera() {
 if(localStream) localStream.getTracks().forEach(t=>t.stop());
 localStream=null; localVideo.srcObject=null;
}
function startSearch() {
 if(!socket.connected) { say('No se pudo conectar al servidor. Recarga la página e inténtalo otra vez.'); status.textContent='Servidor desconectado.'; return; }
 if(searching||room) return;
 searching=true; setAction('Stop',true); input.disabled=true; send.disabled=true;
 status.textContent='Looking for someone you can chat with...';
 socket.emit('find_partner',{mode:mode||'text',location:'Unknown'});
}
function sendMessage() {
 const text=input.value.trim(); if(!text) return;
 if(!room||!socket.connected) {say('Todavía no estás conectado con nadie.');return;}
 socket.emit('chat_message',{roomId:room,text}); say('You: '+text,'you'); input.value='';
}
function disconnect(message='You have disconnected.') {
 if(closing)return; closing=true;
 const oldRoom=room;
 if(oldRoom) socket.emit('leave_room',{roomId:oldRoom});
 if(searching) socket.emit('cancel_search');
 searching=false; room=null; matchToken++; cleanupPeer();
 input.disabled=true;send.disabled=true;setAction('New conversation',false);
 status.textContent='Disconnected.'; say(message);
 closing=false;
}
function cleanupPeer() {
 if(pc) {pc.ontrack=null;pc.onicecandidate=null;try{pc.close()}catch(e){}}
 pc=null;queuedCandidates=[];
 remoteVideo.srcObject=null;
}
socket.on('connect',()=>{status.textContent='Connected to server.';});
socket.on('connect_error',err=>{console.error('Socket.IO connection error:',err);status.textContent='Error conectando al servidor.';});
socket.on('disconnect',()=>{searching=false;room=null;matchToken++;cleanupPeer();input.disabled=true;send.disabled=true;setAction('Start',false);status.textContent='Se perdió la conexión con el servidor.';say('Se perdió la conexión con el servidor. Recarga para intentarlo de nuevo.');});
socket.on('waiting',()=>{if(searching)status.textContent='Looking for someone you can chat with...';});
socket.on('matched',async data=>{
 if(!data||!data.roomId) return;
 room=data.roomId; searching=false; const token=++matchToken;
 input.disabled=false;send.disabled=false;setAction('Stop',true);
 status.textContent='Connected!';say("You're now chatting with a random stranger. Say hi!");
 if(mode==='video') {
   try {
    await startCamera();
    if(token!==matchToken||!room)return;
    setupPeer(!!data.isInitiator, data.roomId, token);
   } catch(err) {console.error(err);say('El vídeo no pudo iniciarse. Puedes desconectar e intentar Texto.');}
 }
});
socket.on('partner_left',()=>{
 if(!room)return;
 room=null;searching=false;matchToken++;cleanupPeer();input.disabled=true;send.disabled=true;setAction('New conversation',false);
 status.textContent='Stranger has disconnected.';say('Stranger has disconnected.');
});
socket.on('chat_message',text=>{if(typeof text==='string')say('Stranger: '+text.slice(0,2000),'stranger');});

function setupPeer(initiator, roomId, token) {
 cleanupPeer();
 const connection=new RTCPeerConnection(rtcConfig);pc=connection;
 localStream?.getTracks().forEach(track=>connection.addTrack(track,localStream));
 connection.ontrack=e=>{if(pc===connection&&token===matchToken&&e.streams[0]){remoteVideo.srcObject=e.streams[0];remoteVideo.play().catch(()=>{});}};
 connection.onicecandidate=e=>{if(e.candidate&&pc===connection&&room===roomId)socket.emit('signal',{roomId,candidate:e.candidate});};
 connection.onconnectionstatechange=()=>{if(pc===connection&&connection.connectionState==='failed')status.textContent='Vídeo no pudo conectar; prueba otra vez o usa Texto.';};
 if(initiator) {
   (async()=>{try {
     const offer=await connection.createOffer();
     if(pc!==connection||room!==roomId)return;
     await connection.setLocalDescription(offer);
     socket.emit('signal',{roomId,sdp:connection.localDescription});
   }catch(err){console.error('Offer error:',err);}})();
 }
 drainCandidates(connection);
}
async function drainCandidates(connection) {
 if(!connection.remoteDescription)return;
 const pending=queuedCandidates;queuedCandidates=[];
 for(const candidate of pending){try{await connection.addIceCandidate(candidate);}catch(e){console.warn(e);}}
}
socket.on('signal',async data=>{
 if(!data||!room||data.roomId!==room)return;
 const connection=pc;
 if(!connection){ if(data.sdp) say('Preparando conexión de vídeo...'); return; }
 try {
  if(data.sdp) {
   await connection.setRemoteDescription(data.sdp);
   if(pc!==connection)return;
   await drainCandidates(connection);
   if(data.sdp.type==='offer') {
    const answer=await connection.createAnswer();
    await connection.setLocalDescription(answer);
    if(pc===connection&&room===data.roomId)socket.emit('signal',{roomId:room,sdp:connection.localDescription});
   }
  } else if(data.candidate) {
   if(!connection.remoteDescription) {if(queuedCandidates.length<100)queuedCandidates.push(data.candidate);}
   else await connection.addIceCandidate(data.candidate);
  }
 }catch(err){console.warn('WebRTC signal error:',err);}
});
window.addEventListener('beforeunload',()=>{stopCamera();cleanupPeer();});
</script>
</body></html>`);
});

let waitingQueue = [];
const lastMessageAt = new Map();
const MESSAGE_COOLDOWN_MS = 300;
const MAX_MESSAGE_LENGTH = 2000;

function removeFromQueue(id) { waitingQueue = waitingQueue.filter(s => s.id !== id); }

function clearRoom(socket, notifyPartner = true) {
 const roomId = socket.currentRoom;
 if (!roomId) return;
 const memberIds = io.sockets.adapter.rooms.get(roomId);
 if (memberIds) {
  for (const id of [...memberIds]) {
   if (id === socket.id) continue;
   const partner = io.sockets.sockets.get(id);
   if (partner) {
    partner.currentRoom = null;
    if (notifyPartner) partner.emit('partner_left');
   }
  }
 }
 socket.leave(roomId);
 socket.currentRoom = null;
}

io.on('connection', socket => {
 socket.on('find_partner', (data = {}) => {
  if (socket.currentRoom) return;
  removeFromQueue(socket.id);
  socket.location = typeof data.location === 'string' ? data.location.slice(0,100) : 'Unknown';
  socket.mode = data.mode === 'text' ? 'text' : 'video';
  waitingQueue = waitingQueue.filter(s => io.sockets.sockets.has(s.id) && !s.currentRoom);
  const idx = waitingQueue.findIndex(s => s.id !== socket.id && s.mode === socket.mode);
  if (idx >= 0) {
   const partner = waitingQueue.splice(idx,1)[0];
   const roomId = `room_${socket.id}_${partner.id}`;
   socket.join(roomId); partner.join(roomId);
   socket.currentRoom = roomId; partner.currentRoom = roomId;
   socket.emit('matched',{roomId,isInitiator:true,mode:socket.mode,partnerLocation:partner.location});
   partner.emit('matched',{roomId,isInitiator:false,mode:socket.mode,partnerLocation:socket.location});
  } else {
   waitingQueue.push(socket);
   socket.emit('waiting');
  }
 });
 socket.on('cancel_search',()=>removeFromQueue(socket.id));
 socket.on('signal',(data={})=>{
  if(!socket.currentRoom||data.roomId!==socket.currentRoom)return;
  if(!data.sdp&&!data.candidate)return;
  socket.to(socket.currentRoom).emit('signal',{
   roomId:socket.currentRoom,
   ...(data.sdp?{sdp:data.sdp}:{}),
   ...(data.candidate?{candidate:data.candidate}:{})
  });
 });
 socket.on('chat_message',(data={})=>{
  if(!socket.currentRoom||data.roomId!==socket.currentRoom||typeof data.text!=='string')return;
  const now=Date.now(),prev=lastMessageAt.get(socket.id)||0;
  if(now-prev<MESSAGE_COOLDOWN_MS)return;
  lastMessageAt.set(socket.id,now);
  const text=data.text.trim().slice(0,MAX_MESSAGE_LENGTH);
  if(text)socket.to(socket.currentRoom).emit('chat_message',text);
 });
 socket.on('leave_room',()=>{clearRoom(socket,true);removeFromQueue(socket.id);});
 socket.on('disconnect',()=>{clearRoom(socket,true);removeFromQueue(socket.id);lastMessageAt.delete(socket.id);});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0',()=>console.log(`Servidor listo en el puerto ${PORT}`));