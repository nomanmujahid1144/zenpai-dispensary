import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/logo.png";
import search from "../../assets/bx-search.svg";
import shoppingCart from "../../assets/shopping-cart.svg";
import navLocation from "../../assets/nav-location.svg";
import { IconBgRound } from "../minor-components/IconBgRound";
import { EarnDollars } from "../minor-components/EarnDollars";
import { Help } from "../minor-components/Help";
import { OrderHistory } from "../minor-components/OrderHistory";
import { Modal } from "../minor-components/Modal";
import { axiosInstance } from '../../constants/axiosInstance';
import { Loader } from '../minor-components/Loader'
import { useAlert } from 'react-alert'

export const Navbar = () => {
  let nevigate = useNavigate();
  const alert = useAlert();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nevigate("/");
    alert.show("Logout Successfully")

  };

  const [showSidebar, setshowSidebar] = useState(1);
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenHelp, setIsOpenHelp] = useState(false)
  const [isOpenOrderHistory, setIsOpenOrderHistory] = useState(false)
  const [announcement, setAnnouncement] = useState('');
  const [brands, setBrands] = useState([])
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState(0)

  const config = {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  }

  useEffect(() => {
    getBrands()
    getOrders()
    getCart()
  }, [cart])

  useEffect(() => {
    getAnnouncementList();
  }, []);

  const getBrands = async (e) => {
    try {
      axiosInstance.get('/api/v1/category/getcategories')
        .then((res) => {
          if (res.data.success) {
            setBrands(res.data.data)
          }
          else {
            console.log('No Brand Found')
          }
        })
        .catch((error) => {
          console.log(error, "Error in Fetching Brands")
        })

    }
    catch (e) {
      console.log(e)
    }

  }

  const getOrders = async (e) => {
    try {

      let page = 1;
      let limit = 5;
      // if(req.query.page && req.query.limit){
      //     page = req.query.page;
      //     limit = req.query.limit;
      // }else{
      //   page = 1;
      //   limit = 4;
      // }

      axiosInstance.get('/api/v1/order/getallordersbyid', config, {
        params: { page, limit }
      })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data, 'All orders')
            setOrders(res.data.data)
          }
          else {
            console.log('No Order Found')
          }
        })
        .catch((error) => {
          console.log(error, "Error in Fetching Orders")
        })

    }
    catch (e) {
      console.log(e)
    }

  }
  const getCart = async (e) => {
    try {
      axiosInstance.get('/api/v1/order/getcart', config)
        .then((res) => {
          if (res.data.success) {
            setCart(res.data.data.details.length)
          }
          else {
            console.log('No Order Found')
          }
        })
        .catch((error) => {
          console.log(error, "Error in Fetching Orders")
        })

    }
    catch (e) {
      console.log(e)
    }

  }

  const handleBrand = async (e) => {
    const brand = e.target.innerHTML.toLowerCase();
    try {
      nevigate(`/brand/${brand.toString()}`, { state: { brand: brand } });
      setshowSidebar(!showSidebar)
    }
    catch (e) {
      console.log(e)
    }
  }




  const getAnnouncementList = async () => {
    await axiosInstance.get('/api/v1/announcement/getannouncement')
      .then((res) => {
        let aboutUs = res.data.data;
        if (aboutUs.length != 0) {
          setAnnouncement(aboutUs[0].announcement)
        }
      })
      .catch((err) => {

      })
  }

  return (
    <>
      <div className="grid sticky top-0 z-30 bg-white lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2  lg:px-16 md:px-12 xxs:px-7  items-center  py-4">
        <div className="flex  items-center">
          <>
            {showSidebar ? (
              <button className="w12 flex items-center cursor-pointer" onClick={() => setshowSidebar(!showSidebar)} >
                <svg fill="black" viewBox="0 0 100 80" width="25" height="25">
                  <rect width="100" height="10"></rect>
                  <rect y="30" width="100" height="10"></rect>
                  <rect y="60" width="100" height="10"></rect>
                </svg>
              </button>
            ) : (
              <div className={`top-0 left-0 w-64 bg-white   z-30  text-white fixed h-full ${showSidebar ? "-translate-x-full" : "-translate-x-0"} ease-in-out duration-300`}>
                <div className="z-10 w-full">
                  <button className=" text-xl text-black fixed top-7 left-9 " onClick={() => setshowSidebar(!showSidebar)} >
                    X
                  </button>
                  <div className="fixed w-full  h-[70%] px-5 left-2 top-20 flex flex-col  justify-between  rounded bg-transparent">
                    <div className="">
                      {!localStorage.getItem("token") ? (
                        <>
                          <Link to="/sign-up">
                            <button className="w-full py-2 my-2 text-lg text-primaryText font-semibold bg-myBg rounded text-center">
                              Sign Up
                            </button>
                          </Link>
                          <Link to="/login">
                            <button className="text-lg py-2 my-2 w-full text-primaryText font-semibold bg-white border-2 rounded text-center">
                              Sign In
                            </button>
                          </Link>
                        </>
                      ) : (
                        <button onClick={handleLogout} className=" text-lg py-3 my-2 w-full text-primaryText font-semibold bg-white border-2 rounded text-center" >
                          Logout
                        </button>
                      )}
                      <div className="pt-2 pb-1 text-lg font-bold text-primaryText">
                        Shop
                      </div>
                      <div className="flex flex-wrap gap-1 overflow-y-auto h-40">
                        {brands.map((brnad) => (
                          <div onClick={handleBrand} className="my-1 flex flex-wrap cursor-pointer  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 w-fit ">
                            {brnad.brand.charAt(0).toUpperCase() + brnad.brand.slice(1)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <ul className="">
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText" onClick={() => { setIsOpenOrderHistory(true) }}>
                        Order History
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/delivery">Delivery</Link>
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/mail-delivery">Mail Order Marijuana</Link>
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/faq">FAQ's</Link>
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/blogs">Blogs</Link>
                      </li>
                      <li className="pt-1 pb-1 cursor-pointer text-md font-bold text-primaryText">
                        <Link to="/accounts">Account</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="bottom-0 fixed w-full text-center">
                    <div className="flex justify-center">
                      <img className="w-[55px] rounded-lg " src={NavLogo}></img>
                    </div>
                    <div className="pt-2 pb-5 text-lg font-normal text-primaryText ">
                      Zenpai Dispensary
                    </div>
                  </div>
                </div>
              </div>
            )}

          </>
          <Link to='/'>
            <img className="w-[50px] ml-3 rounded-lg" src={NavLogo} />
          </Link>
        </div>
        <div className="md:flex justify-center items-center md:visible hidden">
          <div className="mr-[-30px] z-50">
            <IconBgRound svg={search} bg="bg-myBg" width="12" imgWidth={4} />
          </div>
          <input
            className="h-10 pl-10 bg-blue-50 rounded-full w-60 text-xs outline-0  hover:outline-0 focus:outline-none  "
            type="text"
            name="search"
            placeholder="Zenpai product search..."
          />
        </div>
        <div className="flex justify-around items-center gap-4 w-full">
          <Link to="/checkout">
            <IconBgRound svg={shoppingCart} bg="bg-myBg" width="12" imgWidth={4} isCart={true} totalCartItems={cart} />
          </Link>
          <button className="px-4 text-sm py-2 lg:hidden sm:block text-secondaryText bg-myBg rounded text-center">
            Order Now
          </button>
          <div className="lg:block hidden">
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/sign-up">
                  <button className="w-24  py-3 mx-1 text-lg text-primaryText font-semibold bg-myBg rounded text-center">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="text-lg w-24 py-3 mx-1 text-primaryText font-semibold bg-white border-2 rounded text-center">
                    Sign In
                  </button>
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-lg w-24 py-3 mx-1 text-secondaryText bg-myBg rounded text-center" >
                Logout
              </button>
            )}
          </div>
        </div>

      </div>
      {announcement != '' ?
        <div class="py-1 sticky top-20 z-[5] bg-myBg justify-center flex overflow-x-hidden">
          <marquee width="80%" direction="left">
            <span className="text-xl">{announcement}</span>
          </marquee>
        </div>
        : null}

      <div>
        <Modal open={isOpenOrderHistory} onClose={() => setIsOpenOrderHistory(false)} >
          <OrderHistory modal={setIsOpenOrderHistory} isAdd={true} isOrders={orders} />
        </Modal>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} >
          <EarnDollars modal={setIsOpen} isAdd={true} />
        </Modal>
        <Modal open={isOpenHelp} onClose={() => setIsOpenHelp(false)} >
          <Help modal={setIsOpenHelp} isAdd={true} />
        </Modal>
      </div>
    </>
  );
};
