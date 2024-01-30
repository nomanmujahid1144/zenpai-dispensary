
import React , { useState } from "react";
import {  useNavigate , useLocation  } from "react-router-dom";
import NavLogo from "../../assets/nav-logo.svg";
import { axiosInstance } from '../../constants/axiosInstance';
import BerbixVerify from "berbix-react";
import PropTypes from "prop-types";
import Noty from "noty";
// const jwt = require('jsonwebtoken');
// import { Footer } from "./Footer";
// import { Navbar } from "./Navbar";


BerbixVerify.propTypes = {
  // Required
  clientToken: PropTypes.string,

  // Configurations
  showInModal: PropTypes.bool,
  showCloseModalButton: PropTypes.bool,

  // Event handlers
  onComplete: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onDisplay: PropTypes.func,
  onCloseModal: PropTypes.func, // If provided, onCloseModal below gets called when the user clicks the "close modal" button
};

export const Berbix = (req,res,next) => {
    const location = useLocation();
    let navigate = useNavigate();

    console.log(location.state.clientToken);
    const clientToken = location.state.clientToken;
    console.log(clientToken)

  return (
    <>
    <div className="h-[100vh] flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-auto shadow-md rounded-md bg-white flex justify-center">
        <div floated={false} className="h-auto p-12">
          <div className="max-w-md w-full space-y-8">
          <BerbixVerify
                clientToken= {clientToken}
                onComplete={() => {
                  navigate('/')
                  // the user has completed the verification flow
                }}
              />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
