import { Socket } from 'net';
import { SocketReadQueue } from './readqueue.js';
export default async function tcpTransport(host, port, close = () => { }) {
    const socket = new Socket();
    await new Promise(resolve => socket.connect(Number(port), host, resolve));
    socket.on('error', (err) => { console.log('socket error:', err); });
    socket.on('close', close);
    const reader = new SocketReadQueue(socket);
    const read = reader.read.bind(reader);
    const write = socket.write.bind(socket);
    return { read, write };
}
