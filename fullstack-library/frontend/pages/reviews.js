import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import Link from 'next/link';

export default function Reviews(){
  const [list,setList] = useState([]);
  useEffect(()=>{ load(); },[]);
  async function load(){
    try{
      const data = await apiFetch('/api/reviews');
      setList(data);
    }catch(e){ console.error(e); }
  }
  return (
    <div style={{maxWidth:900, margin:'20px auto', padding:20}}>
      <h2>المراجعات</h2>
      <Link href="/"><a>الرئيسية</a></Link>
      <div style={{marginTop:20}}>
        {list.map(r=>(
          <div key={r._id} style={{background:'#222', padding:12, borderRadius:8, marginBottom:10}}>
            <div style={{color:'#00bcd4', fontWeight:700}}>{r.title}</div>
            <div style={{color:'#ccc'}}>{r.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
