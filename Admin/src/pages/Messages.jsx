import {useEffect,useState} from 'react';
import api from '../services/api';

export default function Messages(){
const [messages,setMessages]=useState([])

const load=()=>api.get('/contact').then(r=>setMessages(r.data))

useEffect(()=>{load()},[])

const updateStatus=async(id)=>{
await api.put(`/contact/${id}/status`,{status:'read'})
load()
}

return(
<div>
<h2 className='text-3xl mb-6'>Messages</h2>
{messages.map(m=>(
<div key={m._id} className='bg-white p-5 rounded-3xl shadow mb-4 flex justify-between'>
{m.email}
<button onClick={()=>updateStatus(m._id)}>Mark Read</button>
</div>
))}
</div>
)
}