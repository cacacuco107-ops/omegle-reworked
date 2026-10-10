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
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Omegle Reworked — Habla con desconocidos</title>
<meta name="description" content="Omegle Reworked is an independent random text and video chat project.">
<meta name="robots" content="index, follow">
<style>
:root{--blue:#2b91df;--blue-dark:#1769aa;--orange:#ff6b35;--line:#b9d5e9;--paper:#fff;--page:#eaf5fc;--ink:#263746;--muted:#526675}
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:var(--page)}body{min-height:100vh;display:flex;flex-direction:column}
header{background:#fff;border-bottom:3px solid var(--blue);padding:9px max(16px,calc((100% - 1120px)/2));display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.brand{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}.logo{font-size:42px;line-height:1;font-weight:800;letter-spacing:-2px;color:var(--orange);text-decoration:none}.tagline{font-size:15px;color:#333;font-weight:bold;font-style:italic}.independent{font-size:11px;color:#667;max-width:260px;text-align:right}
.landing{width:min(1040px,calc(100% - 24px));margin:22px auto 18px;display:grid;grid-template-columns:1.2fr .8fr;gap:16px;align-items:stretch}.intro,.startbox{background:#fff;border:1px solid var(--line);border-radius:3px;padding:22px;box-shadow:0 1px 2px #17476b0d}.intro h1{font-size:25px;margin:0 0 12px;color:#245d86}.intro p{font-size:15px;line-height:1.6;margin:0 0 10px}.startbox{background:#f8fcff;text-align:center;display:flex;flex-direction:column;justify-content:center;gap:12px}.startbox h2{font-size:21px;margin:0;color:#245d86}.startbox p{font-size:13px;margin:0;color:var(--muted)}.warning{margin-top:14px;padding:11px 12px;background:#fff9e8;border:1px solid #e6ca78;color:#66521d;font-size:12px;line-height:1.55;text-align:left}.options{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;padding:4px}.mode{min-width:118px;min-height:46px;padding:8px 18px;border:1px solid var(--blue-dark);border-radius:3px;background:linear-gradient(#56b1f5,#2385d1);color:white;font-size:16px;font-weight:bold;cursor:pointer;box-shadow:0 1px 0 #fff inset}.mode:hover{filter:brightness(1.04)}.footer{margin-top:4px;color:#6d7d89;font-size:11px;line-height:1.5}
#chat{display:none;width:min(1180px,calc(100% - 16px));margin:10px auto;flex:1;min-height:0;gap:10px;flex-direction:column}body.active{min-height:100vh;height:100dvh;overflow:hidden}body.active .landing{display:none}body.active #chat{display:flex}.videos{display:flex;gap:8px;height:34vh;min-height:140px;max-height:310px}.vbox{flex:1;position:relative;min-width:0;background:#17232d;border:2px solid #b6d7ec;overflow:hidden}.vbox video{width:100%;height:100%;object-fit:cover}.vlabel{position:absolute;bottom:8px;left:8px;color:white;background:#174f7a;padding:4px 8px;font-weight:bold;font-size:12px;border-radius:2px}.panel{display:flex;flex:1;min-height:0;flex-direction:column;border:1px solid #a8c8df;background:#fff;box-shadow:0 1px 2px #17476b0d}.messages{flex:1;min-height:0;overflow:auto;padding:12px;overflow-wrap:anywhere;background:#fff}.msg{margin:0 0 8px;line-height:1.45;font-size:14px}.system{color:#596a76;font-style:italic}.you{color:#1469ac;font-weight:bold}.stranger{color:#d64b3b;font-weight:bold}.controls{display:flex;gap:6px;padding:8px;border-top:1px solid #c3d9e8;background:#f0f8fe;align-items:center;flex-wrap:wrap}.action,.send{min-height:40px;min-width:70px;padding:0 12px;border:1px solid #aac6da;border-radius:3px;font-size:13px;font-weight:bold;cursor:pointer}.action{background:linear-gradient(#fff,#e7f1f8);color:#25465e}.action.stop{background:linear-gradient(#ff725e,#dc4637);color:#fff;border-color:#c73b2d}.send{background:linear-gradient(#56b1f5,#2385d1);color:#fff;border-color:#1769aa}.controls input{flex:1;min-width:90px;height:40px;border:1px solid #b8cedd;border-radius:3px;padding:0 10px;font-size:14px;background:#fff}.status{padding:7px 12px;background:#dceef9;border-top:1px solid #b8d5e7;font-size:12px;color:#37576d;text-align:center}
body.textmode .videos{display:none}@media(min-width:760px){#chat{flex-direction:row}.videos{height:auto;max-height:none;min-height:0;flex:1;flex-direction:column}.panel{flex:1}.controls{flex-shrink:0}.messages{min-height:150px}}
@media(max-width:650px){header{padding:10px 13px}.logo{font-size:36px}.tagline{font-size:13px}.independent{display:none}.landing{grid-template-columns:1fr;margin:12px auto;gap:10px}.intro,.startbox{padding:16px}.intro h1{font-size:22px}.mode{flex:1;min-width:110px}.controls{gap:5px;padding:6px}.action,.send{min-width:58px;padding:0 8px;font-size:12px}.videos{height:30vh}.status{font-size:11px}}
</style>
<script src="/socket.io/socket.io.js"></script>
</head>
<body class="textmode">
<header><div class="brand"><a class="logo" href="/" aria-label="Omegle Reworked inicio">omegle</a><span class="tagline">Talk to strangers! · ¡Habla con desconocidos!</span></div><div class="independent">Omegle Reworked · Proyecto independiente<br>Independent project · No es el servicio original</div></header>
<section class="landing">
<div class="intro"><h1>Talk to strangers! / ¡Habla con desconocidos!</h1>
<p><strong>Omegle Reworked</strong> te conecta con personas al azar para conversar uno a uno. / Connect with random people for one-on-one conversations.</p>
<p>Elige chat de texto o video para empezar. No necesitas crear una cuenta. / Choose text or video chat to get started. No account required.</p>
<div class="warning"><strong>Cuida tu privacidad / Protect your privacy.</strong><br>No compartas tu nombre completo, dirección, teléfono, contraseñas, escuela ni otros datos personales. Termina la conversación si alguien te incomoda.<br>Do not share your full name, address, phone number, passwords, school, or other personal information. Leave if someone makes you uncomfortable.</div></div>
<div class="startbox"><h2>¡Empieza a chatear! / Start chatting!</h2><p>Elige un modo / Choose a mode</p><div class="options"><button class="mode" data-mode="text">Texto / Text</button><button class="mode" data-mode="video">Video / Video</button></div><div class="footer">Este es un proyecto independiente y no está afiliado al Omegle original.<br>This independent project is not affiliated with the original Omegle service.</div></div>
</section>
<main id="chat">
<div class="videos" id="videos">
<div class="vbox"><video id="localVideo" autoplay playsinline muted></video><span class="vlabel">You</span></div>
<div class="vbox"><video id="remoteVideo" autoplay playsinline></video><span class="vlabel">Stranger</span></div>
</div>
<section class="panel"><div class="messages" id="messages" aria-live="polite"><p class="msg system">You are not connected. Choose Text or Video to start chatting.</p></div>
<div class="controls"><button id="action" class="action">Stop</button><input id="message" maxlength="2000" placeholder="Escribe tu mensaje / Type your message..." disabled><button id="send" class="send" disabled>Enviar / Send</button><button id="report" class="action" disabled>Reportar / Report</button><button id="block" class="action" disabled>Bloquear / Block</button></div></section>
</main>
<div class="status" id="status">Ready.</div>
<script>
'use strict';
const socket = io();
const $ = id => document.getElementById(id);
const chat = $('chat'), messages = $('messages'), action = $('action'), input = $('message'), send = $('send'), status = $('status'), reportBtn = $('report'), blockBtn = $('block');
const localVideo = $('localVideo'), remoteVideo = $('remoteVideo');
let mode = null, searching = false, room = null, localStream = null, pc = null;
let queuedCandidates = [], makingOffer = false, closing = false, matchToken = 0, reportSent = false;
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
reportBtn.addEventListener('click',()=>{
 if(!room || reportSent) return;
 const reason=prompt('¿Por qué quieres reportar esta conversación? (acoso, spam, contenido inapropiado u otro)');
 if(!reason || !reason.trim()) return;
 socket.emit('report_user',{roomId:room,reason:reason.trim().slice(0,300)});
 reportSent=true; reportBtn.disabled=true; say('Reporte enviado. Gracias por ayudar a mantener el chat seguro.');
});
blockBtn.addEventListener('click',()=>{
 if(!room) return;
 if(!confirm('¿Bloquear a esta persona y terminar la conversación?')) return;
 const blockedRoom=room; socket.emit('block_user',{roomId:blockedRoom}); disconnect('Has bloqueado a esta persona. No volverás a coincidir con ella durante esta conexión.');
});
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
 searching=false; room=null; matchToken++; cleanupPeer(); reportSent=false; reportBtn.disabled=true; blockBtn.disabled=true;
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
socket.on('disconnect',()=>{searching=false;room=null;matchToken++;cleanupPeer();reportBtn.disabled=true;blockBtn.disabled=true;input.disabled=true;send.disabled=true;setAction('Start',false);status.textContent='Se perdió la conexión con el servidor.';say('Se perdió la conexión con el servidor. Recarga para intentarlo de nuevo.');});
socket.on('waiting',()=>{if(searching)status.textContent='Looking for someone you can chat with...';});
socket.on('matched',async data=>{
 if(!data||!data.roomId) return;
 room=data.roomId; searching=false; const token=++matchToken; reportSent=false; reportBtn.disabled=false; blockBtn.disabled=false;
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
 room=null;searching=false;matchToken++;cleanupPeer();reportSent=false;reportBtn.disabled=true;blockBtn.disabled=true;input.disabled=true;send.disabled=true;setAction('New conversation',false);
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
const blockedPairs = new Set();
const reportCooldown = new Map();
const MESSAGE_COOLDOWN_MS = 300;
const MAX_MESSAGE_LENGTH = 2000;

function removeFromQueue(id) { waitingQueue = waitingQueue.filter(s => s.id !== id); }
function pairKey(a,b) { return [a,b].sort().join('::'); }
function isBlockedPair(a,b) { return blockedPairs.has(pairKey(a,b)); }

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
  const idx = waitingQueue.findIndex(s => s.id !== socket.id && s.mode === socket.mode && !isBlockedPair(socket.id,s.id) && !isBlockedPair(s.id,socket.id));
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
 socket.on('report_user',(data={})=>{
  if(!socket.currentRoom||data.roomId!==socket.currentRoom||typeof data.reason!=='string')return;
  const now=Date.now(),last=reportCooldown.get(socket.id)||0;
  if(now-last<30000)return;
  reportCooldown.set(socket.id,now);
  const memberIds=io.sockets.adapter.rooms.get(socket.currentRoom);
  const reportedId=memberIds?[...memberIds].find(id=>id!==socket.id):null;
  if(!reportedId)return;
  const reason=data.reason.trim().slice(0,300).replace(/[\r\n\t]/g,' ');
  console.log('[USER_REPORT]',JSON.stringify({at:new Date().toISOString(),reporterSocket:socket.id,reportedSocket:reportedId,reason}));
  socket.emit('report_received');
 });
 socket.on('block_user',(data={})=>{
  if(!socket.currentRoom||data.roomId!==socket.currentRoom)return;
  const memberIds=io.sockets.adapter.rooms.get(socket.currentRoom);
  const otherId=memberIds?[...memberIds].find(id=>id!==socket.id):null;
  if(otherId)blockedPairs.add(pairKey(socket.id,otherId));
  clearRoom(socket,true); removeFromQueue(socket.id);
 });
 socket.on('leave_room',()=>{clearRoom(socket,true);removeFromQueue(socket.id);});
 socket.on('disconnect',()=>{clearRoom(socket,true);removeFromQueue(socket.id);lastMessageAt.delete(socket.id);reportCooldown.delete(socket.id);});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0',()=>console.log(`Servidor listo en el puerto ${PORT}`));