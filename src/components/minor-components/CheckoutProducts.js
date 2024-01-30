import React, { useState } from "react";
import { useEffect } from "react";
import { baseURL } from '../../constants/baseURL';


export const CheckoutProducts = ({ ...product }) => {
    console.log(product.cartExtras.forEach((product) => console.log(product)), ":products")

    const [status, setStatus] = useState(false);
    const [total, setSubTotal] = useState(0)
    let num = 0;
    // let total = 0;


    useEffect(() => {
        let tot = 0;
        product.cartExtras.forEach((extra, index) => {
            tot += parseInt(extra.cost);
        })
        setSubTotal(tot);
    }, [])


    const handleCart = async (e, action) => {
        if (action == true) {
            setStatus(false)
        } else {
            setStatus(true)
        }
    };

    const handleCartProducts = async (e, action) => {
        let quantities = document.querySelectorAll(`[data-value="${e.target.dataset.keyvalue}"]`)
        quantities.forEach((quantity, index) => {
            if (action === 'plus') {
                num = parseInt(quantity.value)
                num += 1;
                quantity.value = num
                let obj = {
                    id: product.cartProductId,
                    quantity: num
                }
                product.getItem(obj, 'p')

            } else if (action === 'minus') {
                num = parseInt(quantity.value)
                num = num - 1;
                quantity.value = num
                let obj = {
                    id: product.cartProductId,
                    quantity: num
                }
                product.getItem(obj, 'm')
            }
        })

    };

    const handleCartProductsExtras = async (e, action, extraProductName, extraProductCost) => {
        let quantities = document.querySelectorAll(`[data-value="${e.target.dataset.keyvalue}"]`)
        quantities.forEach((quantity, index) => {
            console.log(quantity, 'quantities')
            console.log(product.cartProductId, 'product Id')
            if (action === 'plus') {
                num = parseInt(quantity.value)
                num += 1;
                quantity.value = num
                console.log(extraProductName, 'extraProductName')
                console.log(extraProductCost, 'extraProductCost')
                const obj = {
                    productId: product.cartProductId,
                    quantity: 1,
                    extras: [{
                        productName: extraProductName,
                        cost: extraProductCost,
                        quantity: 1
                    }]
                }
                product.getExtraItem(obj, 'p')

            } else if (action === 'minus') {
                num = parseInt(quantity.value)
                num = num - 1;
                quantity.value = num
                const obj = {
                    productId: product.cartProductId,
                    quantity: 1,
                    extras: [{
                        productName: extraProductName,
                        cost: extraProductCost,
                        quantity: 1
                    }]
                }
                product.getExtraItem(obj, 'm')
            }
        })

    };


    return (
        <>
            {product.cartProductQuantity != 0 || product.cartExtras.length != 0 ? (
                <>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
                        <div className="flex flex-col rounded-lg bg-white sm:flex-row relative">
                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${baseURL}${product.cartProductImage}`} alt="" />
                            {product.cartProductQuantity != 0 ? (
                                <>
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">{product.cartProductName} - {product.cartProductCategory}</span>
                                        <span className="float-right text-gray-400">${product.cartProductPrice} x {product.cartProductQuantity}</span>
                                        <p className="text-lg font-bold">${product.cartProductPrice * product.cartProductQuantity}</p>
                                    </div>
                                    <div className="flex w-full flex-col px-4 py-4 ">
                                        <div className="custom-number-input m-[4%]  w-28 absolute top-0 right-0">
                                            <div className="flex flex-row h-6 w-full border border-[#FFFFFF]-600 rounded-lg relative opacity-[0.67] bg-[#000000] hover:text-[#000000]-700 hover:bg-[#000000]-400 bg-transparent mt-1">
                                                <span onClick={product.cartProductQuantity != 0 ? (e) => handleCartProducts(e, 'minus') : (e) => handleCart} data-keyvalue={product.cartProductQuantity} className={`flex items-center w-full justify-center border-[#FFFFFF]-600 opacity-[0.67] bg-[#000000]  text-white rounded-l-[20%]  h-full   ${product.cartProductQuantity != 0 ? 'cursor-pointer' : 'cursor-not-allowed '} outline-none m-auto text-lg font-thin`}>
                                                    -
                                                </span>
                                                <input type="text" data-value={product.cartProductQuantity} id="quantity" readOnly className="quantity focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-gray-600 focus:text-gray-600  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={product.cartProductQuantity} />
                                                <span onClick={(e) => handleCartProducts(e, 'plus')} data-keyvalue={product.cartProductQuantity} className=" flex items-center w-full border-[#FFFFFF]-600  opacity-[0.67] rounded-r-[20%] justify-center bg-[#000000] text-white text-lg hover:text-[#000000]-700 hover:bg-[#000000]-400 h-full  cursor-pointer m-auto  font-thin">+</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="self-center">
                                        {product.cartExtras.map((extra, index) => (
                                            <div className="w-100 grid grid-cols-6 md:grid-cols-6 items-center">
                                                <div className="flex col-span-4 gap-3">
                                                    <span key={index} className="float-right text-gray-400">{index + 1})</span>
                                                    <span key={index} className="float-right text-gray-400">{extra.productName}</span>
                                                    <span key={index} className="float-right text-gray-400">${extra.cost} x {extra.quantity}  =
                                                        <span key={index} className="text-lg font-bold text-black"> ${extra.cost * extra.quantity}</span>
                                                    </span>
                                                </div>
                                                <div className="col-span-1 custom-number-input m-[4%]  w-28">
                                                    <div className="flex flex-row h-6 w-full border border-[#FFFFFF]-600 rounded-lg relative opacity-[0.67] bg-[#000000] hover:text-[#000000]-700 hover:bg-[#000000]-400 bg-transparent mt-1">
                                                        <span onClick={extra.quantity != 0 ? (e) => handleCartProductsExtras(e, 'minus', extra.productName, extra.cost) : (e) => handleCart} data-keyvalue={extra.quantity} className={`flex items-center w-full justify-center border-[#FFFFFF]-600 opacity-[0.67] bg-[#000000]  text-white rounded-l-[20%]  h-full   ${extra.quantity != 0 ? 'cursor-pointer' : 'cursor-not-allowed '} outline-none m-auto text-lg font-thin`}>
                                                            -
                                                        </span>
                                                        <input type="text" data-value={extra.quantity} id="quantity" readOnly className="quantity focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-gray-600 focus:text-gray-600  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={extra.quantity} />
                                                        <span onClick={(e) => handleCartProductsExtras(e, 'plus', extra.productName, extra.cost)} data-keyvalue={extra.quantity} className=" flex items-center w-full border-[#FFFFFF]-600  opacity-[0.67] rounded-r-[20%] justify-center bg-[#000000] text-white text-lg hover:text-[#000000]-700 hover:bg-[#000000]-400 h-full  cursor-pointer m-auto  font-thin">+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </>
                            )}

                        </div>
                        <div>
                            {product.cartProductQuantity != 0 ? (
                                <>
                                    <div className="self-center">
                                        {product.cartExtras.map((extra, index) => (
                                            <div className="w-100 grid grid-cols-6 md:grid-cols-6 items-center">
                                                <div className="flex col-span-4 gap-3">
                                                    <span key={index} className="float-right text-gray-400">{index + 1})</span>
                                                    <span key={index} className="float-right text-gray-400">{extra.productName}</span>
                                                    <span key={index} className="float-right text-gray-400">${extra.cost} x {extra.quantity}  =
                                                        <span key={index} className="text-lg font-bold text-black"> ${extra.cost * extra.quantity}</span>
                                                    </span>
                                                </div>
                                                <div className="col-span-1 custom-number-input m-[4%]  w-28">
                                                    <div className="flex flex-row h-6 w-full border border-[#FFFFFF]-600 rounded-lg relative opacity-[0.67] bg-[#000000] hover:text-[#000000]-700 hover:bg-[#000000]-400 bg-transparent mt-1">
                                                        <span onClick={extra.quantity != 0 ? (e) => handleCartProductsExtras(e, 'minus', extra.productName, extra.cost) : (e) => handleCart} data-keyvalue={extra.quantity} className={`flex items-center w-full justify-center border-[#FFFFFF]-600 opacity-[0.67] bg-[#000000]  text-white rounded-l-[20%]  h-full   ${extra.quantity != 0 ? 'cursor-pointer' : 'cursor-not-allowed '} outline-none m-auto text-lg font-thin`}>
                                                            -
                                                        </span>
                                                        <input type="text" data-value={extra.quantity} id="quantity" readOnly className="quantity focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-gray-600 focus:text-gray-600  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={extra.quantity} />
                                                        <span onClick={(e) => handleCartProductsExtras(e, 'plus', extra.productName, extra.cost)} data-keyvalue={extra.quantity} className=" flex items-center w-full border-[#FFFFFF]-600  opacity-[0.67] rounded-r-[20%] justify-center bg-[#000000] text-white text-lg hover:text-[#000000]-700 hover:bg-[#000000]-400 h-full  cursor-pointer m-auto  font-thin">+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                        </div>
                    </div>
                </>
            ) : (<></>)}

        </>
    )
}