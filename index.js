const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGIN || "*",
        methods: ["GET", "POST"]
    },
    // Limits unusually large socket messages.
    maxHttpBufferSize: 1e6
});

app.get('/google554feee44a838a44.html', (req, res) => {
    res.type('text/plain').send('google-site-verification: google554feee44a838a44.html');
});

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omegle Legacy — Talk to strangers! / ¡Habla con desconocidos!</title>
    <meta name="description" content="Omegle Legacy: chat aleatorio de texto y vídeo / random text and video chat. Proyecto independiente inspirado en el diseño clásico.">
    <meta name="keywords" content="omegle, video chat, chat de texto, hablar con desconocidos, omegle clone">
    <meta name="robots" content="index, follow">

    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        body { background: #fff; color: #000; display: flex; flex-direction: column; min-height: 100vh; overflow-x: hidden; overflow-y: auto; }
        body.chat-active { height: 100vh; height: 100dvh; min-height: 0; overflow: hidden; }

        /* Header clásico estilo Omegle */
        header { background: #fff; padding: 10px 15px; display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 1px solid #ccc; }
        .logo-container { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .logo { font-size: 38px; font-weight: bold; color: #ff6600; text-decoration: none; font-family: Arial, sans-serif; letter-spacing: -1px; }
        .tagline { font-size: 14px; color: #555; font-weight: bold; font-style: italic; }

        .landing-panel { width: min(920px, calc(100% - 28px)); margin: 20px auto 30px; padding: 20px 24px 18px; background: #f7f7f7; border: 1px solid #ddd; border-radius: 3px; color: #333; }
        .landing-copy { max-width: 760px; margin: 0 auto; text-align: center; font-size: 14px; line-height: 1.55; }
        .landing-copy p { margin: 0 0 10px; }
        .classic-warning { margin: 16px auto 0; max-width: 760px; padding: 8px 10px; border: 1px solid #e5c36a; background: #fff8df; color: #5d4b1f; text-align: center; font-size: 12px; line-height: 1.45; }
        .classic-warning strong { color: #40320f; }
        .landing-footer { margin-top: 12px; text-align: center; color: #777; font-size: 11px; }
        body.chat-active .landing-panel { display: none; }
        .main-container { display: none; }
        body.chat-active .main-container { display: flex; }
        body.chat-active .status-bar { display: block; }

        /* Menú clásico: "Start chatting:" con botones azules */
        .options-bar { background: #fff; border: 0; padding: 12px 15px 14px; display: flex; align-items: center; justify-content: center; gap: 9px; font-size: 14px; flex-wrap: wrap; }
        .mode-title { color: #333; font-size: 14px; }
        .mode-switch { display: inline-flex; align-items: center; gap: 7px; }
        .classic-mode-btn { min-width: 74px; height: 34px; padding: 0 17px; border: 1px solid #1874c8; border-radius: 4px; background: linear-gradient(to bottom, #4da3f5 0%, #0878d1 100%); color: #fff; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.25); }
        .classic-mode-btn:hover { background: linear-gradient(to bottom, #368fe5 0%, #0668b8 100%); }
        .classic-mode-btn:active { transform: translateY(1px); }
        .classic-mode-btn:focus-visible { outline: 2px solid #ff9900; outline-offset: 2px; }
        .mode-radio-hidden { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

        /* Panel principal */
        .main-container { display: none; flex: 1; min-height: 0; padding: 8px; gap: 8px; background: #fff; flex-direction: column; overflow: hidden; }
        @media (min-width: 650px) { .main-container { flex-direction: row; } }

        /* Panel de video clásico: las dos cámaras lado a lado */
        .video-panel { flex: 1.15; min-width: 0; min-height: 0; display: flex; flex-direction: row; gap: 6px; }
        .video-box { flex: 1; min-width: 0; min-height: 0; background: #222; border-radius: 2px; border: 1px solid #999; position: relative; overflow: hidden; }
        video { width: 100%; height: 100%; object-fit: cover; }
        #localVideo { transform: scaleX(-1); }
        .video-label { position: absolute; bottom: 5px; left: 5px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; border-radius: 2px; font-size: 11px; font-weight: bold; }

        body.text-mode-active .video-panel { display: none !important; }

        /* Panel de chat */
        .chat-panel { flex: 1; min-height: 0; min-width: 0; display: flex; flex-direction: column; background: #fff; border: 1px solid #999; border-radius: 2px; }
        .chat-box { flex: 1; min-height: 0; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; font-size: 13px; }

        /* Estilos de mensajes */
        .msg { word-break: break-word; overflow-wrap: anywhere; line-height: 1.3; }
        .msg.you { color: #0000ff; font-weight: bold; }
        .msg.stranger { color: #ff0000; font-weight: bold; }
        .msg.system { color: #555; font-style: italic; font-size: 12px; }
        .msg.location { color: #008000; font-weight: bold; background: #f0fff0; padding: 3px 6px; border-radius: 2px; border-left: 3px solid #008000; }

        /* Panel inferior de controles */
        .controls-panel { min-height: 50px; background: #f8f8f8; border-top: 1px solid #ccc; display: flex; padding: 6px; gap: 6px; align-items: center; }
        button.btn-action { background: linear-gradient(to bottom, #ffffff 0%, #e6e6e6 100%); color: #333; border: 1px solid #adadad; font-size: 14px; font-weight: bold; padding: 0 16px; height: 38px; border-radius: 3px; cursor: pointer; min-width: 80px; }
        button.btn-action:hover { background: #ebebeb; border-color: #adadad; }
        button.btn-stop { background: linear-gradient(to bottom, #ff4d4d 0%, #cc0000 100%); color: #fff; border-color: #b30000; text-shadow: 0 -1px 0 rgba(0,0,0,0.25); }
        button.btn-stop:hover { background: #cc0000; }

        .input-wrapper { flex: 1; min-width: 0; display: flex; position: relative; }
        input[type="text"]#msgInput { width: 100%; min-width: 0; flex: 1; height: 38px; border: 1px solid #ccc; border-radius: 3px; padding: 0 10px; font-size: 13px; outline: none; }
        input[type="text"]#msgInput:focus { border-color: #66afe9; box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6); }

        button.btn-send { background: linear-gradient(to bottom, #ffffff 0%, #e6e6e6 100%); color: #333; border: 1px solid #adadad; font-size: 13px; font-weight: bold; padding: 0 15px; height: 38px; border-radius: 3px; cursor: pointer; }
        button.btn-send:disabled, button.btn-action:disabled { opacity: 0.6; cursor: not-allowed; }

        .status-bar { display: none; background: #e9e9e9; color: #333; padding: 4px 15px; font-size: 11px; border-top: 1px solid #ccc; font-weight: normal; }
        @media (max-width: 649px) {
            header { padding: 8px 11px; }
            .logo { font-size: 32px; }
            .tagline { font-size: 12px; }
            .landing-panel { width: calc(100% - 18px); margin: 10px auto 18px; padding: 15px 12px; }
            .landing-copy { font-size: 13px; }
            .classic-warning { font-size: 11px; }
            .options-bar { gap: 8px; padding: 12px 6px 6px; }
            .mode-switch { gap: 5px; }
            .classic-mode-btn { min-width: 70px; height: 34px; padding: 0 14px; }
            body.chat-active .main-container { flex-direction: column; padding: 5px; gap: 5px; }
            .video-panel { flex: none; display: flex; flex-direction: row; height: 31vh; min-height: 150px; max-height: 260px; }
            body.text-mode-active .video-panel { display: none !important; }
            .chat-panel { flex: 1; }
            .controls-panel { gap: 4px; padding: 5px; }
            button.btn-action { min-width: 62px; padding: 0 9px; }
            button.btn-send { padding: 0 10px; }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/nsfwjs"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <a href="#" class="logo">omegle</a>
            <span class="tagline">Talk to strangers! / ¡Habla con desconocidos!</span>
        </div>
    </header>

    <main class="landing-panel" id="landingPanel">
        <div class="landing-copy">
            <p><strong>Omegle Legacy</strong> conecta / connects you with random strangers for one-on-one conversations.</p>
            <p>Elige chat de texto o vídeo para conocer a alguien / Choose text or video chat to meet someone new.</p>
        </div>
        <div class="classic-warning">
            <strong>Ten cuidado al hablar con desconocidos / Be careful when chatting with strangers.</strong>
            No compartas tu nombre completo, dirección, teléfono, contraseñas, escuela u otros datos personales. / Do not share personal information. Termina la conversación si alguien te incomoda / End the conversation if someone makes you uncomfortable.
        </div>
        <div class="options-bar">
        <span class="mode-title">Comenzar / Start chatting:</span>
        <div class="mode-switch" role="group" aria-label="Start chatting">
            <button type="button" class="classic-mode-btn" data-mode="text">Texto / Text</button>
            <button type="button" class="classic-mode-btn" data-mode="video">Vídeo / Video</button>
        </div>
        <input type="radio" name="chatMode" value="text" class="mode-radio-hidden" aria-hidden="true" tabindex="-1" checked>
        <input type="radio" name="chatMode" value="video" class="mode-radio-hidden" aria-hidden="true" tabindex="-1">
    </div>
        <div class="landing-footer">Omegle Legacy es un proyecto independiente y no es el servicio original de Omegle. / Omegle Legacy is independent and is not the original service.</div>
    </main>

    <div class="main-container">
        <div class="video-panel" id="videoPanel">
            <div class="video-box"><video id="localVideo" autoplay playsinline muted></video><div class="video-label" id="myLabel">You</div></div>
            <div class="video-box"><video id="remoteVideo" autoplay playsinline></video><div class="video-label" id="strangerLabel">Stranger</div></div>
        </div>
        <div class="chat-panel">
            <div class="chat-box" id="chatBox" aria-live="polite">
                <div class="msg system">Omegle Legacy: ¡Habla con desconocidos! / Talk to strangers!</div>
                <div class="msg system">You are not connected. Choose Text or Video to start chatting.</div>
            </div>
            <div class="controls-panel">
                <button id="actionBtn" class="btn-action">Start</button>
                <div class="input-wrapper">
                    <input type="text" id="msgInput" placeholder="Type your message here..." maxlength="2000" disabled>
                </div>
                <button id="sendBtn" class="btn-send" disabled>Send</button>
            </div>
        </div>
    </div>
    <div class="status-bar" id="statusBar">Listo.</div>

    <script>
        const socket = io();
        let localStream = null;
        let peerConnection = null;
        let currentRoom = null;
        let nsfwModel = null;
        let nsfwLoadPromise = null;
        let scanTimer = null;
        let scanInProgress = false;
        let myLocation = "Unknown";
        let isSearching = false;
        let isVideoMode = false;
        let isDisconnecting = false;
        let pendingIceCandidates = [];
        let connectionGeneration = 0;

        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        const chatBox = document.getElementById('chatBox');
        const msgInput = document.getElementById('msgInput');
        const actionBtn = document.getElementById('actionBtn');
        const sendBtn = document.getElementById('sendBtn');
        const statusBar = document.getElementById('statusBar');

        // STUN helps discover network routes. For restrictive networks, configure a TURN
        // service you control and add its credentials here (do not publish private credentials).
        const rtcConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' }
                // TURN example:
                // { urls: 'turn:YOUR_TURN_HOST:3478', username: 'YOUR_USERNAME', credential: 'YOUR_PASSWORD' }
            ]
        };

        document.querySelectorAll('.classic-mode-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                const radio = document.querySelector('input[name="chatMode"][value="' + mode + '"]');
                if (!radio) return;
                const sameMode = radio.checked;
                radio.checked = true;
                if (!sameMode) radio.dispatchEvent(new Event('change', { bubbles: true }));
                document.body.classList.add('chat-active');
                actionBtn.click();
            });
        });

        actionBtn.addEventListener('click', handleActionBtn);
        sendBtn.addEventListener('click', sendMessage);
        document.querySelectorAll('input[name="chatMode"]').forEach((radio) => {
            radio.addEventListener('change', toggleMode);
        });

        function toggleMode() {
            const selected = document.querySelector('input[name="chatMode"]:checked').value;
            const nextIsVideoMode = selected === 'video';
            if (nextIsVideoMode === isVideoMode) return;

            isVideoMode = nextIsVideoMode;
            if (!isVideoMode) {
                stopCamera();
                document.body.classList.add('text-mode-active');
                statusBar.innerText = 'Modo Texto activo. Cámara apagada.';
                // A video peer connection cannot be reused as a text connection.
                if (currentRoom || isSearching) disconnect('Has cambiado el modo de chat.');
            } else {
                document.body.classList.remove('text-mode-active');
                initCamera();
            }
        }

        async function init() {
            document.body.classList.add('text-mode-active');
            statusBar.innerText = 'Ready.';
        }

        async function initCamera() {
            if (!isVideoMode || localStream) return;
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error('getUserMedia no está disponible; se requiere HTTPS o localhost.');
                }
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                // If the user switched modes while permission was pending, stop the new tracks.
                if (!isVideoMode) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
                localStream = stream;
                localVideo.srcObject = localStream;
                statusBar.innerText = 'Cámara lista. Cargando seguridad...';

                if (!nsfwModel) {
                    if (!nsfwLoadPromise) {
                        nsfwLoadPromise = nsfwjs.load().catch((err) => {
                            nsfwLoadPromise = null;
                            throw err;
                        });
                    }
                    nsfwModel = await nsfwLoadPromise;
                }
                statusBar.innerText = 'Sistema listo.';
                startVideoScanner();
            } catch (err) {
                console.error('Error al iniciar cámara o detector:', err);
                if (isVideoMode && !localStream) {
                    statusBar.innerText = 'No se pudo iniciar cámara/detector. Permite el acceso o cambia al modo Texto.';
                }
            }
        }

        function startVideoScanner() {
            // Only one timer can exist, even after repeated mode changes.
            if (scanTimer) return;
            scanTimer = window.setInterval(scanVideo, 3000);
        }

        function stopVideoScanner() {
            if (scanTimer) {
                window.clearInterval(scanTimer);
                scanTimer = null;
            }
            scanInProgress = false;
        }

        function stopCamera() {
            stopVideoScanner();
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                localStream = null;
            }
            localVideo.srcObject = null;
        }

        async function fetchLocation() {
            try {
                const controller = new AbortController();
                const timeoutId = window.setTimeout(() => controller.abort(), 5000);
                const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
                window.clearTimeout(timeoutId);
                if (!res.ok) throw new Error('No se pudo consultar la ubicación.');
                const data = await res.json();
                if (data.city && data.country_name) {
                    myLocation = data.city + ', ' + data.country_name;
                    document.getElementById('myLabel').innerText = 'You (' + myLocation + ')';
                }
            } catch (e) {
                // Location is optional; chat still works if the lookup fails.
            }
        }

        async function scanVideo() {
            if (scanInProgress || !isVideoMode || !nsfwModel || !localStream ||
                !localVideo || localVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

            scanInProgress = true;
            try {
                const predictions = await nsfwModel.classify(localVideo);
                const unsafe = predictions.find(p =>
                    (p.className === 'Porn' || p.className === 'Hentai') && p.probability > 0.65
                );
                if (unsafe && isVideoMode) {
                    addSystemMsg('Seguridad: el detector local marcó contenido que podría ser inapropiado. Se desconectará el chat.');
                    disconnect('Conexión cerrada por el detector de seguridad.');
                }
            } catch (err) {
                console.warn('Falló el análisis de seguridad:', err);
            } finally {
                scanInProgress = false;
            }
        }

        function handleActionBtn() {
            if (currentRoom || isSearching) disconnect();
            else startSearch();
        }

        function startSearch() {
            if (!socket.connected) {
                addSystemMsg('No hay conexión con el servidor. Intenta de nuevo en unos segundos.');
                return;
            }
            if (isSearching || currentRoom) return;

            isSearching = true;
            statusBar.innerText = 'Buscando un extraño...';
            actionBtn.innerText = 'Stop';
            actionBtn.className = 'btn-action btn-stop';

            const rawInterests = [];

            socket.emit('find_partner', {
                location: myLocation,
                mode: isVideoMode ? 'video' : 'text',
                interests: rawInterests
            });
        }

        function sendMessage() {
            const text = msgInput.value.trim();
            if (!text) return;
            if (currentRoom && socket.connected) {
                socket.emit('chat_message', { roomId: currentRoom, text });
                addMsg('You: ', text, 'you');
            } else {
                addSystemMsg('Debes conectar con alguien para enviar mensajes.');
            }
            msgInput.value = '';
        }

        function disconnect(message) {
            if (isDisconnecting) return;
            isDisconnecting = true;

            if (currentRoom) socket.emit('leave_room', currentRoom);
            if (isSearching) socket.emit('cancel_search');

            closeConnection();
            isSearching = false;
            actionBtn.innerText = 'Start';
            actionBtn.className = 'btn-action';
            statusBar.innerText = 'Desconectado.';
            if (message) addSystemMsg(message);
            else addSystemMsg('Te has desconectado.');

            window.setTimeout(() => { isDisconnecting = false; }, 0);
        }

        function closeConnection() {
            connectionGeneration++;
            pendingIceCandidates = [];
            if (peerConnection) {
                peerConnection.ontrack = null;
                peerConnection.onicecandidate = null;
                peerConnection.onconnectionstatechange = null;
                peerConnection.oniceconnectionstatechange = null;
                try { peerConnection.close(); } catch (e) {}
                peerConnection = null;
            }
            remoteVideo.srcObject = null;
            msgInput.disabled = true;
            sendBtn.disabled = true;
            currentRoom = null;
            document.getElementById('strangerLabel').innerText = 'Stranger';
        }

        socket.on('connect', () => {
            statusBar.innerText = 'Connected to server.';
        });

        socket.on('disconnect', () => {
            closeConnection();
            isSearching = false;
            actionBtn.innerText = 'Start';
            actionBtn.className = 'btn-action';
            statusBar.innerText = 'Se perdió la conexión con el servidor. Recarga o vuelve a intentarlo.';
        });

        socket.on('connect_error', (err) => {
            console.warn('Socket.IO connection error:', err.message);
            statusBar.innerText = 'No se pudo conectar al servidor.';
        });

        socket.on('waiting', () => {
            if (isSearching) statusBar.innerText = 'Buscando a alguien con quien hablar...';
        });

        socket.on('matched', async ({ roomId, isInitiator, partnerLocation, mode, matchedInterest }) => {
            if (!isSearching && !roomId) return;
            currentRoom = roomId;
            isSearching = false;
            pendingIceCandidates = [];
            statusBar.innerText = '¡Conectado!';
            actionBtn.innerText = 'Stop';
            actionBtn.className = 'btn-action btn-stop';
            msgInput.disabled = false;
            sendBtn.disabled = false;

            if (matchedInterest) addSystemMsg('¡Ambos se interesan por ' + safeText(matchedInterest) + '!');
            else addSystemMsg('¡Estás hablando con un extraño! ¡Di hola!');


            if (mode === 'video' && isVideoMode) {
                if (!localStream) await initCamera();
                if (currentRoom === roomId && localStream) setupWebRTC(isInitiator, roomId);
                else if (!localStream) statusBar.innerText = 'La cámara no está disponible. Desconéctate y cambia al modo Texto.';
            }
        });

        socket.on('partner_left', () => {
            if (!currentRoom) return;
            addSystemMsg('El extraño se ha desconectado.');
            closeConnection();
            isSearching = false;
            actionBtn.innerText = 'Start';
            actionBtn.className = 'btn-action';
            statusBar.innerText = 'La otra persona se desconectó.';
        });

        socket.on('chat_message', (text) => {
            if (typeof text === 'string') addMsg('Stranger: ', text.slice(0, 2000), 'stranger');
        });

        function setupWebRTC(isInitiator, roomId) {
            if (!localStream || currentRoom !== roomId) return;
            if (peerConnection) {
                try { peerConnection.close(); } catch (e) {}
            }

            const generation = ++connectionGeneration;
            pendingIceCandidates = [];
            peerConnection = new RTCPeerConnection(rtcConfig);
            const pc = peerConnection;

            localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

            pc.ontrack = (event) => {
                if (generation !== connectionGeneration) return;
                if (event.streams && event.streams[0]) {
                    remoteVideo.srcObject = event.streams[0];
                    remoteVideo.play().catch(() => {});
                }
            };

            pc.onicecandidate = (event) => {
                if (event.candidate && currentRoom === roomId && generation === connectionGeneration) {
                    socket.emit('signal', { roomId, candidate: event.candidate });
                }
            };

            pc.onconnectionstatechange = () => {
                if (generation !== connectionGeneration) return;
                if (pc.connectionState === 'connected') statusBar.innerText = '¡Video conectado!';
                if (pc.connectionState === 'failed') {
                    statusBar.innerText = 'Falló la conexión de video. Esta red podría necesitar TURN.';
                    addSystemMsg('No se pudo establecer el video. Puedes seguir usando el chat de texto o intentar otra vez.');
                }
            };

            pc.oniceconnectionstatechange = () => {
                if (generation !== connectionGeneration) return;
                if (pc.iceConnectionState === 'disconnected') {
                    statusBar.innerText = 'Reconectando video...';
                }
            };

            // Only the designated initiator creates the offer. The answerer waits for it.
            if (isInitiator) {
                createAndSendOffer(pc, roomId, generation).catch(err => {
                    console.error('No se pudo crear la oferta WebRTC:', err);
                    if (generation === connectionGeneration) statusBar.innerText = 'No se pudo iniciar el video.';
                });
            }
        }

        async function createAndSendOffer(pc, roomId, generation) {
            const offer = await pc.createOffer();
            if (generation !== connectionGeneration || currentRoom !== roomId) return;
            await pc.setLocalDescription(offer);
            if (generation !== connectionGeneration || currentRoom !== roomId) return;
            socket.emit('signal', { roomId, sdp: pc.localDescription });
        }

        socket.on('signal', async (data) => {
            if (!data || !currentRoom || data.roomId !== currentRoom || !peerConnection) return;
            const pc = peerConnection;
            const generation = connectionGeneration;

            try {
                if (data.sdp) {
                    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    if (generation !== connectionGeneration || pc !== peerConnection) return;

                    // Apply candidates that arrived before the remote description.
                    const queued = pendingIceCandidates;
                    pendingIceCandidates = [];
                    for (const candidate of queued) {
                        try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); }
                        catch (err) { console.warn('Candidato ICE pendiente rechazado:', err); }
                    }

                    if (data.sdp.type === 'offer') {
                        const answer = await pc.createAnswer();
                        if (generation !== connectionGeneration || pc !== peerConnection) return;
                        await pc.setLocalDescription(answer);
                        if (generation !== connectionGeneration || pc !== peerConnection) return;
                        socket.emit('signal', { roomId: currentRoom, sdp: pc.localDescription });
                    }
                } else if (data.candidate) {
                    if (!pc.remoteDescription) {
                        if (pendingIceCandidates.length < 100) pendingIceCandidates.push(data.candidate);
                    } else {
                        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                    }
                }
            } catch (err) {
                console.warn('Error procesando señal WebRTC:', err);
            }
        });

        function safeText(value) {
            return String(value).replace(/[<>]/g, '');
        }

        function addMsg(prefix, text, type) {
            const div = document.createElement('div');
            div.className = 'msg ' + type;
            div.innerText = prefix + text;
            chatBox.appendChild(div);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function addSystemMsg(text) { addMsg('', text, 'system'); }
        function addLocationMsg(text) { addMsg('', text, 'location'); }

        msgInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') sendMessage();
        });

        window.addEventListener('beforeunload', () => {
            stopCamera();
            if (peerConnection) peerConnection.close();
        });

        window.addEventListener('load', init);
    </script>
</body>
</html>
    `);
});

let waitingQueue = [];
const MAX_INTERESTS = 10;
const MAX_INTEREST_LENGTH = 40;
const MAX_LOCATION_LENGTH = 100;
const MESSAGE_COOLDOWN_MS = 350;
const lastMessageAt = new Map();

function removeFromQueue(socketId) {
    waitingQueue = waitingQueue.filter((entry) => entry.id !== socketId);
}

function cleanInterests(interests) {
    if (!Array.isArray(interests)) return [];
    return [...new Set(interests
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim().toLowerCase().slice(0, MAX_INTEREST_LENGTH))
        .filter(Boolean))].slice(0, MAX_INTERESTS);
}

function leaveCurrentRoom(socket) {
    const roomId = socket.currentRoom;
    if (!roomId) return;
    socket.to(roomId).emit('partner_left');
    socket.leave(roomId);
    socket.currentRoom = null;
}

io.on('connection', (socket) => {
    socket.on('find_partner', (data = {}) => {
        // A user cannot queue or join a second room while already connected.
        if (socket.currentRoom) return;
        removeFromQueue(socket.id);

        socket.location = typeof data.location === 'string'
            ? data.location.slice(0, MAX_LOCATION_LENGTH)
            : 'Desconocida';
        socket.mode = data.mode === 'text' ? 'text' : 'video';
        socket.interests = cleanInterests(data.interests);

        // Discard stale/disconnected queue entries before matching.
        waitingQueue = waitingQueue.filter((entry) => entry.connected && entry.connected());

        let partnerIndex = -1;
        let matchedInterest = null;

        if (socket.interests.length > 0) {
            partnerIndex = waitingQueue.findIndex((partner) => {
                if (!partner.connected || !partner.connected() ||
                    partner.mode !== socket.mode || partner.id === socket.id) return false;

                const common = partner.interests.find((interest) => socket.interests.includes(interest));
                if (common) {
                    matchedInterest = common;
                    return true;
                }
                return false;
            });
        }

        // If there is no shared interest, pair with the oldest compatible user.
        if (partnerIndex === -1) {
            partnerIndex = waitingQueue.findIndex((partner) =>
                partner.connected && partner.connected() &&
                partner.mode === socket.mode && partner.id !== socket.id
            );
        }

        if (partnerIndex !== -1) {
            const partner = waitingQueue.splice(partnerIndex, 1)[0];
            const roomId = `room_${socket.id}_${partner.id}`;

            socket.join(roomId);
            partner.join(roomId);
            socket.currentRoom = roomId;
            partner.currentRoom = roomId;

            socket.emit('matched', {
                roomId, isInitiator: true,
                partnerLocation: partner.location,
                mode: socket.mode,
                matchedInterest
            });
            partner.emit('matched', {
                roomId, isInitiator: false,
                partnerLocation: socket.location,
                mode: socket.mode,
                matchedInterest
            });
        } else {
            waitingQueue.push(socket);
            socket.emit('waiting');
        }
    });

    socket.on('cancel_search', () => {
        removeFromQueue(socket.id);
    });

    socket.on('signal', (data = {}) => {
        // Only relay WebRTC signals to the other member of the sender's current room.
        if (!socket.currentRoom || data.roomId !== socket.currentRoom) return;
        if (!data.sdp && !data.candidate) return;
        socket.to(socket.currentRoom).emit('signal', {
            roomId: socket.currentRoom,
            ...(data.sdp ? { sdp: data.sdp } : {}),
            ...(data.candidate ? { candidate: data.candidate } : {})
        });
    });

    socket.on('chat_message', (data = {}) => {
        if (!socket.currentRoom || data.roomId !== socket.currentRoom) return;
        if (typeof data.text !== 'string') return;

        const now = Date.now();
        const previous = lastMessageAt.get(socket.id) || 0;
        if (now - previous < MESSAGE_COOLDOWN_MS) return;
        lastMessageAt.set(socket.id, now);

        const text = data.text.trim().slice(0, 2000);
        if (!text) return;
        socket.to(socket.currentRoom).emit('chat_message', text);
    });

    socket.on('leave_room', () => {
        leaveCurrentRoom(socket);
        removeFromQueue(socket.id);
    });

    socket.on('disconnect', () => {
        leaveCurrentRoom(socket);
        removeFromQueue(socket.id);
        lastMessageAt.delete(socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor listo en el puerto ${PORT}`);
});