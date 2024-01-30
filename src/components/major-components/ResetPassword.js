import { useState } from "react";
import React from "react";
import { axiosInstance } from "../../constants/axiosInstance";
import NavLogo from "../../assets/logo.png";
import { useAlert } from 'react-alert'
// import { Navbar } from "./Navbar";
// import { Footer } from "./Footer";

export const ResetPassword = () => {

  const [forgetEmail , setForgetEmail] = useState({
    email : ''
  })
  
  const alert = useAlert();


  const handleSubmit = async (e) => {
    e.preventDefault()
    const {email} = forgetEmail;

    await axiosInstance.patch('/api/v1/user/forgetpassword' , {email})
          .then((res) => {
            alert.show("Email send to this mail.")
          })
          .catch((err) => {
            console.log(err)
            alert.show("Connection Error.")
          })
  }

  
  const onChange = (e) => {
    setForgetEmail({ ...forgetEmail, [e.target.name]: e.target.value });
  };
  

  return (
    <>
    {/* <div>
      <Navbar />
    </div> */}
    <div className="h-screen flex bg-emerald-50 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full lg:w-4/12  md:w-6/12 shadow-md rounded-md bg-white flex justify-center">
        <div floated={false} className="h-auto p-12 w-full">
          <div className="w-full">
            <div className="w-full">
              <img
                className="mx-auto  rounded-lg  w-20"
                src={NavLogo}
                alt="Workflow"
              />
              <h2 className="mt-2 text-center text-xl font-normal text-gray-600">
                Reset Your Password
                <p className="text-sm my-4 font-medium text-gray-400">You can Reset your Password here.</p>
              </h2>
              
            </div>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <div className="mb-2 ml-1 ">
                    <label className="font-bold">Email</label>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="type"
                    onChange={onChange}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="group my-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondaryText bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500">
                  Submit
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
    {/* <div>
      <Footer />
    </div> */}
    </>
  );
};

