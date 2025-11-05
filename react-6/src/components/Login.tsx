import { useContext, useState } from "react"
import UserContext from "../context/UserContext";

export default function Login(){

  const [username,setUsername] = useState('');
  const [password,setPassword]=useState('');
  
  const {setUser}=useContext(UserContext)
  const handleSubmit = (e : any)=>{
    e.preventDefault();
    setUser({username,password})
  }
  return(
    <>
    <h2>Login</h2>
    <input type="text" value={username}
    onChange={(e)=>setUsername(e.target.value)} 
    
    placeholder="---username---"  />
    <input type="text" placeholder="---password ----" 
    value={password} 
    onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={handleSubmit}> Click Here </button>

    </>
  )
}