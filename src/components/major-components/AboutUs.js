import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import aboutUsImage from "../../assets/about_Us_Background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAboutUs } from "../../redux/Actions/AboutusAction";
import { Loader } from "../minor-components/Loader";

export const AboutUs = () => {

    const dispatch = useDispatch();

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const { data, headings } = useSelector(
        (state) => state.aboutusReducer
    )

    useEffect(() => {
        dispatch(getAboutUs()); 
    }, []);


    return (
        <>
            {!loading ? (
                <>
                    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 text-center">
                        {headings !== '' ?
                            <div className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4" dangerouslySetInnerHTML={{ __html: headings !== '' ? headings : 'About Us' }}></div>
                        :
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Hi There! Welcome to your one stop Otaku Cannabis Dispensary. Delivering all around GTA and Canada-Wide Mail Orders!</h1>
                            </div>
                        }
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            {data !== '' ?
                                <div className="w-full lg:w-6/12 flex flex-col justify-center">
                                    <div className="font-normal text-base leading-6 text-gray-600" dangerouslySetInnerHTML={{ __html: data !== '' ? data : '' }}></div>
                                </div>
                            :
                                <div className="w-full lg:w-6/12 flex flex-col justify-center">
                                    <p className="font-normal text-base leading-6 text-gray-600 ">Francis Buchanan, the founder of Zenpai Dispensary has been a huge Cannabis Connoisseur since his teenage years. Also as a passionate artist, cannabis has helped him vision vast freedom of capabilities to bring on to a blank canvas. His love of Japanese Animation "Anime" is on par with his love for cannabis! Francis established an Otaku themed Cannabis Dispensary for Anime and Cannabis lovers alike!
                                        We believe  life is better with cannabis. We believe that cannabis should be shared. We believe that the intentions and efforts that go into the cultivation, extraction, manufacturing, and sale of cannabis ultimately affect the experience of the person smoking or consuming it. We believe that a professional cannabis dispensary is not just good for the health of its members but for the community in which it serves.
                                    </p>
                                </div>
                            }
                            <div className="w-full lg:w-6/12 ">
                                <img className="w-full h-96 object-cover" src={aboutUsImage} alt="A group of People" />
                            </div>
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

