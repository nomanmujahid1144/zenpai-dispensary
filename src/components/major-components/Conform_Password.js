import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { axiosInstance } from "../../constants/axiosInstance";
import { useAlert } from 'react-alert'
import NavLogo from "../../assets/logo.png";
// import { Footer } from "./Footer";
// import { Navbar } from "./Navbar";

export const ConformPassword = () => {

  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const [isToken , setIsToken] = useState(false)
  const [Password , setPassword] = useState({
    password : '',
    cpassword : ''
  })
  const [Id , setId] = useState({
    id : '',
  })

  const token = params.token ;

  useEffect(() => {
    verifyToken();

  }, []);


  const verifyToken = async () => {
    await axiosInstance.patch('/api/v1/user/verifyjwttoken' , {token} )
          .then((res) => {
            setIsToken(true)
            setId({ id :  res.data.data})
          })
          .catch((err) => {
            setIsToken(false)
          })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const {password , cpassword } = Password;
    const {id} = Id;
    if(password !== cpassword){
      alert.show("Password does not Match")
    }else{
      await axiosInstance.patch('/api/v1/user/updatepassword' , {password , id})
          .then((res) => {
            alert.show(res.data.message.toString())
            navigate('/login')
          })
          .catch((err) => {
            alert.show("Something Went Wrong.")
          })
    }

    
  }

  
  const onChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value });
  };

  return (
    <>
    {/* <div>
      <Navbar />
    </div> */}
    {isToken ? 
      <div className="h-[100vh] flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-auto shadow-md rounded-md bg-white flex justify-center">
        <div floated={false} className="h-auto p-12">
          <div className="max-w-md w-full space-y-8">
            <div className="w-96">
              <img
                className="mx-auto  rounded-lg  w-20"
                src={NavLogo}
                alt="Workflow"
              />
              <h2 className="mt-2 pb-7 text-center text-xl font-normal text-gray-600">
                Reset Your Password
                <p className="text-sm font-medium text-gray-400">Type here your new Password.</p>
              </h2>
              
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <div className="mb-2 ml-1 ">
                    <label className="font-bold">Password</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    onChange={onChange}
                    name="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <div className="mb-2 ml-1 ">
                    <label className="font-bold">Confirm Password</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    onChange={onChange}
                    placeholder="Confirm password"
                    name="cpassword"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="group relative w-96 flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondaryText bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Reset Password
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
    :
      <h1 >Please Try Again, Session Expired</h1>
    }
    
    {/* <Footer /> */}
    </>
  );
};

