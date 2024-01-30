import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import NavLogo from "../../assets/nav-logo.svg"; 
import { authentication } from "../../firebase-config";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth';
import { useAlert } from 'react-alert'

export const PhoneNo = (req,res,next) => {
  const [credentials, setcredentials] = useState({
    phoneNumber: "",
    mobileNetwork : ""
  });
  const [loading , setLoading] = useState(false)
  const [value, setValue] = useState()
  let navigate = useNavigate();
  let alert = useAlert();
 
  const generateRecapture = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

      }
    }, authentication);
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // const response =await fetch(
    //   "http://localhost:8080/api/v1/user/addUserNumber",
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization"       : localStorage.getItem('token')
    //     },
    //     body: JSON.stringify({value}),
    //   }
    // );
    // const json = await response.json();
    //   console.log(json.data._id + " ID from JSON")
    // Firebase Code for sending SMS-OTP Verification-------------(budcarsweeddelivery@gmail.com)
   generateRecapture();
   let appVerifier = window.recaptchaVerifier;
   signInWithPhoneNumber(authentication , value , appVerifier)
   .then(conformatoinResult => {
    window.conformatoinResult = conformatoinResult;
    setTimeout(function(){
      setLoading(false)
      navigate("/otp" ,{state : {phoneNumber : value}});
  }, 4000);
   }).catch((error) => {
    setLoading(false)
    alert.show("Something Went Wrong.")
   })
  };

  const onChange = (e) => {
    console.log(e.target.value)
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="min-h-screen flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                  <div className='mb-3 ml-4 '>
                  <label  className='font-bold'>
                    Enter Your Phone Number
                  </label>
                  </div>
                    <div className="flex">
                    <PhoneInput
                      className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded border-l-gray-100 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      international 
                      initialValueFormat="international"
                      countryCallingCodeEditable={false} 
                      defaultCountry="PK"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                    </div>
                    <div id="recaptcha">

                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit" onClick={handleSubmit}
                    className="group relative w-96 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondaryText bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </>
  );
};
