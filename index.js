const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/google554feee44a838a44.html', (req, res) => {
    res.send('google-site-verification: google554feee44a838a44.html');
});

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omegle: Talk to strangers!</title>
    <meta name="description" content="Chat de video y texto aleatorio en vivo. Conoce gente nueva de forma anónima y segura.">
    <meta name="keywords" content="omegle, video chat, chat de texto, hablar con desconocidos, omegle clone">
    <meta name="robots" content="index, follow">

    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        body { background: #fff; color: #000; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        
        /* Header clásico estilo Omegle */
        header { background: #fff; padding: 10px 15px; display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 1px solid #ccc; }
        .logo-container { display: flex; align-items: baseline; gap: 8px; }
        .logo { font-size: 38px; font-weight: bold; color: #0080ff; text-decoration: none; font-family: 'Arial Black', Gadget, sans-serif; letter-spacing: -1px; }
        .logo span { color: #ff6600; }
        .tagline { font-size: 14px; color: #555; font-weight: bold; font-style: italic; }

        /* Barra de opciones e intereses */
        .options-bar { background: #f4f4f4; border-bottom: 1px solid #ddd; padding: 6px 15px; display: flex; align-items: center; gap: 15px; font-size: 13px; }
        .options-bar label { font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; gap: 4px; }
        .interest-input { height: 26px; border: 1px solid #aaa; border-radius: 2px; padding: 0 6px; font-size: 12px; outline: none; width: 250px; }

        /* Panel principal */
        .main-container { display: flex; flex: 1; padding: 8px; gap: 8px; background: #fff; flex-direction: column; overflow: hidden; }
        @media (min-width: 650px) { .main-container { flex-direction: row; } }
        
        /* Panel de video estilo clásico */
        .video-panel { flex: 1; display: flex; gap: 8px; }
        @media (min-width: 650px) { .video-panel { flex: 2; flex-direction: column; } }
        .video-box { flex: 1; background: #222; border-radius: 3px; border: 1px solid #999; position: relative; overflow: hidden; min-height: 140px; }
        video { width: 100%; height: 100%; object-fit: cover; }
        #localVideo { transform: scaleX(-1); }
        .video-label { position: absolute; bottom: 5px; left: 5px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; border-radius: 2px; font-size: 11px; font-weight: bold; }
        
        body.text-mode-active .video-panel { display: none !important; }

        /* Panel de chat */
        .chat-panel { flex: 1; display: flex; flex-direction: column; background: #fff; border: 1px solid #999; border-radius: 3px; }
        .chat-box { flex: 1; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; font-size: 13px; background: #fff; }
        
        /* Estilos exactos de mensajes Omegle */
        .msg { word-break: break-word; line-height: 1.3; }
        .msg.you { color: #0000ff; font-weight: bold; }
        .msg.stranger { color: #ff0000; font-weight: bold; }
        .msg.system { color: #555; font-style: italic; font-size: 12px; }
        .msg.location { color: #008000; font-weight: bold; background: #f0fff0; padding: 3px 6px; border-radius: 2px; border-left: 3px solid #008000; }

        /* Panel inferior de controles */
        .controls-panel { height: 50px; background: #f8f8f8; border-top: 1px solid #ccc; display: flex; padding: 6px; gap: 6px; align-items: center; }
        button.btn-action { background: linear-gradient(to bottom, #ffffff 0%, #e6e6e6 100%); color: #333; border: 1px solid #adadad; font-size: 14px; font-weight: bold; padding: 0 16px; height: 38px; border-radius: 3px; cursor: pointer; min-width: 80px; }
        button.btn-action:hover { background: #ebebeb; border-color: #adadad; }
        button.btn-stop { background: linear-gradient(to bottom, #ff4d4d 0%, #cc0000 100%); color: #fff; border-color: #b30000; text-shadow: 0 -1px 0 rgba(0,0,0,0.25); }
        button.btn-stop:hover { background: #cc0000; }
        
        .input-wrapper { flex: 1; display: flex; position: relative; }
        input[type="text"]#msgInput { flex: 1; height: 38px; border: 1px solid #ccc; border-radius: 3px; padding: 0 10px; font-size: 13px; outline: none; }
        input[type="text"]#msgInput:focus { border-color: #66afe9; box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6); }
        
        button.btn-send { background: linear-gradient(to bottom, #ffffff 0%, #e6e6e6 100%); color: #333; border: 1px solid #adadad; font-size: 13px; font-weight: bold; padding: 0 15px; height: 38px; border-radius: 3px; cursor: pointer; }
        button.btn-send:disabled, button.btn-action:disabled { opacity: 0.6; cursor: not-allowed; }

        .status-bar { background: #e9e9e9; color: #333; padding: 4px 15px; font-size: 11px; border-top: 1px solid #ccc; font-weight: normal; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/nsfwjs"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <a href="#" class="logo">omegle<span>.com</span></a>
            <span class="tagline">Talk to strangers!</span>
        </div>
    </header>
    
    <div class="options-bar">
        <span><strong>Modo:</strong></span>
        <label><input type="radio" name="chatMode" value="video" checked onchange="toggleMode()"> Video</label>
        <label><input type="radio" name="chatMode" value="text" onchange="toggleMode()"> Texto</label>
        <span style="margin-left: 10px;"><strong>Intereses:</strong></span>
        <input type="text" id="interestsInput" class="interest-input" placeholder="Agrega tus intereses (ej: juegos, música)">
    </div>

    <div class="main-container">
        <div class="video-panel" id="videoPanel">
            <div class="video-box"><video id="localVideo" autoplay playsinline muted></video><div class="video-label" id="myLabel">You</div></div>
            <div class="video-box"><video id="remoteVideo" autoplay playsinline></video><div class="video-label" id="strangerLabel">Stranger</div></div>
        </div>
        <div class="chat-panel">
            <div class="chat-box" id="chatBox">
                <div class="msg system">Omegle: Habla con extraños.</div>
                <div class="msg system">Presiona "Start" para encontrar a alguien con quien hablar.</div>
            </div>
            <div class="controls-panel">
                <button id="actionBtn" class="btn-action">Start</button>
                <div class="input-wrapper">
                    <input type="text" id="msgInput" placeholder="Escribe un mensaje..." disabled>
                </div>
                <button id="sendBtn" class="btn-send" disabled>Send</button>
            </div>
        </div>
    </div>
    <div class="status-bar" id="statusBar">Listo.</div>

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
        const interestsInput = document.getElementById('interestsInput');

        const rtcConfig = { 
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' }
            ] 
        };

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
                statusBar.innerText = "Modo Texto activo. Cámara apagada.";
            }
        }

        async function init() {
            fetchLocation();
            if (isVideoMode) {
                await initCamera();
            } else {
                document.body.classList.add('text-mode-active');
                statusBar.innerText = "Modo Solo Texto activo.";
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
                if (isVideoMode && !localStream) statusBar.innerText = "Permite el acceso a la cámara o cambia al modo Texto.";
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
            
            const rawInterests = interestsInput.value.split(',').map(i => i.trim().toLowerCase()).filter(i => i.length > 0);
            socket.emit('find_partner', { 
                location: myLocation, 
                mode: isVideoMode ? 'video' : 'text',
                interests: rawInterests 
            });
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
            addSystemMsg("Te has desconectado.");
        }

        function closeConnection() {
            if (peerConnection) { 
                peerConnection.ontrack = null;
                peerConnection.onicecandidate = null;
                peerConnection.close(); 
                peerConnection = null; 
            }
            remoteVideo.srcObject = null;
            msgInput.disabled = true;
            sendBtn.disabled = true;
            currentRoom = null;
            document.getElementById('strangerLabel').innerText = "Stranger";
        }

        socket.on('waiting', () => { statusBar.innerText = "Buscando a alguien con quien hablar..."; });

        socket.on('matched', ({ roomId, isInitiator, partnerLocation, mode, matchedInterest }) => {
            currentRoom = roomId;
            isSearching = false;
            statusBar.innerText = "¡Conectado!";
            actionBtn.innerText = "Stop";
            actionBtn.className = "btn-action btn-stop";
            msgInput.disabled = false;
            sendBtn.disabled = false;
            
            if (matchedInterest) {
                addSystemMsg("¡Ambos se interesan por " + matchedInterest + "!");
            } else {
                addSystemMsg("¡Estás hablando con un extraño! ¡Di hola!");
            }

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
            
            peerConnection.ontrack = (e) => { 
                if (e.streams && e.streams[0]) {
                    remoteVideo.srcObject = e.streams[0]; 
                }
            };

            peerConnection.onicecandidate = (e) => {
                if (e.candidate) socket.emit('signal', { roomId: currentRoom, candidate: e.candidate });
            };

            if (isInitiator) {
                peerConnection.onnegotiationneeded = async () => {
                    try {
                        const offer = await peerConnection.createOffer();
                        await peerConnection.setLocalDescription(offer);
                        socket.emit('signal', { roomId: currentRoom, sdp: peerConnection.localDescription });
                    } catch(err) {}
                };
            }
        }

        socket.on('signal', async (data) => {
            if (!peerConnection) return;
            try {
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
            } catch(e) {}
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

let waitingQueue = [];

function removeFromQueue(socketId) {
    waitingQueue = waitingQueue.filter(s => s.id !== socketId);
}

io.on('connection', (socket) => {
    socket.on('find_partner', (data) => {
        socket.location = data.location || "Desconocida";
        socket.mode = data.mode || "video";
        socket.interests = Array.isArray(data.interests) ? data.interests : [];

        removeFromQueue(socket.id);

        let partnerIndex = -1;
        let matchedInterest = null;

        if (socket.interests.length > 0) {
            partnerIndex = waitingQueue.findIndex(p => {
                if (p.mode !== socket.mode || p.id === socket.id) return false;
                const common = p.interests.find(i => socket.interests.includes(i));
                if (common) {
                    matchedInterest = common;
                    return true;
                }
                return false;
            });
        }

        if (partnerIndex === -1) {
            partnerIndex = waitingQueue.findIndex(p => p.mode === socket.mode && p.id !== socket.id);
        }

        if (partnerIndex !== -1) {
            const partner = waitingQueue.splice(partnerIndex, 1)[0];
            const roomId = `room_${socket.id}_${partner.id}`;

            socket.join(roomId);
            partner.join(roomId);

            socket.currentRoom = roomId;
            partner.currentRoom = roomId;

            socket.emit('matched', { roomId, isInitiator: true, partnerLocation: partner.location, mode: socket.mode, matchedInterest });
            partner.emit('matched', { roomId, isInitiator: false, partnerLocation: socket.location, mode: socket.mode, matchedInterest });
        } else {
            waitingQueue.push(socket);
            socket.emit('waiting');
        }
    });

    socket.on('cancel_search', () => {
        removeFromQueue(socket.id);
    });

    socket.on('signal', (data) => { 
        socket.to(data.roomId).emit('signal', data); 
    });

    socket.on('chat_message', (data) => { 
        socket.to(data.roomId).emit('chat_message', data.text); 
    });

    socket.on('leave_room', (roomId) => {
        if (socket.currentRoom) {
            socket.to(socket.currentRoom).emit('partner_left');
            socket.leave(socket.currentRoom);
            socket.currentRoom = null;
        }
        removeFromQueue(socket.id);
    });

    socket.on('disconnect', () => {
        if (socket.currentRoom) {
            socket.to(socket.currentRoom).emit('partner_left');
            socket.currentRoom = null;
        }
        removeFromQueue(socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => { console.log('Servidor listo'); });
