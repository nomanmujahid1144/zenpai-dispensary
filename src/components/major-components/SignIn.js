import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/logo.png";
import {Loader} from '../minor-components/Loader'
import { useAlert } from 'react-alert'
import { useState } from "react";
import { useNavigate } from 'react-router';
import { axiosInstance } from "../../constants/axiosInstance";

export const SignIn = () => {

  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });
  const [loading , setLoading] = useState(false)
  let navigate = useNavigate();
  let alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { email, password } = credentials;
    
    await axiosInstance.post(`/api/v1/user/userLogin`, {email, password } ,{
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.data.result)
        if(response.data.data.result.verified == false){
          alert.show("Your Profile is under Process, Please wait")
          setLoading(false)
        }else if(response.data.data.result.deactivate == 2){
          alert.show("Your Account has been deactivated.Please Contact Admin")
          setLoading(false)
        }else{
          localStorage.setItem("token", response.data.data.token);
          navigate("/");
          alert.show("Login Successfully")
        }
      }
    })
    .catch((err) =>{
      alert.show("Incorrect Username or Password")
      setLoading(false)
    })
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    {!loading ? (
    <div className="h-screen flex bg-emerald-50 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full lg:w-4/12  md:w-6/12 shadow-md rounded-md bg-white flex justify-center">
        <div floated={false} className="h-auto p-8 w-full">
          <div className="w-full">
            <div className="w-full">
              <Link to='/'>
                <img className="mx-auto  rounded-lg  w-20" src={NavLogo} alt="Workflow" />
              </Link>
              <h2 className="mt-2 text-center text-2xl font-normal text-gray-600">
                Sign In your Account
              </h2>
            </div>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <div className="mb-2 mt-2 ">
                    <label className="font-bold">Email</label>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div>
                  {/* <label htmlFor="password" className="sr-only">
                  Password
                </label>
                 */}
                  <div className="mb-2 mt-2 ">
                    <label className="font-bold">Password</label>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm my-4">
                <a href="#" className="font-medium text-sky-600 hover:text-myBg">
                 <Link to="/reset-password" > Forgot Password? </Link>
                </a>
              </div>
            </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondaryText bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Login
                </button>
              </div>
              <div className="flex w-full my-4 items-center justify-start">
                <div className="font-medium ">
                  Don't have an account?
                   <Link to="/sign-up" className="font-medium text-sky-600 hover:text-myBg"> Sign Up? </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    ) :(
       <Loader />
    )}
    </>
  );
};

// export default SignIn;
