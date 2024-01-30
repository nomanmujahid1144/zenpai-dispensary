import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import mailDelivery from "../../assets/mail_delivery_.jpg";
import { getDelivery } from "../../redux/Actions/DeliveryAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "../minor-components/Loader";

export const Delivery = () => {

  
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.ProgressBarReducer
  );

  const { data, headings } = useSelector(
      (state) => state.deliveryReducer
  )

  useEffect(() => {
  dispatch(getDelivery());
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {(headings && data) !== '' ? 
            <div className="py-20 text-center">
              <div className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4" dangerouslySetInnerHTML={{ __html: headings !== '' ? headings : 'Delivery Zone' }}></div>
              <div className="w-[100%] h-[60vh]  bg-no-repeat bg-center  bg-cover  flex justify-center  items-center gap-2 my-4">
                {/* <img src={mailDelivery} className='w-[100%] h-[50vh] object-cover' /> */}
                <iframe title='deliveryIframe' src="https://www.google.com/maps/d/embed?mid=1qWcRXfIFT6-5JKMR7WXZUIj6YVC_F8c&ehbc=2E312F" className="w-[70%] h-[60vh]"></iframe>
              </div>

              <div className="lg:px-28 px-5 text-left" dangerouslySetInnerHTML={{ __html: data !== '' ? data : '' }}></div>
            </div>
          :
            <div className="py-20 text-center">
            <div>
              <h1 className="text-3xl  lg:text-4xl font-bold leading-9 text-gray-800">Delivery Zone</h1>
            </div>
            <div className="w-[100%] h-[60vh]  bg-no-repeat bg-center  bg-cover  flex justify-center  items-center gap-2 my-4">
              {/* <img src={mailDelivery} className='w-[100%] h-[50vh] object-cover' /> */}
              <iframe src="https://www.google.com/maps/d/embed?mid=1qWcRXfIFT6-5JKMR7WXZUIj6YVC_F8c&ehbc=2E312F" className="w-[70%] h-[60vh]"></iframe>
            </div>
            <div className="lg:px-28 px-5 text-left">
              <ol class="space-y-1 text-gray-500 list-decimal list-inside">
                <li class="mb-2 text-lg font-bold">
                  <span className="font-normal">Select  your product(s) from our menu selections.</span>
                </li>
                <li class="mb-2 text-lg font-bold">
                  <span className="font-normal">Browse over to your cart, once ready.</span>
                </li>
                <li class="mb-2 text-lg font-bold">
                  <span className="font-normal">Select Check-Out options and confirm order.</span>
                </li>
                <li class="mb-2 text-lg font-bold">
                  <span className="font-normal"> One of our Dispatchers will contact you for payment confirmation and provide ETA.</span>
                </li>
                {/* <p class="mb-2 pt-3 text-xl">Our minimum value for mail orders is <span className="font-bold">$50</span>. There is a <span className="font-bold">$15</span> Delivery Fee on any orders Under <span className="font-bold">$150</span>.</p> */}
                <p class="mb-2 pt-3 text-xl">All local deliveries within our delivery zones have a <span className="font-bold">$10</span> delivery charge for orders Under <span className="font-bold">$50</span>.Our minimum order value for delivery is <span className="font-bold">$30</span>.</p>
                <p class="mb-2 pt-3 text-xl">Our delivery time within our delivery zones are between 1 - 2 hours.</p>
                <p class="mb-2 text-xl">We will inform you if there are any delays or if we will be reaching earlier than given time.</p>
              </ol>
            </div>
            </div>
          }
          <div>
            <Footer />
          </div>
          </>
      ) : (
        <Loader />
      )}
    </>
  );
};

