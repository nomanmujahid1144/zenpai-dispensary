import cannabisForm from '../../assets/share.png'
import messagesvg from '../../assets/message.svg'
import facebooksvg from '../../assets/facebook.svg'
import twittersvg from '../../assets/twitter.svg'
import { useEffect, useState } from 'react';

import { EarnDollarSvgs } from '../minor-components/EarnDollarSvgs';
 



export const EarnDollars = (props) => {
    console.log('these are props : ', props)
    const status = !props.isAdd ? props.isAdd : true

    useEffect(() => {
        if (!status) {
            // console.log(products)
            // setEditItem(products.filter(
            //     (product) => product._id === global.editId
            // ))
        }
    }, [])
    return (
        <>
            <div className='w-full h-[85vh]'>
                <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-y-auto">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 h-screen">
                            <div className="lg:block md:block sm:hidden hidden sm:h-[70%] lg:h-screen" 
                                style={{backgroundImage: `linear-gradient( to right, rgba(0,0,0,0.2) ,rgba(0, 0, 0, 0.2)) ,url(${cannabisForm})`, backgroundSize: 'cover',backgroundPosition: 'center' }}>
                                <div className='pl-20 p-5 pt-28 flex flex-col justify-center'>
                                    <div className='text-5xl font-semibold text-[#4E4E4E]'>Share</div>
                                    <div className='text-xl font-medium text-[#4E4E4E]'>The<br />Moment</div>
                                    <p className='text-xl mt-5 font-sm text-[#4E4E4E]'>The best moments in life are shared. Send a friend $30 in Eaze credit and get $40 once they get their first delivery.</p>
                                </div>
                            </div>
                            <div className="bg-white flex justify-center items-center">
                                <div className=''>
                                    <button class="bg-transparent self-center hover:bg-[#4E4E4E] text-[#4E4E4E] font-semibold hover:text-white py-2 px-20 border border-[#4E4E4E] hover:border-transparent rounded">
                                        Copy Link
                                    </button>
                                    <div className='mt-10 w-100  flex justify-between'>
                                        <EarnDollarSvgs svg={messagesvg}/>
                                        <EarnDollarSvgs svg={facebooksvg}/>
                                        <EarnDollarSvgs svg={twittersvg}/>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}