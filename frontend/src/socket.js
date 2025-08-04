import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4080';

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['polling', 'websocket'], // polling first, then upgrade
});

socket.on('connect', () =>
  console.log('✅ Socket connected, id=', socket.id)
);
socket.on('connect_error', (err) =>
  console.error('❌ Socket connection error:', err.message)
);

export default socket;
