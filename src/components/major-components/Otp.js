import {  useNavigate , useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";
import NavLogo from "../../assets/nav-logo.svg";
import {Loader} from '../minor-components/Loader'
import { axiosInstance } from '../../constants/axiosInstance';
import { useAlert } from 'react-alert'
// import { Footer } from "./Footer";
// import { Navbar } from "./Navbar";

export const Otp = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let alert = useAlert();
  const [loading , setLoading] = useState(false)
  const [OTP , setOTP]   = useState('');
  const PhoneNumber = location.state.phoneNumber;


  const addPhone = async () => {
    await axiosInstance.patch("/api/v1/user/addUserNumber", {PhoneNumber} ,{
        headers: {
          "Content-Type": "application/json",
          "Authorization"       : localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      console.log(response.data.PhoneNumber + " Phone No from JSON")
      if (response.data.success) {
        setLoading(false)
        setTimeout(function(){
          navigate("/age-verification" , {state : {id : location.state.id}} );
      }, 500);
      }
    })
    .catch(() => {
      setLoading(false)
      alert.show("Something Went Wrong.")
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    if(OTP.length === 6){
      // console.log(otp);
      let  conformatoinResult =  window.conformatoinResult;
      conformatoinResult.confirm(OTP).then((result) => {
        // User signed in successfully.
        const user =  result.user;
        addPhone(); 
       
      }).catch((error) => {
        alert.show("Otp you entered is incorrect.")
        setLoading(false)
      });
    }

   
    // setOTP(OTP);
    

  }

  const onChange = (e) => {
    setOTP(e.target.value);
  };

  
  return (
    <>
    {!loading ? 
      <div className="h-[100vh] flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-auto shadow-md rounded-md bg-white flex justify-center">
          <div floated={false} className="h-auto p-12">
            <div className="max-w-md w-full space-y-8">
              <div className="w-96">
                <img
                  className="mx-auto  h-12 w-auto"
                  src={NavLogo}
                  alt="Workflow"
                />
                <h2 className="mt-2 pb-7 text-center text-2xl font-normal text-gray-600">
                  Let's get Started
                </h2>
              </div>
              <form className="mt-8 space-y-6" >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <div className="mb-3 ml-4 ">
                      <label className="font-bold">Enter the code send to {PhoneNumber}</label>
                    </div>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      value={OTP}
                      onChange={onChange}
                      minLength={6}
                      maxLength={6}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button" onClick={handleSubmit}
                    className="group relative w-96 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Submit
                  </button>
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    :(
      <Loader />
    )}
    </>
  );
};
