import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const url = 'http://localhost:5000/users/add'
  const [Error, setError] = useState('')
  const [data, setData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const handleChange = ({currentTarget:input})=>{
    setData({...data,[input.name]:input.value})
  }
  const navigate = useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
      try{
        const {data: res} = await axios.post(url,data);
        navigate("/login")
        console.log(res.Message)
      }catch(error){
        if(error.response && error.response.status >= 400 &&
          error.response.status <=500){
              setError(error.response.data.message)
          }
      }
  }

  return (
    <div className='bg-emerald-700 min-h-screen flex items-center justify-center'>
        <div className=" flex items-center justify-center bg-emerald-500 shadow-md shadow-gray-900 ">
        <form className='border-2 border-gray-100 h-[500px] w-[300px] text-center items-center justify-center rounded-3xl' onSubmit={handleSubmit}>
                <span className='mt-6 '>
                    <h1 className="text-black font-black">Create Account</h1>
                   {Error && <p className='text-xl bg-rose-400 rounded-lg'>{Error}</p>} 
                    <div className='m-12 flex items-start flex-col justify-start space-y-3'>
                        <input type='text' placeholder='First Name' name='firstName' required value={data.firstName} className='rounded text-center' onChange={handleChange} />
                       
                        <input type='text' placeholder='Last Name' name='lastName' required value={data.lastName} className='rounded text-center' onChange={handleChange}  />
                        <input type='email' placeholder='Email' name='email' required value={data.email} className='rounded text-center' onChange={handleChange}/>
                        <input type='password' placeholder='Password' name='password' required value={data.password} className='rounded text-center' onChange={handleChange} />
                    </div>
                    <div className="m-3 flex items-center justify-center">
                        <button type='submit' className='border-2 rounded border-white
                         mx-6 bg-emerald-700 text-white w-24 hover:text-black
                          hover:border-emerald-700 hover:bg-white'
                        >
                            Sign Up
                        </button>
                        <Link to='/login' className='border-2 rounded
                         border-white mx-6
                         bg-red-700 text-white w-24
                         hover:text-black hover:border-red-700
                          hover:bg-white'>
                            Login
                        </Link>
                    </div>
                </span>
               

        </form>
        </div>
       

    </div>
  )
}

export default SignUp