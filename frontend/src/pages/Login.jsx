import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from "../store/auth"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email:"",
    password:"",
  });
  const change=(e) => {
    const {name,value} = e.target;
    setValues({...Values, [name]:value});
  };
  const handleSubmit = async() => {
    try
    {
      const res = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        Values,
        {
          withCredentials:true,
        }
      );
      dispatch(authActions.login());
      console.log(res.data)
      navigate("/profile");
    }
    catch(error)
    {
      toast.error(error.response?.data?.message || 'An error occurred!');
    }
  };
    return (
        <div className='h-screen bg-green-100 flex items-center justify-center'>
          <ToastContainer position="top-center" draggable/>
          <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
            <Link to="/" className='text-2xl font-bold text-center'>
              PODCASTER
            </Link>
            <div className="mt-6 w-full">
              <div className='w-full flex flex-col mt-4'>
                <label htmlFor="">Email</label>
                <input type="email" className='mt-2 px-2 py-2 rounded-full outline-none border border-black' required placeholder='Enter email ...' name="email" value={Values.email} onChange={change}/>
              </div>
              <div className='w-full flex flex-col mt-4'>
                <label htmlFor="">Password</label>
                <input type="password" className='mt-2 px-2 py-2 rounded-full outline-none border border-black' required placeholder='Enter Password ...' name="password" value={Values.password} onChange={change}/>
              </div>
    
              <div className='w-full flex flex-col mt-6'>
                <button className='bg-green-900 font-semibold text-xl text-white rounded-full py-2' 
                onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className='w-full flex flex-col mt-6'>
                <p className='text-center'>Don't have an account? <Link to="/signup" className='font-semibold text-green-900 hover:text-blue-600'>Signup</Link></p>
              </div>
            </div>
          </div>
        </div>
        );
}

export default Login;
