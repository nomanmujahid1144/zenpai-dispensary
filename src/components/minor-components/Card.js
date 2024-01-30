import React, {useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from "./Modal";
import { SingleProductDetails } from "./SingleProductDetails";
import { Link } from "react-router-dom";

export const Card = ({ svg, ...rest }) => {
    const [status , setStatus] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(0)
  let num = 0;

    const handleCart = async (e , action) => {
        if(action == true){
            setStatus(false)
        }else{
            setStatus(true)
        }
      };


    const handleCartProducts = async (e , action) => {
        let quantities = document.querySelectorAll(`[data-value="${e.target.dataset.keyvalue}"]`)
        quantities.forEach((quantity , index) =>{

            if(action === 'plus'){
                console.log(action , 'action')
                num = parseInt(quantity.value)
                num += 1;
                setValue(num)
                let obj = {
                    id : rest.item._id,
                    quantity : num 
                }
                rest.getItem(obj , 'p')
            }else if(action === 'minus'){

                num = parseInt(quantity.value)
                num = num - 1;
                setValue(num)
                let obj = {
                    id : rest.item._id,
                    quantity : num 
                }
                rest.getItem(obj , 'm')
            }
        })
        
      };

    const goToBrandPage =async (brand) => {
        window.location.href = `/brand/${brand}`
    }

    return (
        <>
            {rest.type === 'category' ?
                <Link to={`/brand/${rest.title}`}>
                    <div className="group w-48 border-2 relative flex flex-col shadow-lg rounded ">
                        <div className="flex flex-col py-2 px-4">
                            {/* <p className="mt-1 px-1 text-lg font-medium text-myBg">
                                ${rest.price}
                            </p> */}
                            <h2 className="mt-1 px-1 truncate text-lg font-bold text-gray-900">
                                {rest.title?.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()).substring(0, 12)}
                            </h2> 
                        </div>
                        <div className="aspect-w-1 hover:animate-up flex justify-center w-full aspect-h-1 p-3 overflow-hidden rounded-t  xl:aspect-w-7 xl:aspect-h-8">
                            <img onClick={() => { setIsOpen(true)}} className="h-24 w-24 object-cover cursor-pointer object-center group-hover:opacity-50" src={svg} alt='prod' />
                        </div>
                    </div>
                </Link>
        :<>
            <div className="group w-full border-2 relative flex flex-col shadow-lg rounded ">
                <div className="aspect-w-1 w-full aspect-h-1  overflow-hidden rounded-t bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img onClick={() => { setIsOpen(true)}} className="h-40 w-full object-cover cursor-pointer object-center group-hover:opacity-50" src={svg} alt='prod' />
                </div>
                {!status  ?  
                    <div onClick={handleCart} data-item={rest.item._id} className="">
                    <span className="bg-[#000000]  opacity-[0.67]  m-[4%]  text-white rounded-full absolute top-0 right-0">
                    <FontAwesomeIcon className="w-[1.25rem] h-[1.25rem] flex justify-center" size="sm" icon="fa-solid fa-plus" />
                    </span>
                </div>
                : 
                <div className="custom-number-input m-[4%]  w-28 absolute top-0 right-0">
                    <div className="flex flex-row h-6 w-full border border-[#FFFFFF]-600 rounded-lg relative opacity-[0.67] bg-[#000000] hover:text-[#000000]-700 hover:bg-[#000000]-400 bg-transparent mt-1">
                        <span onClick={value != 0 ? (e) => handleCartProducts(e , 'minus') : (e) => handleCart}  data-keyvalue={rest.value} className={`flex items-center w-full justify-center border-[#FFFFFF]-600 opacity-[0.67] bg-[#000000]  text-white rounded-l-[20%]  h-full   ${value != 0  ? 'cursor-pointer' : 'cursor-not-allowed '} outline-none m-auto text-lg font-thin`}>
                        -
                        </span>
                        <input type="text" data-value={rest.value} id="quantity" readOnly className="quantity focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-gray-600 focus:text-gray-600  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={value}  />
                        <span onClick={(e) => handleCartProducts(e , 'plus')} data-keyvalue={rest.value} className=" flex items-center w-full border-[#FFFFFF]-600  opacity-[0.67] rounded-r-[20%] justify-center bg-[#000000] text-white text-lg hover:text-[#000000]-700 hover:bg-[#000000]-400 h-full  cursor-pointer m-auto  font-thin">+</span>
                    </div>
                </div>
                }
                <div className="flex flex-col py-2 px-4">
                    <h2 className="mt-1 px-1 text-lg font-bold text-gray-900 truncate">
                        {rest.title.substring(0, 12)}
                    </h2>
                    <p className="mt-1 px-1 text-lg font-medium text-myBg">
                        ${rest.price}
                    </p>

                </div>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <SingleProductDetails item={rest.item} modal={setIsOpen} isAdd={true} />
            </Modal>
        </>}
        
        </>
    )
}