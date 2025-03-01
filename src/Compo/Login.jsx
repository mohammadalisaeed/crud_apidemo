import React, { useEffect,useState } from 'react'
import axios from'axios'
import {Link, useNavigate} from 'react-router-dom'
export default function Login() {

    let [email, setEmail]= useState("")
    let [pswd, setPswd]= useState("")
    let [msg, setMsg]= useState("")
    let [show, setShow]= useState(false)

    let nav = useNavigate()
    let url ="https://67ad88033f5a4e1477ddf5ae.mockapi.io/mocapi";
    async function Login_func(){
        let api_data = axios.get(url)
        let get_data_from_api = (await api_data).data
        let record_find = get_data_from_api.find((a)=>(a.email === email  || a.name === email)
    && a.password === pswd)
    if(record_find){
        let uname = record_find.name;
        nav("/cr",{state:{n:uname}})
    } else {
        setMsg("Invalid Credentials")
        setShow(true)
    }
    }
    useEffect(()=>{
        if (show === true) {
            let timer = setTimeout(()=>{
                setShow(false)
            },2000);
            return()=> clearTimeout(timer)
        }
    })
  return (
    <div>
      <h1>Login your Account</h1>
      <p>Enter Email/Username Here</p>
      <input type="text" className='form-control my-3' placeholder='Enter Your Email Or Username' 
      value={email} onChange={(e)=>setEmail(e.target.value)} />

      <p>Enter Password</p>
      <input type="password" className='form-control my-3' placeholder='Enter Your Password' 
      value={pswd} onChange={(e)=>setPswd(e.target.value)} />
      {
        show &&(
            <p style={{color:"red"}}>{msg}</p>
        )
      }
      <button className='btn btn-primary my-3' onClick={Login_func}>Login</button><br/>
      <Link to="/cra">Don't have Account? Please Create</Link>
    </div>
  )
}
