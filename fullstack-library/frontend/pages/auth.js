import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useRouter } from 'next/router';

export default function Auth(){
  const [mode,setMode] = useState('login');
  const [form,setForm] = useState({});
  const r = useRouter();

  async function submit(e){
    e.preventDefault();
    try{
      if(mode==='register'){
        const data = await apiFetch('/api/auth/register', { method:'POST', body: JSON.stringify(form), headers:{'Content-Type':'application/json'} });
        localStorage.setItem('token', data.token);
        r.push('/');
      } else {
        const data = await apiFetch('/api/auth/login', { method:'POST', body: JSON.stringify({ emailOrUsername: form.emailOrUsername, password: form.password }), headers:{'Content-Type':'application/json'} });
        localStorage.setItem('token', data.token);
        r.push('/');
      }
    }catch(err){ alert(err.msg||'خطأ'); }
  }

  return (
    <div style={{maxWidth:600, margin:'30px auto', padding:20}}>
      <h2>{mode==='register'?'تسجيل':'دخول'}</h2>
      <form onSubmit={submit}>
        {mode==='register' && <>
          <input placeholder="username" onChange={e=>setForm({...form,username:e.target.value})} /><br/><br/>
          <input placeholder="email" onChange={e=>setForm({...form,email:e.target.value})} /><br/><br/>
          <input placeholder="password" type="password" onChange={e=>setForm({...form,password:e.target.value})} /><br/><br/>
        </>}
        {mode==='login' && <>
          <input placeholder="email or username" onChange={e=>setForm({...form,emailOrUsername:e.target.value})} /><br/><br/>
          <input placeholder="password" type="password" onChange={e=>setForm({...form,password:e.target.value})} /><br/><br/>
        </>}
        <button type="submit">{mode==='register'?'سجل':'دخول'}</button>
      </form>
      <div style={{marginTop:10}}>
        <button onClick={()=>setMode(mode==='register'?'login':'register')}>تبديل إلى {mode==='register'?'دخول':'تسجيل'}</button>
      </div>
    </div>
  );
}
