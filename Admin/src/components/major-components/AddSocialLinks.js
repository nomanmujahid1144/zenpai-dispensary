import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { addSocialLinks, getSocialLinks } from "../../redux/Actions/SocialLinksAction"
import instagramImage from '../../assets/instagram_logo.gif';
import twitterImage from '../../assets/twitterx.png';
import telegramImage from '../../assets/telegram_logo.gif';


export const AddSocialLinks = () => {


    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const { socialLink } = useSelector(
        (state) => state.socialLinksReducer
    )

    const [credentials, setcredentials] = useState({
        instagram : "",
        twitter: "",
        telegram: ""
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addSocialLinks(credentials, navigate, alert)).then(() => {
            setcredentials({
                instagram : "",
                twitter: "",
                telegram: ""
            })
            dispatch(getSocialLinks())
        });
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        dispatch(getSocialLinks())
    }, [])

    const handleUpdateSocialLinks = () => {
        if (Object.keys(socialLink).length > 0) {
            setcredentials({
                instagram : socialLink.instagram || '',
                twitter: socialLink.twitter || '',
                telegram: socialLink.telegram || ''
            })
        }
    }

    return (
        <>
            <div className="bg-gray-50   z-0">
                {!loading ? (
                    <div className=" mt-24  ml-[20%]  w-[78%]">
                        {console.log(socialLink, 'socialLink')}
                        <div className="py-2 bg-gray-50">
                            <div className=' bg-white rounded-lg  shadow-lg'>
                                <div className='px-5 pt-4 mb-4 flex justify-between'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Add Social Links</h2>
                                    <Link to='/pages'>
                                        <button className='bg-myBg text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="pr-2" />
                                            Back
                                        </button>
                                    </Link>

                                </div>
                                <div className="p-3">
                                    <h2 className='font-semibold py-2 text-gray-800 text-lg'>Social Links</h2>

                                    <div className="grid gap-6 mb-6 grid-cols-3 sm:grid-cols-1">
                                        <div>
                                            <div className="flex justify-between">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
                                            </div>
                                            <input
                                                type="text"
                                                id="instagram"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Add Instagram Link"
                                                name="instagram"
                                                onChange={onChange}
                                                value={credentials.instagram}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
                                            </div>
                                            <input
                                                type="text"
                                                id="twitter"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Add Twitter Link"
                                                name="twitter"
                                                onChange={onChange}
                                                value={credentials.twitter}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram</label>
                                            </div>
                                            <input
                                                type="text"
                                                id="Telegram"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Add Telegram Link"
                                                name="telegram"
                                                onChange={onChange}
                                                value={credentials.telegram}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end p-5">
                                        <button onClick={handleSubmit} className='bg-myBg text-right text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-[#E9D95D]'>
                                            Save
                                        </button>
                                    </div>
                                </div>
                                {Object.keys(socialLink).length > 0 ? (
                                    <div className="flex gap-10 px-10 pb-14">
                                        {socialLink.instagram !== '' ? 
                                            <div className="w-20">
                                                <a className='trans' href={socialLink.instagram} target='_blank'>
                                                    <img src={instagramImage} />
                                                </a>
                                            </div>
                                            : null}
                                        {socialLink.twitter !== '' ? 
                                            <div className="w-20">
                                                <a className='trans' href={socialLink.twitter} target='_blank'>
                                                    <img src={twitterImage} />
                                                </a>
                                            </div>
                                            : null}
                                        {socialLink.telegram !== '' ? 
                                            <div className="w-20">
                                                <a className='trans' href={socialLink.telegram} target='_blank'>
                                                    <img src={telegramImage} />
                                                </a>
                                            </div>
                                        : null}
                                    </div>
                                )
                                : null}
                                <div className="flex justify-start px-10 pb-5">
                                    <button onClick={handleUpdateSocialLinks} className='bg-myBg text-right text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-[#E9D95D]'>
                                        Click to Update 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}

            </div>
        </>
    )
}