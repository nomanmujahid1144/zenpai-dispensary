import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Noty from "noty";
import { axiosInstance } from '../../constants/axiosInstance';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { baseURL } from "../../constants/baseURL";
import { useAlert } from 'react-alert'

export const Account = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const [enable, setEnable] = useState(true)

    const [credentials, setcredentials] = useState({
        fullName: "",
        email: "",
        deliveryZipCode: "",
        phoneNumber: "",
        govtIdImage: "",
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
            navigate("/accounts")
        } else {
            navigate("/login")
        }
    }, [])

    const fetchUser = async () => {
        await axiosInstance.get("/api/v1/user/getsingleuser", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                setcredentials({
                    fullName: response.data.data.fullName,
                    email: response.data.data.email,
                    deliveryZipCode: response.data.data.deliveryZipCode,
                    phoneNumber: response.data.data.phoneNumber,
                    govtIdImage: response.data.data.govtIdImage,
                });
            })
            .catch((err) => {
                new Noty({
                    type: "error",
                    timeout: 2000,
                    text: "Something Went Wrong"
                }).show();
            })
    };

    const handleEdit = async () => {
        setEnable(!enable)
    }

    const handleUpdate = async () => {
        const { fullName, email, deliveryZipCode, phoneNumber } = credentials;

        await axiosInstance.patch('/api/v1/user/updateuser', { fullName, email, deliveryZipCode, phoneNumber }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                setcredentials({
                    fullName: response.data.data.fullName,
                    email: response.data.data.email,
                    deliveryZipCode: response.data.data.deliveryZipCode,
                    phoneNumber: response.data.data.phoneNumber,
                });
                new Noty({
                    type: "success",
                    timeout: 2000,
                    text: "Successfully updated"
                }).show();
            })
            .catch((err) => {
                new Noty({
                    type: "error",
                    timeout: 2000,
                    text: "Something Went Wrong"
                }).show();
            })
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleRequestDelete = async () => {
        const email = credentials.email;
        const name = credentials.fullName;
        await axiosInstance.patch('/api/v1/user/disableaccount', { email, name }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then((res) => {
            alert.show("Requeat send to Admin")

        }).catch((err) => {
            alert.show("Something Went Wrong")
        })
    }

    return (
        <>
            <div className="h-full flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

                <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:m-8 md:m-2 sm:m-0  text-[#4E4E4E]">
                    <div className="w-12/12">
                        <div className="w-12/12 p-7 lg:mx-4 md:mx-0 sm:mx-0  shadow-md rounded bg-white flex justify-center">
                            <div floated={false} className="h-auto w-full ">
                                <div className="flex justify-between">
                                    <div className="md:w-full">Basic Information</div>
                                    <div className="text-[#8275FC] md:w-full cursor-pointer" onClick={handleEdit}>Edit Password</div>
                                </div>
                                <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                                    <div className="w-full   lg:my-8 md:my-4">
                                        <div className="w-12/12">
                                            <div className="mb-4">
                                                <label>Full Name</label>
                                            </div>
                                            <input
                                                name="fullName"
                                                type="text"
                                                required
                                                disabled={enable}
                                                onChange={onChange}
                                                value={credentials.fullName}
                                                className={enable == true ? 'bg-[#D3D3D3] appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm' : 'bg-white appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm'}
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="w-12/12">
                                            <div className="mb-4">
                                                <label>Email</label>
                                            </div>
                                            <input
                                                name="email"
                                                type="text"
                                                required
                                                disabled={enable}
                                                onChange={onChange}
                                                value={credentials.email}
                                                className={enable == true ? 'bg-[#D3D3D3] appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm' : 'bg-white appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm'}
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full  text-[#4E4E4E] lg:my-8 md:my-4">
                                        {/* <div className="w-12/12">
                                <div className="mb-4">
                                    <label>Delivery Code</label>
                                </div>
                                <input
                                    name="deliveryZipCode"
                                    type="text"
                                    required
                                    disabled = {enable}
                                    onChange={onChange}
                                    value={credentials.deliveryZipCode}
                                    className={enable == true  ? 'bg-[#D3D3D3] appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm' : 'bg-white appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm' }
                                    placeholder="Email"
                                />
                            </div> */}
                                        <div className="w-12/12">
                                            <div className="mb-4">
                                                <label>Phone Number</label>
                                            </div>
                                            <input
                                                name="phoneNumber"
                                                type="text"
                                                required
                                                disabled={enable}
                                                onChange={onChange}
                                                value={credentials.phoneNumber}
                                                className={enable == true ? 'bg-[#D3D3D3] appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm' : 'bg-white appearance-none w-11/12 rounded px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm'}
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {enable === false ?
                                    <div className="w-full flex text-[#4E4E4E] my-8" onClick={handleUpdate}>
                                        <button className="w-[95%] rounded px-3 py-3 bg-[#E9C95D]">Save Changes</button>
                                    </div>
                                    :
                                    <></>
                                }
                                <label className="font-bold">Govt. ID Image</label>
                                <div className="border-[0.5px]  rounded border-[#707070]">
                                    <img alt="No Img." className="w-full object-cover object-center group-hover:opacity-50" src={`${baseURL + credentials.govtIdImage}`} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-12/12 lg:mt-0 md:mt-4 sm:mt-4">
                        {/* <div className="mb-6 w-11/12">
                <h1 className="text-2xl font-semibold">Medical Information</h1>
                <p className="text-md mt-4 text-[#A2A2A2]">Only official state issued Medical Marijuana Identification cards grant exemption from certain taxes. Learn more here.</p>
            </div>
            <div className="mb-6 w-11/12">
                <h1 className="text-2xl font-semibold">Request My Data</h1>
                <p className="text-md mt-4 text-[#A2A2A2]">Click the button below to request your data. We'll send an email to {credentials?.email} to verify your request, and once your dat is ready, we'll notify you via email.</p>
            </div>
            <div className="w-8/12 flex text-[#4E4E4E] my-8">
                <button className="w-full rounded px-4 py-4 bg-[#E9C95D]">Requested</button>
            </div>  */}
                        <div className="mb-6 w-11/12">
                            <h1 className="text-2xl font-semibold">Delete My Account</h1>
                            <p className="text-md mt-4 text-[#A2A2A2]">Request to delete your personal information from Eaze by clicking the button below. We'll send an email to {credentials?.email} to verify your request. Please review our Privacy Policy for more information about deleting your data before submitting your request.</p>
                        </div>
                        <div className="w-8/12 flex text-[#4E4E4E] my-8" onClick={handleRequestDelete}>
                            <button className="w-full rounded px-4 py-4 bg-[#E9C95D]">Request Deletion</button>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

