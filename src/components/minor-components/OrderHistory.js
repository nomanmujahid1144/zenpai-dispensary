import cannabisForm from '../../assets/share.png'
import messagesvg from '../../assets/message.svg'
import facebooksvg from '../../assets/facebook.svg'
import twittersvg from '../../assets/twitter.svg'
import { useEffect, useState } from 'react';

import { axiosInstance } from '../../constants/axiosInstance';
export const OrderHistory = (props) => {
    console.log('these are props : ', props)

    const status = !props.isAdd ? props.isAdd : true
    const [orders  , setOrders] = useState([])

    useEffect(() => {
        if (!status) {
            
        }
    }, [status])


    return (
        <>
            <div className='w-full h-[85vh]'>
            <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-auto">

                    <div className="w-full shadow-[0px_3px_12px_rgba(0,0,0,0.1)] py-2">
                        <div className="w-full lg:w-full  text-[#4E4E4E] text-2xl font-semibold md:w-full bg-white rounded-lg text-center">Order History</div>
                    </div>
                    {props.isOrders.map((order , index) => (
                        <div key={index} className="w-full mt-5">
                            <div class="m-5 px-4 py-2 shadow-md rounded-lg">
                                <div className='flex justify-between'>
                                    <div>Order Id : {order.orderid}</div>
                                    <div>Price : ${order.totalPrice}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>Date / Time: {order.date} at {order.time}</div>
                                    <div className='text-myBg'><a href={`/order/${order._id}`}>Details</a></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}