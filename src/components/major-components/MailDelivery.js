import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import mailDelivery from "../../assets/mail_delivery_.jpg";

export const MailDelivery = () => {

  return (
    <>
      <div className="py-20 text-center">
        <div>
          <h1 className="text-3xl  lg:text-4xl font-bold leading-9 text-gray-800">MAIL ORDER MARIJUANA | ONLINE DISPENSARY</h1>
        </div>
        <div className="w-[100%] my-3  bg-no-repeat bg-center  bg-cover  flex  items-center gap-2">
          <img src={mailDelivery} className=' object-contain' />
        </div>
        <h2 class="mb-2 text-xl font-semibold text-gray-900">#1 Canadian Online Dispensary – Nationwide Shipping; Convenient, Safe & Discreet Mail Across Canada!</h2>
        <div className="lg:px-28 px-5 text-left">
          <ol class="space-y-1 text-gray-500 list-decimal list-inside">
            <h1 class="mb-2 text-xl font-bold text-gray-900">How It Works!</h1>
            <p class="mb-2">Our minimum value for mail orders is $50. There is a $15 Delivery Fee on any orders Under $150.</p>
            <p class="mb-2">Any mail orders made before 12PM will be delivered on the same day!</p>
            <p class="mb-2">We offer a mail weed delivery service for the rest of Canada that will make sure your 420 needs are covered!</p>
            <p class="mb-2">Our service usually takes 1-2 business days to arrive at its destination, and is safe, fast, and convenient!</p>
            <h2 class="mb-2 text-lg pt-2">STEPS:</h2>
            <li >
              <span >Browse our Menu to select your favorite products.</span>
            </li>
            <li>
              <span >Place your order.</span>
            </li>
            <li>
              <span >Register to verify your age, or log-in if you're already registered.</span>
            </li>
            <li>
              <span >Once an order is placed, we will contact you via email with confirmation and tracking number.</span>
            </li>
          </ol>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

