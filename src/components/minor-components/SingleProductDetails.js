
import { baseURL } from '../../constants/baseURL';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosInstance } from '../../constants/axiosInstance';
import { Loader } from './Loader'
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert'
export const SingleProductDetails = (props) => {

    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState(props.item.price)
    const [selectedProductName, setSelectedProductName] = useState('')
    const alert = useAlert();
    const navigate = useNavigate();


    const addToCart = async (item, qty, price, selectedProductName) => {

        let extras = [];

        if (price && selectedProductName !== '') {
            let obj = {
                productName: selectedProductName,
                cost: price,
                quantity: 1
            };
            extras.push(obj);
        }
        const details = {
            productId: item,
            quantity: qty,
            extras: extras
        }

        if (localStorage.getItem('token') == null) {
            alert.show("Sign in Your Account first")
            navigate('/login')
        } else {
            axiosInstance.post('/api/v1/order/addtocart', details, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                }
            }).then((res) => {
                localStorage.setItem('totalCart', res.data.data.details.length)
                alert.show("Product Added to Cart")
            }).catch((err) => {
                alert.show("Something went Wrong")
            })
        }
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
        var index = e.nativeEvent.target.selectedIndex;
        setSelectedProductName(e.nativeEvent.target[index].text)
    }

    return (
        <>
            {!loading ?
                <div className='w-full h-[85vh] flex text-[#4A4A4A]'>
                    <div className='w-full  grid lg:grid-cols-2  md:grid-cols-2 sm:grid-col-1 overflow-x-auto'>
                        <div className="w-12/12">
                            <div style={{ scrollbarWidth: 'thin' }} className=" h-full mx-auto overflow-hidden">
                                <div className="w-full shadow-[0px_3px_12px_rgba(0,0,0,0.1)] py-2">
                                    <div className="w-full lg:w-full  text-[#4E4E4E] text-md font-semibold md:w-full bg-white rounded-lg text-start pl-2">{props.item.name}</div>
                                </div>
                                <div className="h-[100%] w-full p-4 bg-[#E9DCB0]">
                                    <div>
                                        <h1 className="text-xl font-medium">{props.item.name}</h1>
                                        <p className="text-sm font-medium mt-2">{props.item.type}</p>
                                        <p className="text-sm mt-3">
                                            {props.item.description}
                                        </p>
                                    </div>
                                    <div className="my-4">
                                        <h1 className="text-xl font-medium">Effects</h1>
                                        <p className="text-sm font-medium mt-1">Uplifted</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.uplifted}%` }}> {props.item.effects.uplifted}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">Euphoric</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.euphoric}%` }}> {props.item.effects.euphoric}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">Energetic</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.energetic}%` }}> {props.item.effects.energetic}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">Creative</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.creative}%` }}> {props.item.effects.creative}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">focused</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.focused}%` }}> {props.item.effects.focused}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">THC Level</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.thc}%` }}> {props.item.effects.thc}%</div>
                                        </div>
                                        <p className="text-sm font-medium mt-1">CBD Level</p>
                                        <div class="w-full bg-gray-200 rounded-full mt-2 ">
                                            <div class="bg-[#E36666] text-xs h-2.7 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${props.item.effects.cbd}%` }}> {props.item.effects.cbd}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-12/12 p-2 ">
                            <div className="mt-8 border-[0.5px] h-56 rounded border-[#707070]">
                                <img alt="No Img." className="w-full h-56 object-cover object-center group-hover:opacity-50" src={`${baseURL}${props.item.productPhoto}`} />
                            </div>
                            {props.item.extras.length > 0 ?
                                <>
                                    <select id="selectOption" onChange={(e) => handlePrice(e)} class="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option hidden>Select Option</option>
                                        {props.item.extras.map((extra, index) => (
                                            <option key={index} data-productName={eval(`extra.extras${index + 1}?.productName`)} value={eval(`extra.extras${index + 1}?.cost`)}>{eval(`extra.extras${index + 1}?.productName`)} - ( ${eval(`extra.extras${index + 1}?.cost`)} ) </option>
                                        ))}
                                    </select>
                                </>
                                : null}
                            <div className="w-full flex text-[#4E4E4E] my-5">
                                <button onClick={() => addToCart(props.item._id, 1, price, selectedProductName)} className="w-full rounded px-2 py-2 bg-[#E9C95D] flex justify-between">
                                    <FontAwesomeIcon className="w-[1.25rem] h-[1.25rem]" size="sm" icon="fa-solid fa-cart-shopping" />
                                    Add to Cart
                                    <p>${price}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                : (
                    <Loader />
                )}

        </>
    )
}