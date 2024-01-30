import cannabisForm from '../../assets/share.png'
import messagesvg from '../../assets/message.svg'
import facebooksvg from '../../assets/facebook.svg'
import twittersvg from '../../assets/twitter.svg'
import { useEffect, useState } from 'react';

import { EarnDollarSvgs } from '../minor-components/EarnDollarSvgs';
 



export const Help = (props) => {
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
            <div className='w-full h-[85vh] '>
                <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-hidden">
                    <div className="w-full shadow-[0px_3px_12px_rgba(0,0,0,0.1)] py-2">
                        <div className="w-full lg:w-full  text-[#4E4E4E] text-2xl font-semibold md:w-full bg-white rounded-lg text-center">Help Center</div>
                    </div>
                    <div className="w-full mt-16 ml-4">
                        <div className="w-full lg:w-full  text-[#4E4E4E] text-xl font-semibold md:w-full bg-white rounded-lg">How can we Help?</div>
                    </div>
                    <div className="w-full mt-5">
                        <div class="w-full lg:w-100 px-4 py-2">
                            <details class="mb-4 shadow-md rounded">
                                <summary class="font-semibold  bg-white rounded-md py-2 px-4">
                                    How Long is this site live?
                                </summary>
                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}