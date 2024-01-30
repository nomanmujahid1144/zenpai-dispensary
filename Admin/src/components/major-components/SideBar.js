import logo2 from '../../assets/logo.png'
import { useState, useEffect } from "react"
import dashboardHome from '../../assets/dashboard-home.svg'
import product from '../../assets/product.svg'
import order from '../../assets/order.svg'
import driver from '../../assets/driver.svg'
import customer from '../../assets/customer.svg'
import category from '../../assets/category.svg'
import account from '../../assets/account.svg'
import salesPromotion from '../../assets/sales-promotion.svg'
import storeLocator from '../../assets/store-locator.svg'
import websiteSetting from '../../assets/website-setting.svg'
import logout from '../../assets/logout.svg'
import { IconBg } from '../minor-components/IconBg'
import rightArrow from '../../assets/right-arrow.svg'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { axiosInstance } from "../../constants/axiosInstance";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [restaurantArray, setrestaurantArray] = useState([])

    let ShopsArray = []

    const token = useSelector(
        (state) => state.ProfileReducer
    );
    useEffect(() => {
        if (token) {
            getShopName()
        }
    }, [token])

    const getShopName = async () => {

        const res = await axiosInstance.get('/api/v1/admin/getradius', {
            headers: {
                "authorization": localStorage.getItem('token')
            }
        })
        if (res.data.success) {
            console.log(res.data)
            res.data.data.forEach(function (restu) {
                let obj = {
                    title: restu.shopName,
                    // path : `/singleshop/${restu.products.restaurantName}`,
                }
                ShopsArray.push(obj)
            })
            setrestaurantArray(ShopsArray)
            // console.log(restaurantArray)
            // setCardData(res.data.data)
            // dispatch(selectProgressBarState(false))
        }
        else {
            // dispatch(selectProgressBarState(false))
            alert.show('Not Found')
        }
    }
    console.log(restaurantArray, "Array")

    const sidebarData = [
        {
            title: 'Dashboard',
            path: '/',
            svg: dashboardHome,


        },
        {
            title: 'Categories',
            path: '/categories',
            svg: category,

        },
        {
            title: 'Products',
            path: '/products',
            svg: product,

        },
        {
            title: 'Orders',
            path: '/orders',
            svg: order,

        },
        {
            title: 'Shops',
            path: '/shops',
            childrens: restaurantArray,
            svg: product
        },
        {
            title: 'Drivers',
            path: '/drivers',
            svg: driver
        },
        {
            title: 'Users',
            path: '/users',
            svg: driver
        },
        {
            title: 'Earning',
            path: '/earnings',
            svg: driver
        },
        {
            title: 'Website Settings',
            path: '/pages',
            svg: category
        },
        // {
        //     title: 'App Setting',
        //     path: '/appSettings',
        //     svg: category
        // }, 
        {
            title: 'Logout',
            path: '/logout',
            svg: logout
        }
    ]


    const loadWindow = (e) => {
        const restaurantName = e.target.innerHTML;
        const res = restaurantName.toLowerCase();
        navigate(`/singleshop/${res}`, { state: { restaurantName: res } })
        window.location = `/singleshop/${res}`
    }

    return (
        <>

            <div style={{ scrollbarWidth: 'none' }} className=' shadow-xl bg-white fixed overflow-y-auto scroll-thin top-0 h-full left-0 w-[18%] 
             md:hidden'>
                <div className=' h-24 bg-gray-50 flex justify-center items-center p-0 m-0'>
                    <img className='mx-auto mt-0 rounded-lg  w-20' src={logo2} alt='logo' />
                </div>
                <ul className='flex flex-col'>
                    {sidebarData.map((item, index) => (
                        <li key={index} className={`font-semibold p-5 flex justify-between  cursor-pointer`}>
                            <IconBg svg={item.svg} />
                            <div className='flex-1 flex justify-between items-center  pl-[20%] text-xs'>
                                {item.path === '/logout' ? (
                                    <p className='text-gray-800' onClick={() => {
                                        localStorage.removeItem('token')
                                        navigate('/login')
                                    }}>{item.title}</p>
                                ) : (
                                    <>
                                        {item.childrens ? (
                                            <>
                                                {console.log(item)}
                                                <div className={open ? "sidebar-item w-full open" : "sidebar-item w-full"}>
                                                    <div className="sidebar-title w-full flex justify-between ">
                                                        <span>
                                                            {item.icon && <i className={item.icon}></i>}
                                                            {item.title}
                                                        </span>
                                                        <FontAwesomeIcon className=" bi-chevron-down toggle-btn " icon="fa-solid fa-angle-up fa-2xl" onClick={() => setOpen(!open)} size='lg' />
                                                    </div>
                                                    <div className="sidebar-content">
                                                        <ul className='flex flex-col'>
                                                            <li className=' p-1 mt-2  flex justify-between  cursor-pointer'>
                                                                <NavLink end to='/all-shops' className={({ isActive }) => (isActive ? 'text-myBg block ml-2' : 'text-gray-800 block ml-2')}>All Shops</NavLink>
                                                            </li>
                                                            <li className=' p-1 mt-2  flex justify-between  cursor-pointer'>
                                                                <NavLink end to='/add-shop' className={({ isActive }) => (isActive ? 'text-myBg block ml-2' : 'text-gray-800 block ml-2')}>Add Shop</NavLink>
                                                            </li>
                                                            {console.log(item, 'New Items')}
                                                            {item.childrens.map((child, index) => (
                                                                <>
                                                                    {console.log(child, 'New Items')}
                                                                    <li className='font-semibold p-1 mt-2  flex justify-between  cursor-pointer'>
                                                                        <NavLink key={index} end to={{ pathname: child.path }} onClick={loadWindow} state={{ restaurantName: `${child.title}` }} className={({ isActive }) => (isActive ? 'text-myBg block ml-2' : 'text-gray-800 block ml-2')}>{child.title}</NavLink>
                                                                    </li>
                                                                </>
                                                            ))}

                                                            {/* <li key={index} onClick={loadWindow}   className={({ isActive }) => (isActive ? 'text-myBg ' : 'text-gray-800 ')}><span className='mt-2 block ml-4'>{child.title.charAt(0).toUpperCase() + child.title.slice(1)}</span> </li>  */}


                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <NavLink end to={item.path} className={({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}>
                                                {item.title}

                                            </NavLink>
                                        )}

                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}
export default SideBar