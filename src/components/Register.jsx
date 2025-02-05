import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import app from '../firebase.js';

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    

    const navigate=useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const auth=getAuth(app)                               // Get the Firebase authentication instance
      createUserWithEmailAndPassword(auth, formData.email,formData.password)   // Attempt to login with email and password
      .then((res)=>{
        console.log(res);
        
      })
      .catch((err)=>{
        console.log(err);     // Handle Login  errors
        
      })
      navigate("/login")
    
    };
  return (
    <>
        <div className="h-full flex  items-center justify-center mt-8 w-full">
        <div className="border-2 rounded-md border-red-300 h-full py-2 w-full mx-6 md:mx-0 md:w-[25vw] flex flex-col bg-slate-700 text-white items-start gap-6 justify-start px-6 ">
          <h1 className="font-bold  text-[25px] mt-2">Sign Up</h1>
          <div>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            
              <input
                className="bg-transparent   outline-none border-2 rounded-3xl my-3 px-4 py-2 w-full md:w-[20vw] border-pink-400"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData , email:e.target.value})}
              />
              <input
                className="bg-transparent outline-none border-2 rounded-3xl my-3 px-4 py-2 w-full md:w-[20vw] border-pink-400"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData , password:e.target.value})}
              />
              <button
                type="submit"
                className="bg-pink-500 rounded-2xl p-2 mt-6 font-semibold"
              >
                Sign Up
              </button>
              <p className="text-center mt-8">Do you have an account? <span onClick={()=>navigate("/login")} className="cursor-pointer">Login</span></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register