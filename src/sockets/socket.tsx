
import io from 'socket.io-client'
const authoNamepsaceFun = ()=>io('http://localhost:5000/signup')


export  {authoNamepsaceFun};