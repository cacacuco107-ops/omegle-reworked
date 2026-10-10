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
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; }
        body { background: #fff; color: #333; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        
        /* Header clásico Omegle */
        header { background: #fff; border-bottom: 3px solid #365899; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 32px; font-weight: bold; color: #365899; text-decoration: none; font-family: 'Arial Black', Gadget, sans-serif; }
        .logo span { color: #ff7700; }
        .tagline { font-size: 13px; color: #555; font-weight: bold; }

        /* Selector de Modo (Video / Texto) */
        .mode-selector { background: #e9ebee; border-bottom: 1px solid #ccc; padding: 8px 15px; display: flex; align-items: center; gap: 15px; font-size: 14px; }
        .mode-selector label { font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; gap: 5px; }

        /* Panel de Controles Arriba */
        .controls-panel { height: 50px; background: #fff; border-bottom: 1px solid #ccc; display: flex; padding: 6px 12px; gap: 8px; align-items: center; }
        button.btn-action { background: #3b5998; color: #fff; border: 1px solid #1e2e54; font-size: 15px; font-weight: bold; padding: 0 20px; height: 38px; border-radius: 4px; cursor: pointer; }
        button.btn-action:hover { background: #2d4373; }
        button.btn-stop { background: #d9534f; border-color: #d43f3a; }
        button.btn-stop:hover { background: #c9302c; }
        input[type="text"] { flex: 1; height: 38px; border: 1px solid #ccc; border-radius: 4px; padding: 0 12px; font-size: 14px; outline: none; }
        input[type="text"]:focus { border-color: #365899; }

        .main-container { display: flex; flex: 1; padding: 8px; gap: 8px; background: #f0f2f5; flex-direction: column; overflow: hidden; }
        @media (min-width: 650px) { .main-container { flex-direction: row; } }
        
        /* Panel de video */
        .video-panel { flex: 1; display: flex; gap: 8px; }
        @media (min-width: 650px) { .video-panel { flex: 2; flex-direction: column; } }
        .video-box { flex: 1; background: #000; border-radius: 4px; border: 2px solid #365899; position: relative; overflow: hidden; min-height: 140px; }
        video { width: 100%; height: 100%; object-fit: cover; }
        #localVideo { transform: scaleX(-1); }
        .video-label { position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.7); color: #fff; padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
        
        /* Ocultar panel de video en Modo Texto */
        body.text-mode-active .video-panel { display: none !important; }

        /* Panel de chat */
        .chat-panel { flex: 1; display: flex; flex-direction: column; background: #fff; border: 1px solid #ccc; border-radius: 4px; }
        .chat-box { flex: 1; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; font-size: 14px; max-height: 100%; background: #fff; }
        .msg { word-break: break-word; line-height: 1.4; }
        .msg.you { color: #0000ff; font-weight: bold; }
        .msg.stranger { color: #ff0000; font-weight: bold; }
        .msg.system { color: #555; font-style: italic; font-size: 12px; }
        .msg.location { color: #2563eb; font-weight: bold; background: #eff6ff; padding: 4px 8px; border-radius: 4px; border-left: 3px solid #365899; }
        
        /* Barra de estado inferior */
        .status-bar { background: #e9ebee; color: #555; padding: 5px 15px; font-size: 12px; border-top: 1px solid #ccc; font-weight: bold; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/nsfwjs"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <header>
        <a href="#" class="logo">omegle<span>.com</span></a>
        <span class="tagline">Talk to strangers!</span>
    </header>
    
    <!-- Selector Video / Texto -->
    <div class="mode-selector">
        <span><strong>Modo de chat:</strong></span>
        <label><input type="radio" name="chatMode" value="video" checked onchange="toggleMode()"> 📹 Video + Texto</label>
        <label><input type="radio" name="chatMode" value="text" onchange="toggleMode()"> 💬 Solo Texto</label>
    </div>

    <div class="controls-panel">
        <button id="actionBtn" class="btn-action">Start</button>
        <input type="text" id="msgInput" placeholder="Escribe un mensaje..." disabled>
        <button id="sendBtn" class="btn-action" disabled>Send</button>
    </div>

    <div class="main-container">
        <!-- Panel de Video (Tu cámara a la izquierda, Stranger a la derecha) -->
        <div class="video-panel" id="videoPanel">
            <div class="video-box"><video id="localVideo" autoplay playsinline muted></video><div class="video-label" id="myLabel">You</div></div>
            <div class="video-box"><video id="remoteVideo" autoplay playsinline></video><div class="video-label" id="strangerLabel">Stranger</div></div>
        </div>
        <!-- Panel de Chat -->
        <div class="chat-panel">
            <div class="chat-box" id="chatBox"><div class="msg system">Presiona Start para buscar a un extraño.</div></div>
        </div>
    </div>
    <div class="status-bar" id="statusBar">Iniciando sistema...</div>

    <script>
        const socket = io();
        let localStream, peerConnection, currentRoom, nsfwModel;
        let myLocation = "Ubicación desconocida";
        let isSearching = false;
        let isVideoMode = true;

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

        function toggleMode() {
            const selected = document.querySelector('input[name="chatMode"]:checked').value;
            isVideoMode = (selected === 'video');
            if (isVideoMode) {
                document.body.classList.remove('text-mode-active');
                initCamera();
            } else {
                document.body.classList.add('text-mode-active');
                stopCamera();
                statusBar.innerText = "Modo Solo Texto activo. Listo para buscar.";
            }
        }

        async function init() {
            fetchLocation();
            if (isVideoMode) {
                await initCamera();
            }
        }

        async function initCamera() {
            try {
                if (!localStream) {
                    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    localVideo.srcObject = localStream;
                }
                statusBar.innerText = "Cámara lista. Cargando seguridad...";
                if (!nsfwModel) nsfwModel = await nsfwjs.load();
                statusBar.innerText = "Sistema listo.";
                setInterval(scanVideo, 3000);
            } catch (err) {
                if (isVideoMode && !localStream) statusBar.innerText = "Permite el acceso a la cámara o cambia al modo Solo Texto.";
            }
        }

        function stopCamera() {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                localStream = null;
                localVideo.srcObject = null;
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
            if (isVideoMode && nsfwModel && localVideo.readyState === 4) {
                const predictions = await nsfwModel.classify(localVideo);
                const unsafe = predictions.find(p => (p.className === 'Porn' || p.className === 'Hentai') && p.probability > 0.65);
                if (unsafe) { addSystemMsg("Seguridad: Contenido inapropiado detectado."); disconnect(); }
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
            socket.emit('find_partner', { location: myLocation, mode: isVideoMode ? 'video' : 'text' });
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

        socket.on('waiting', () => { statusBar.innerText = "Esperando conexión con un extraño..."; });

        socket.on('matched', ({ roomId, isInitiator, partnerLocation, mode }) => {
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
            
            if (mode === 'video' && isVideoMode) {
                setupWebRTC(isInitiator);
            }
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
            if (!localStream) return;
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

// Colas separadas para Video y Solo Texto
let waitingVideoUser = null;
let waitingTextUser = null;

io.on('connection', (socket) => {
    socket.on('find_partner', (data) => {
        socket.location = data.location;
        socket.mode = data.mode;

        let waitingQueue = (socket.mode === 'video') ? waitingVideoUser : waitingTextUser;

        if (waitingQueue && waitingQueue.id !== socket.id) {
            const partner = waitingQueue;
            if (socket.mode === 'video') waitingVideoUser = null;
            else waitingTextUser = null;

            const roomId = `room_${socket.id}_${partner.id}`;
            socket.join(roomId);
            partner.join(roomId);

            socket.emit('matched', { roomId, isInitiator: true, partnerLocation: partner.location, mode: socket.mode });
            partner.emit('matched', { roomId, isInitiator: false, partnerLocation: socket.location, mode: socket.mode });
        } else {
            if (socket.mode === 'video') waitingVideoUser = socket;
            else waitingTextUser = socket;
            socket.emit('waiting');
        }
    });

    socket.on('cancel_search', () => {
        if (waitingVideoUser && waitingVideoUser.id === socket.id) waitingVideoUser = null;
        if (waitingTextUser && waitingTextUser.id === socket.id) waitingTextUser = null;
    });

    socket.on('signal', (data) => { socket.to(data.roomId).emit('signal', data); });
    socket.on('chat_message', (data) => { socket.to(data.roomId).emit('chat_message', data.text); });
    socket.on('leave_room', (roomId) => {
        socket.to(roomId).emit('partner_left');
        socket.leave(roomId);
        if (waitingVideoUser && waitingVideoUser.id === socket.id) waitingVideoUser = null;
        if (waitingTextUser && waitingTextUser.id === socket.id) waitingTextUser = null;
    });
    socket.on('disconnect', () => {
        if (waitingVideoUser && waitingVideoUser.id === socket.id) waitingVideoUser = null;
        if (waitingTextUser && waitingTextUser.id === socket.id) waitingTextUser = null;
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => { console.log('Servidor listo'); });
