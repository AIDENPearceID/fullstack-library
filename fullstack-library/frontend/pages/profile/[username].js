import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function Profile(){
  const r = useRouter();
  const { username } = r.query;
  const [user,setUser] = useState(null);

  useEffect(()=>{ if(username) load(); },[username]);
  async function load(){
    try{
      const data = await apiFetch(`/api/users/${username}`);
      setUser(data);
    }catch(e){ console.error(e); alert('خطأ'); }
  }

  return (
    <div style={{maxWidth:800, margin:'30px auto', padding:20}}>
      {!user ? <div>Loading...</div> : (
        <>
          <img src={user.avatar || '/placeholder.png'} style={{width:100,height:100,borderRadius:50}} />
          <h2>{user.username}</h2>
          <div>متابعين: {user.followers ? user.followers.length : 0}</div>
        </>
      )}
    </div>
  );
}
