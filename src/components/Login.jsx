import React, { useState } from "react";
import app from "../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/NoteSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const user = useSelector((state) => state.noteSlice.user);
  const dispatch=useDispatch()

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("please enter your credentials");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        console.log(res.user.email);
        dispatch(setUser(res.user.email))
        alert("logged in successfully")
      })
      .catch((error) => {
        console.log("error is :", error)     // Handle Login  errors
        alert("invalid credentials")        
        });

      navigate("/")
      
      setFormData({})
  };

  return (
    <>
      {
        !user && <div className="h-full flex  items-center justify-center mt-24 w-full">
        <div className="border-2 rounded-md border-red-300 h-full md:mx-0 mx-6 py-6 w-full md:w-[25vw] flex flex-col bg-slate-200 text-black items-start gap-6 justify-start px-6 ">
          <h1 className="font-bold  text-[25px] mt-2">Log In</h1>
          <div>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
              <input
                className="bg-transparent  outline-none border-2 rounded-3xl my-3 px-4 py-2 w-full md:w-[20vw] border-pink-400"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email:e.target.value})}
              />
              <input
                className="bg-transparent outline-none border-2 rounded-3xl my-3 px-4 py-2 w-full md:w-[20vw] border-pink-400"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password:e.target.value})}
              />
              <button
                type="submit"
                className="bg-pink-500 rounded-2xl p-2 mt-6 font-semibold"
              >
                Log in
              </button>
              <p className="text-center mt-8">
                Dont have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer"
                >
                  SignUp
                </span>
              </p>
            </form>
          </div>
        </div>
      </div> 
      }
    </>
  );
}

export default Login;
