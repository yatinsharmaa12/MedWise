import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
    console.log(email,password,role);
    const response = await axios.post(
      role=="doctor"?
      "http://localhost:5000/api/doc/login"
      :"http://localhost:5000/api/user/login"
      ,{
      email,
      password
    });

    console.log(response);
    navigate(role=== "doctor"? "/dashboard": "/");
  }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to={"/signup"} className="text-indigo-600 hover:text-indigo-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
