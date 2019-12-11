import io from 'socket.io-client'
const SOCKET_ENDPOINT = 'http://localhost:9000'

const socket = io(SOCKET_ENDPOINT)

export default socket
