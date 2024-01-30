
import React , { useState } from "react";
import {  useNavigate , useLocation  } from "react-router-dom";
import NavLogo from "../../assets/nav-logo.svg";
import { axiosInstance } from '../../constants/axiosInstance';
import BerbixVerify from "berbix-react";
import PropTypes from "prop-types";
// const jwt = require('jsonwebtoken');
// import { Footer } from "./Footer";
// import { Navbar } from "./Navbar";



export const Agevalidation = (req,res,next) => {
    const location = useLocation();
    let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id  = location.state.id;
    const response =await axiosInstance.post("/api/v1/user/idverification",{id},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization"       : localStorage.getItem('token'),
        }
      }
    );
    const Client_token = response.data.data.clientToken;
    if (response.data.success) {
      navigate("/berbix-verification" ,{state : {clientToken : Client_token}});
    }else{
      // Console.log('Invalid')
    }
  };
  return (
    <>
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
              <h4 className="mt-2 pb-2 text-center  text-xl font-medium text-gray-600">
                Are you 21 or Older?
              </h4>
              <p className=" pb-2 px-12 text-center  text-md font-normal text-gray-400">You must be 21 years old or older to view website content.</p>
            </div>
            <form className="mt-8 space-y-6">

              <div className="flex flex-row justify-between">
                <button
                  onClick={handleSubmit}
                  className="group relative w-40 flex justify-center py-3  border border-transparent text-sm font-medium rounded-md text-black bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Yes
                </button>
                <button 
                  className="group relative w-40 flex justify-center py-3   border-2 text-sm font-medium rounded-md text-black bg-white  hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
