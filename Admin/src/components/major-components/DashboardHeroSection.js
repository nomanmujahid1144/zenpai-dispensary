import { DashCard } from "../minor-components/DashCard"
import dashCardOrder from '../../assets/dash-card-order.png'
import dashCardCart from '../../assets/dash-card-cart.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import dashCardPending from '../../assets/dash-card-pending.png'
import dashCardCannabis from '../../assets/dash-card-cannabis.png'
import { TrakingDetails } from "../minor-components/TrackingDetails"
import { Recentorders } from "../minor-components/RecentOrders"
import { TimeLine } from "../minor-components/TimeLine"
import { Table } from "../minor-components/Table"
import io from "socket.io-client";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
import { axiosInstance } from "../../constants/axiosInstance"
import { DashMap } from "../minor-components/DashMap"
import { Modal } from "../minor-components/Modal"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { baseURL } from '../../constants/baseURL';
import ImageHolder from '../../assets/upload.svg'
import { updateProduct } from '../../redux/Actions/ProductActions';
// import { addShopImage } from '../../redux/Actions/AddShopImage';
// import isWindows from "cross-env/src/is-windows"
// const socket = io('http://099c-39-41-165-237.ngrok.io')


const SignupSchema = Yup.object().shape({
    productPhoto: Yup.string().required('Image is required'),
});

const usersColumns = [
    "User Name",
    "User Email",
    "Phone Number"
]
const DashboardHeroSection = (props) => {
    console.log('these are props : ', props)
    const navigate = useNavigate()
    const [filePreview, setFilePreview] = useState(null)
    const [editItem, setEditItem] = useState([])
    const [imgCheck, setImgCheck] = useState(false)




    const token = useSelector(
        (state) => state.ProfileReducer
    );
    const alert = useAlert()
    const dispatch = useDispatch()
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [cardData, setCardData] = useState([])
    const [userData, setUserData] = useState([])
    const [placesArr, setPlacesArr] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [coordinates, setCoordinates] = useState([])
    useEffect(() => {
        if (token) {
            loadUsers()
            getRadius()
            loadDashboardData()
        }

        // socket.on('connection', 'blablabla')
        // socket.emit('join', 'ammar admin')

        // setTimeout(() => {
        //     socket.on('hey', (data) => {
        //         console.log(data, "data received at successfull connection with sockety io server")
        //     })
        // }, 3000)
    }, [token])
    const getRadius = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/admin/getradius', {
                headers: {
                    "Authorization": token
                }
            })
            if (res.data.success) {
                dispatch(selectProgressBarState(false))
                setPlacesArr(res.data.data)
            }
            else {
                dispatch(selectProgressBarState(false))
                alert.show('No Radius Found')
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    const loadDashboardData = async () => {
        try {
            dispatch(selectProgressBarState(true))
            const res = await axiosInstance.get('/api/v1/admin/getdashboarddata', {
                headers: {
                    "Authorization": token
                }
            })
            if (res.data.success) {
                setCardData(res.data.data)
                dispatch(selectProgressBarState(false))
            }
            else {
                dispatch(selectProgressBarState(false))
                alert.show('Not Found')
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const loadUsers = async () => {
        try {
            dispatch(selectProgressBarState(true))
            const res = await axiosInstance.get('/api/v1/user/getallusers', {
                headers: {
                    "Authorization": token
                }
            })
            if (res.data.success) {
                setUserData(res.data.data)
                dispatch(selectProgressBarState(false))
            }
            else {
                dispatch(selectProgressBarState(false))
                alert.show('Not Found')
            }

        }
        catch (e) {

            console.log(e)
        }
    }

    return (
        <>
            {!loading ? (
                <div className="bg-gray-50 z-0">
                    <div className=" mt-24 bg-gray-50 ml-[20%] w-[78%]">
                        <div className="m-0 p-0">
                            <div className="pt-4">
                                <h1 className="text-3xl mx-0 px-0">
                                    Dashboard
                                </h1>
                                <p className="text-xs ml-1">
                                    Dashboard
                                </p>
                            </div>
                            <div className="flex items-center w-full flex-wrap justify-between py-4 px-1">
                                <DashCard bg='bg-red-100' header={'Total Orders'} data={cardData[0]?.totalAllOrders} icon={dashCardOrder} footer={cardData[0]?.last24HoursAllOrders} />
                                <DashCard bg='bg-lime-100' header={'Pending Orders'} data={cardData[1]?.totalPendingOrders} icon={dashCardPending} footer={cardData[1]?.last24HoursPendingOrders} />
                                <DashCard bg='bg-sky-200' header={'Completed Orders'} data={cardData[2]?.totalCompletedOrders} icon={dashCardCart} footer={cardData[2]?.last24HoursCompletedOrders} />
                                <DashCard bg='bg-green-100' header={'Total Products'} data={cardData[3]?.totalAddedProducts} icon={dashCardCannabis} footer={cardData[3]?.last24HoursAddedProducts} />
                            </div>

                            <div className="px-4">
                                {/* <Table /> */}
                                {/* <ActionsTable /> */}
                                {coordinates.length > 0 ? (
                                    <Modal open={isOpen} onClose={() => setIsOpen(false)} >
                                        <DashMap coordinates={coordinates} />
                                    </Modal>
                                ) : null}
                            </div>
                            <div className=' bg-white py-4 px-4 my-4 rounded-lg  shadow-lg divide-y  divide-gray-100'>
                                <div className='h-10 my-0 flex flex-col items-start justify-between mb-4'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Shop Address</h2>
                                    <p className='text-xs'>Details</p>
                                </div>
                                {placesArr.length < 1 ? <h2>No Shop Found</h2> :
                                    <div className="w-full  mx-auto bg-white shadow-lg rounded-sm ">
                                        <div className="py-3 ">
                                            <div className="overflow-x-auto ">
                                                <table className="table-auto w-full ">
                                                    <thead className="text-sm w-full h-14 bg-myBg font-semibold uppercase text-gray-600 ">
                                                        <tr>
                                                            <th key={5} className="p-2 whitespace-nowrap font-semibold text-left">
                                                                Shop Name
                                                            </th>
                                                            <th key={1} className="p-2 whitespace-nowrap font-semibold text-left">
                                                                Address
                                                            </th>
                                                            <th key={6} className="p-2 whitespace-nowrap font-semibold text-left">
                                                                Delivery Charges
                                                            </th>
                                                            <th key={3} className="p-2 whitespace-nowrap font-semibold text-left">
                                                                Map
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm  divide-gray-100">
                                                        {/* {console.log(placesArr)} */}
                                                        {placesArr.map((item, index) => (
                                                            <>
                                                                {console.log(item)}
                                                                {item ? (
                                                                    <tr key={index}>
                                                                        {console.log(item.shopName, " Item Info")}
                                                                        <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                            <p className={`text-left text-md `}> {item.shopName}</p>
                                                                        </td>
                                                                        <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                            <p className={`text-left text-md `}> {item.formattedAddress}</p>
                                                                        </td>
                                                                        <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                            <p className={`text-left text-md `}> ${item.delivery}</p>
                                                                        </td>
                                                                        <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                            <p className={`text-left text-md `}>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setCoordinates(item.geometry.coordinates)
                                                                                        setIsOpen(true)
                                                                                    }}
                                                                                    className='py-2 px-4 bg-myBg text-xs rounded-lg hover:bg-[#efca37]'>
                                                                                    View on map
                                                                                </button>
                                                                            </p>
                                                                        </td>

                                                                    </tr>
                                                                ) : (
                                                                    <>
                                                                        {/* <h2>No Restaurant Found</h2> */}

                                                                    </>
                                                                )}

                                                            </>

                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}

        </>
    )

}
export default DashboardHeroSection