import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
    
        const [email, setEmail] = useState()
        const [password, setPassword] = useState()
        const navigate = useNavigate()
   const hamdleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const result = await axios.post(`${API_URL}/login`,{email,password})
            console.log(result)
            if (result.data?.token) {
                localStorage.setItem("token",result.data.token)
                navigate('/home')
            }
        }
        catch(err){
        if (err.response?.status === 401) {
            toast.error("password incorrect")
        }
        else if (err.response?.status === 404) {
             toast.error("user not found")
        }
        }
    }       
  return (
     <div className='w-full h-full flex items-center justify-center bg-gray-800 min-h-screen'>
   <div className='flex flex-col w-120 h-110 bg-white rounded-xl'>
        <form onSubmit={hamdleSubmit}>
            <div className='text-3xl text-center font-bold mt-8'>
                <h1>LOGIN</h1>
            </div>
            <div className='w-90 flex flex-col mx-14 mt-8 gap-4'>
                 <input onChange={e => setEmail(e.target.value)} className='w-full px-4 py-2 pl-2 border border-gray-500 rounded-xl' type="email" placeholder='Email...' required/>
                  <input onChange={e => setPassword(e.target.value)} className='w-full px-4 py-2 pl-2 border border-gray-500 rounded-xl' type="password" placeholder='Password...'required />
            </div>
            <div className='w-90 mx-14 mt-5 gap-2'>
                <button className='w-full border border-gray-500 rounded-xl bg-black text-white text-lg px-4 py-2 hover:bg-white hover:text-black'>Login</button>
            </div>
        </form>
        <hr className='w-100 mx-8 my-5' />
       <Link to='/'>
        <div className='w-90 mx-14 mt-2 '>
                <button className='w-full border border-gray-500 rounded-xl  text-lg px-4 py-2 bg-white text-black'>Sign-up</button>
            </div>
       </Link>
   </div>
    </div>
  )
}

export default Login
