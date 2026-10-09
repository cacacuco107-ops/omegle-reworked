const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omegle: Talk to strangers!</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        body { background: #fff; color: #333; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        header { border-bottom: 2px solid #365899; padding: 8px 15px; }
        .logo { font-size: 24px; font-weight: bold; color: #365899; text-decoration: none; }
        .logo span { color: #ff7700; }
        
        /* Controles en la parte superior */
        .controls-panel { height: 50px; background: #fff; border-bottom: 1px solid #ccc; display: flex; padding: 6px 10px; gap: 8px; align-items: center; }
        button.btn-action { background: #3b5998; color: #fff; border: 1px solid #1e2e54; font-size: 15px; font-weight: bold; padding: 0 16px; height: 38px; border-radius: 4px; cursor: pointer; }
        button.btn-stop { background: #ff4500; border-color: #992900; }
        input[type="text"] { flex: 1; height: 38px; border: 1px solid #ccc; border-radius: 4px; padding: 0 10px; font-size: 14px; }

        .main-container { display: flex; flex: 1; padding: 8px; gap: 8px; background: #f0f2f5; flex-direction: column; overflow: hidden; }
        @media (min-width: 600px) { .main-container { flex-direction: row; } }
        
        /* Panel de video: Tu cámara a la izquierda, Stranger a la derecha */
        .video-panel { flex: 1; display: flex; gap: 8px; }
        @media (min-width: 600px) { .video-panel { flex: 2; flex-direction: column; } }
        .video-box { flex: 1; background: #000; border-radius: 6px; border: 2px solid #ccc; position: relative; overflow: hidden; min-height: 120px; }
        video { width: 100%; height: 100%; object-fit: cover; }
        #localVideo { transform: scaleX(-1); }
        .video-label { position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; }
        
        /* Panel de chat */
        .chat-panel { flex: 1; display: flex; flex-direction: column; background: #fff; border: 1px solid #ccc; border-radius: 6px; }
        .chat-box { flex: 1; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; font-size: 14px; max-height: 250px; }
        .msg { word-break: break-word; }
        .msg.you { color: #0000ff; font-weight: bold; }
        .msg.stranger { color: #ff0000; font-weight: bold; }
        .msg.system { color: #555; font-style: italic; font-size: 12px; }
        .msg.location { color: #2563eb; font-weight: bold; background: #eff6ff; padding: 4px; border-radius: 4px; }
        
        .status-bar { background: #e9ebee; color: #333; padding: 4px 15px; font-size: 12px; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/nsfwjs"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <header><a href="#" class="logo">omegle<span>.com</span></a></header>
    
    <div class="controls-panel">
        <button id="actionBtn" class="btn-action">Start</button>
        <input type="text" id="msgInput" placeholder="Escribe un mensaje..." disabled>
        <button id="sendBtn" class="btn-action" disabled>Send</button>
    </div>

    <div class="main-container">
        <div class="video-panel">
            <div class="video-box"><video id="localVideo" autoplay playsinline muted></video><div class="video-label" id="myLabel">You</div></div>
            <div class="video-box"><video id="remoteVideo" autoplay playsinline></video><div class="video-label" id="strangerLabel">Stranger</div></div>
        </div>
        <div class="chat-panel">
            <div class="chat-box" id="chatBox"><div class="msg system">Presiona Start para buscar.</div></div>
        </div>
    </div>
    <div class="status-bar" id="statusBar">Iniciando sistema...</div>

    <script>
        const socket = io();
        let localStream, peerConnection, currentRoom, nsfwModel;
        let myLocation = "Ubicación desconocida";
        let isSearching = false;

        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        const chatBox = document.getElementById('chatBox');
        const msgInput = document.getElementById('msgInput');
        const actionBtn = document.getElementById('actionBtn');
        const sendBtn = document.getElementById('sendBtn');
        const statusBar = document.getElementById('statusBar');

        const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        actionBtn.onclick = handleActionBtn;
        sendBtn.onclick = sendMessage;

        async function init() {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideo.srcObject = localStream;
                statusBar.innerText = "Cámara lista. Cargando seguridad...";
                fetchLocation();
                nsfwModel = await nsfwjs.load();
                statusBar.innerText = "Sistema listo.";
                setInterval(scanVideo, 3000);
            } catch (err) {
                if (!localStream) statusBar.innerText = "Error: Permite el acceso a la cámara.";
            }
        }

        async function fetchLocation() {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data.city && data.country_name) {
                    myLocation = data.city + ", " + data.country_name;
                    document.getElementById('myLabel').innerText = "You (" + myLocation + ")";
                }
            } catch (e) {}
        }

        async function scanVideo() {
            if (nsfwModel && localVideo.readyState === 4) {
                const predictions = await nsfwModel.classify(localVideo);
                const unsafe = predictions.find(p => (p.className === 'Porn' || p.className === 'Hentai') && p.probability > 0.65);
                if (unsafe) { addSystemMsg("Seguridad: Contenido inapropiado."); disconnect(); }
            }
        }

        function handleActionBtn() {
            if (currentRoom || isSearching) {
                disconnect();
            } else {
                startSearch();
            }
        }

        function startSearch() {
            isSearching = true;
            statusBar.innerText = "Buscando un extraño...";
            actionBtn.innerText = "Stop";
            actionBtn.className = "btn-action btn-stop";
            socket.emit('find_partner', myLocation);
        }

        function sendMessage() {
            let text = msgInput.value.trim();
            if (!text) return;
            if (currentRoom) {
                socket.emit('chat_message', { roomId: currentRoom, text });
                addMsg("You: ", text, "you");
            } else {
                addSystemMsg("Debes conectar con alguien para enviar mensajes.");
            }
            msgInput.value = '';
        }

        function disconnect() {
            if (currentRoom) {
                socket.emit('leave_room', currentRoom);
            }
            socket.emit('cancel_search');
            
            closeConnection();
            isSearching = false;
            actionBtn.innerText = "Start";
            actionBtn.className = "btn-action";
            statusBar.innerText = "Desconectado.";
            addSystemMsg("Desconectado.");
        }

        function closeConnection() {
            if (peerConnection) { peerConnection.close(); peerConnection = null; }
            remoteVideo.srcObject = null;
            msgInput.disabled = true;
            sendBtn.disabled = true;
            currentRoom = null;
            document.getElementById('strangerLabel').innerText = "Stranger";
        }

        socket.on('waiting', () => { statusBar.innerText = "Esperando conexión..."; });

        socket.on('matched', ({ roomId, isInitiator, partnerLocation }) => {
            currentRoom = roomId;
            isSearching = false;
            statusBar.innerText = "¡Conectado!";
            actionBtn.innerText = "Stop";
            actionBtn.className = "btn-action btn-stop";
            msgInput.disabled = false;
            sendBtn.disabled = false;
            addSystemMsg("¡Te has conectado con un extraño!");
            if (partnerLocation) {
                addLocationMsg("El extraño está en: " + partnerLocation);
                document.getElementById('strangerLabel').innerText = "Stranger (" + partnerLocation + ")";
            }
            setupWebRTC(isInitiator);
        });

        socket.on('partner_left', () => {
            addSystemMsg("El extraño se ha desconectado.");
            closeConnection();
            isSearching = false;
            actionBtn.innerText = "Start";
            actionBtn.className = "btn-action";
        });

        socket.on('chat_message', (text) => { addMsg("Stranger: ", text, "stranger"); });

        function setupWebRTC(isInitiator) {
            peerConnection = new RTCPeerConnection(rtcConfig);
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
            peerConnection.ontrack = (e) => { remoteVideo.srcObject = e.streams[0]; };
            peerConnection.onicecandidate = (e) => {
                if (e.candidate) socket.emit('signal', { roomId: currentRoom, candidate: e.candidate });
            };
            if (isInitiator) {
                peerConnection.onnegotiationneeded = async () => {
                    const offer = await peerConnection.createOffer();
                    await peerConnection.setLocalDescription(offer);
                    socket.emit('signal', { roomId: currentRoom, sdp: peerConnection.localDescription });
                };
            }
        }

        socket.on('signal', async (data) => {
            if (!peerConnection) return;
            if (data.sdp) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                if (data.sdp.type === 'offer') {
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    socket.emit('signal', { roomId: currentRoom, sdp: peerConnection.localDescription });
                }
            } else if (data.candidate) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        });

        function addMsg(prefix, text, type) {
            const div = document.createElement('div');
            div.className = 'msg ' + type;
            div.innerText = prefix + text;
            chatBox.appendChild(div);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function addSystemMsg(text) { addMsg("", text, "system"); }
        function addLocationMsg(text) { addMsg("", text, "location"); }

        msgInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
        window.onload = init;
    </script>
</body>
</html>
    `);
});

let waitingUser = null;

io.on('connection', (socket) => {
    socket.on('find_partner', (location) => {
        socket.location = location;
        if (waitingUser && waitingUser.id !== socket.id) {
            const partner = waitingUser;
            waitingUser = null;
            const roomId = `room_${socket.id}_${partner.id}`;
            socket.join(roomId);
            partner.join(roomId);

            socket.emit('matched', { roomId, isInitiator: true, partnerLocation: partner.location });
            partner.emit('matched', { roomId, isInitiator: false, partnerLocation: socket.location });
        } else {
            waitingUser = socket;
            socket.emit('waiting');
        }
    });

    socket.on('cancel_search', () => {
        if (waitingUser && waitingUser.id === socket.id) {
            waitingUser = null;
        }
    });

    socket.on('signal', (data) => { socket.to(data.roomId).emit('signal', data); });
    socket.on('chat_message', (data) => { socket.to(data.roomId).emit('chat_message', data.text); });
    socket.on('leave_room', (roomId) => {
        socket.to(roomId).emit('partner_left');
        socket.leave(roomId);
        if (waitingUser && waitingUser.id === socket.id) waitingUser = null;
    });
    socket.on('disconnect', () => {
        if (waitingUser && waitingUser.id === socket.id) waitingUser = null;
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => { console.log('Servidor listo'); });
