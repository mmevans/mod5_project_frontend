import io from 'socket.io-client';


const ENDPOINT = '10.185.4.168:3000'
const socket = io(ENDPOINT);


export default socket