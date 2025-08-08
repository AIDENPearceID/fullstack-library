import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Chat(){
  const [messages,setMessages] = useState([]);
  const [text,setText] = useState('');

  useEffect(()=>{
    socket = io(process.env.NEXT_PUBLIC_API || 'http://localhost:4000');
    socket.on('connect', ()=> console.log('connected'));
    socket.on('message', (m) => setMessages(prev => [...prev, m]));
    return ()=> socket.disconnect();
  },[]);

  function send(){
    socket.emit('message', { room: 'global', user: 'guest', text });
    setText('');
  }

  return (
    <div style={{maxWidth:800, margin:'20px auto', padding:20}}>
      <h2>الشات</h2>
      <div style={{minHeight:200, background:'#111', padding:10, borderRadius:8}}>
        {messages.map((m,i)=>(<div key={i}><strong>{m.user}</strong>: {m.text}</div>))}
      </div>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={send}>أرسل</button>
    </div>
  );
}
