import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import faq from "../../assets/Payment_ImageHeader.jpg";
import { axiosInstance } from "../../constants/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { Loader } from "../minor-components/Loader";

export const FAQPage = () => {

  const [loading, setLoading] = useState(false)
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getFAQS();
  }, []);


  const getFAQS = async () => {
    setLoading(true)
    await axiosInstance.get('/api/v1/faq/getfaqs')
      .then((res) => {
        let aboutUs = res.data.data;
        if (aboutUs.length !== 0) {
          setFaqs(aboutUs[0].faqs)
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }


  return (
    <>
      {!loading ? (
        <>
          <div className="py-20 text-center">
            <div className="w-[100%] my-3  bg-no-repeat bg-center  bg-cover  flex  items-center gap-2">
              <img src={faq} className=' object-contain' />
            </div>
            <div className="p-3">
                <section className="bg-white">
                  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                  {/* {faq?.length !== 0 ? 
                    <>
                      <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Frequently asked questions
                      </h2>
                      <div className=" pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700">
                        <div>
                          {faqs.map((faq, index) => (
                            <div className="mb-10">
                              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                <svg
                                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {faq.Question}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                {faq.Answer}
                              </p>
                            </div>
                          ))}

                        </div>
                      </div>
                    </>
                  :
                    <div className="lg:px-28 px-5 text-left">
                      <h1 className="text-3xl  lg:text-4xl font-bold mb-3 leading-9 text-gray-800">PAYMENTS</h1>
                      <h2 class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">We accept Cash or Interac e-Transfers</h2>
                      <h2 class="mb-2 ml-5 lg:text-lg sm:font-normal"> - C.O.D (Cash on Delivery)</h2>
                      <h2 class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 "> Please be advise, our delivery drivers have no cash on hand to provide any change.</h2>
                      <h2 class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">- Interac e-Transfers to - zenpaidispensary@gmail.com</h2>
                      <h2 class="mb-2 ml-5 lg:text-lg sm:font-normal ">To make an Interac e-transfer payment, please follow guidelines below.</h2>
                      <ol class="space-y-1 text-gray-500 list-decimal list-inside ">
                        <li>
                          <span class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">Select your prefered Bank and browse over to interac e-transfer category</span>
                        </li>
                        <li>
                          <span class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">Fill in the fields with given information below:</span>
                          <ul>
                            <li class="mb-2 ml-5 text-lg">- Reciever Name: Zenpai</li>
                            <li class="mb-2 ml-5 text-lg">- Email : zenpaidispensary@gmail.com</li>
                            <li class="mb-2 ml-5 text-lg">- On a personal message field. ONLY type your address which was used during checkout.</li>
                            <li class="mb-2 ml-5 text-lg">- Question - online (no caps)</li>
                            <li class="mb-2 ml-5 text-lg">- Answer - delivery (no caps)</li>
                            <li class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">
                              Please <span className=" font-semibold text-xl">DO NOT</span> inlcude any other messages.
                            </li>
                          </ul>
                        </li>
                        <h1 className="text-3xl lg:text-4xl font-bold py-5 leading-9 text-gray-800">DELIVERY</h1>
                        <p class="mb-2">All local deliveries within our delivery zones have a $10 delivery charge for orders Under $100.</p>
                        <p class="mb-2">Our minimum order value for delivery is $50+.</p>
                        <p class="mb-2">Our delivery time within our delivery zones are between 1 - 2 hours. We will inform you if there are any delays or if we will be reaching earlier than given time.</p>
                        <h1 className="text-3xl lg:text-4xl font-bold py-5 leading-9 text-gray-800">Mail Orders (Canada Wide Delivery Only)</h1>
                        <p class="mb-2">Our minimum value for mail orders is $50. There is a $15 Delivery Fee on any orders Under $150.</p>
                        <p class="mb-2">Any mail orders made before 12PM will be delivered on the same day!</p>
                      </ol>
                    </div>
                  } */}
                  <div className="lg:px-28 px-5 text-left">
                      <h1 className="text-3xl  lg:text-4xl font-bold mb-3 leading-9 text-gray-800">PAYMENTS</h1>
                      <h2 class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">We accept Cash or Interac e-Transfers</h2>
                      <h2 class="mb-2 ml-5 lg:text-lg sm:font-normal"> - C.O.D (Cash on Delivery)</h2>
                      <h2 class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 "> Please be advise, our delivery drivers have no cash on hand to provide any change.</h2>
                      <h2 class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">- Interac e-Transfers to - zenpai6ix@gmail.com</h2>
                      <h2 class="mb-2 ml-5 lg:text-lg sm:font-normal ">To make an Interac e-transfer payment, please follow guidelines below.</h2>
                      <ol class="space-y-1 text-gray-500 list-decimal list-inside ">
                        <li>
                          <span class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">Select your prefered Bank and browse over to interac e-transfer category</span>
                        </li>
                        <li>
                          <span class="mb-2 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">Fill in the fields with given information below:</span>
                          <ul>
                            <li class="mb-2 ml-5 text-lg">- Reciever Name: Zenpai</li>
                            <li class="mb-2 ml-5 text-lg">- Email : zenpai6ix@gmail.com</li>
                            <li class="mb-2 ml-5 text-lg">- On a personal message field. ONLY type your address which was used during checkout.</li>
                            <li class="mb-2 ml-5 text-lg">- Question - online <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">(no caps)</span></li>
                            <li class="mb-2 ml-5 text-lg">- Answer - delivery <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">(no caps)</span></li>
                            <li class="mb-2 ml-5 lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900 ">
                              Please <span className=" font-semibold text-xl">DO NOT</span> inlcude any other messages.
                            </li>
                          </ul>
                        </li>
                        <h1 className="text-3xl lg:text-4xl font-bold py-5 leading-9 text-gray-800">DELIVERY</h1>
                        <p class="mb-2 ml-5 text-lg">All local deliveries within our delivery zones have a <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">$10 delivery</span> charge for orders <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">Under $50</span>.</p>
                        <p class="mb-2 ml-5 text-lg">Our minimum order value for delivery is <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">$30</span>.</p>
                        <p class="mb-2 ml-5 text-lg">Our delivery time within our delivery zones are between 1 - 2 hours. We will inform you if there are any delays or if we will be reaching earlier than given time.</p>
                        <h1 className="text-3xl lg:text-4xl font-bold py-5 leading-9 text-gray-800">Mail Orders (Canada Wide Delivery Only)</h1>
                        <p class="mb-2 ml-5 text-lg">Our minimum value for mail orders is <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">$50</span>. There is a <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">$15 Delivery Fee</span> on any orders Under <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">$150</span>.</p>
                        <p class="mb-2 ml-5 text-lg">Any mail orders made before <span className="lg:text-xl sm:text-lg lg:font-semibold sm:font-normal text-gray-900">12PM</span> will be delivered on the same day!</p>
                      </ol>
                    </div>
                </div>
              </section>
            </div>
          </div>
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

