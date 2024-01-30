import { Modal } from "../minor-components/Modal";
import { SingleProductDetails } from "../minor-components/SingleProductDetails";
import React, { useState } from "react";
import { baseURL } from '../../constants/baseURL';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const SingleProductInfo = (props) => {

    const [status, setStatus] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(0)
    let num = 0;

    const handleCart = async (e, action) => {
        if (action == true) {
            setStatus(false)
        } else {
            setStatus(true)
        }
    };


    const handleCartProducts = async (e, action) => {

        let quantities = document.querySelectorAll(`[data-value="${e.target.dataset.keyvalue}"]`)
        console.log(quantities)
        quantities.forEach((quantity, index) => {
            if (action === 'plus') {
                console.log(action, 'action')
                num = parseInt(quantity.value)
                num += 1;
                setValue(num)
                let obj = {
                    id: props.item._id,
                    quantity: num
                }
                console.log(obj)
                props.getItem(obj, 'p')
            } else if (action === 'minus') {
                console.log(action, 'action')

                num = parseInt(quantity.value)
                num = num - 1;
                setValue(num)
                let obj = {
                    id: props.item._id,
                    quantity: num
                }
                console.log(obj)
                props.getItem(obj, 'm')
            }
        })

    };

    return (
        <>
            <div className="group border-2 rounded relative">
                <div className="aspect-w-1 aspect-h-1  overflow-hidden rounded-t bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img onClick={() => { setIsOpen(true) }} src={`${baseURL}${props.item.productPhoto}`} alt="No Img." className="h-40 w-full object-cover object-center cursor-pointer group-hover:opacity-50" />
                </div>
                <div className="mb-2">
                    <h3 className="mt-4 px-3 text-lg font-bold text-gray-900 truncate">{props.item.name}</h3>
                    <p className="mt-1 px-3 text-lg font-medium text-myBg">${props.item.price}</p>
                </div>
                {!status ?
                    <div onClick={handleCart} data-item={props.item._id} className="">
                        <span className="bg-[#000000]  opacity-[0.67]  m-[4%]  text-white rounded-full absolute top-0 right-0">
                            <FontAwesomeIcon className="w-[1.25rem] h-[1.25rem] flex justify-center" size="sm" icon="fa-solid fa-plus" />
                        </span>
                    </div>
                    :
                    <div className="custom-number-input m-[4%]  w-28 absolute top-0 right-0">
                        <div className="flex flex-row h-6 w-full border border-[#FFFFFF]-600 rounded-lg relative opacity-[0.67] bg-[#000000] hover:text-[#000000]-700 hover:bg-[#000000]-400 bg-transparent mt-1">
                            <span onClick={value != 0 ? (e) => handleCartProducts(e, 'minus') : (e) => handleCart} data-keyvalue={props.value} className={`flex items-center w-full justify-center border-[#FFFFFF]-600 opacity-[0.67] bg-[#000000]  text-white rounded-l-[20%]  h-full   ${value != 0 ? 'cursor-pointer' : 'cursor-not-allowed '} outline-none m-auto text-lg font-thin`}>
                                -
                            </span>
                            <input type="text" data-value={props.value} id="quantity" readOnly className="quantity focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-gray-600 focus:text-gray-600  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={value} />
                            <span onClick={(e) => handleCartProducts(e, 'plus')} data-keyvalue={props.value} className=" flex items-center w-full border-[#FFFFFF]-600  opacity-[0.67] rounded-r-[20%] justify-center bg-[#000000] text-white text-lg hover:text-[#000000]-700 hover:bg-[#000000]-400 h-full  cursor-pointer m-auto  font-thin">+</span>
                        </div>
                    </div>
                }
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} >
                <SingleProductDetails item={props.item} modal={setIsOpen} isAdd={true} />
            </Modal>
        </>
    )
}