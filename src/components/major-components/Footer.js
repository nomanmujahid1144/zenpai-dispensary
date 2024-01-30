
import { Link } from "react-router-dom";
import NavLogo from '../../assets/logo.png';
import googlePlay from '../../assets/google.png';
import IOSStore from '../../assets/IOS.png';

export const Footer = () => {

    return (
        <>
            <div className="h-auto bg-[#3A3A3A]">
                <div className="grid lg:grid-cols-3 auto-cols-fr md:grid-cols-1 sm:grid-cols-1 grid-cols-1 py-16  gap-3">
                    <div className='flex flex-col items-center'>
                        <Link to="/">
                            <img className='mb-8 rounded-lg  w-20' src={NavLogo} alt='footer-logo' />
                        </Link>
                        <a target="_black" href="https://play.google.com/apps?pli=1" className="cursor-pointer">
                            <img className='w-56 h-30' src={googlePlay} alt='google-play' />
                        </a>
                        <a target="_black" href="https://www.apple.com/app-store/" className="cursor-pointer">
                            <img className='w-56 h-30' src={IOSStore} alt='IOS-Store' />
                        </a>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2  grid-cols-1 xxs:px-4">
                        <div className='flex  flex-col items-center'>
                            <p className='text-left text-gray-300 w-56 mb-1'>
                                <Link className="cursor-pointer" to='/about-us'>About Us</Link>
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                <Link className="cursor-pointer" to='/delivery'>Delivery</Link>
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                <Link className="cursor-pointer" to='/mail-delivery'>Mail Order Marijuana</Link>
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                <Link className="cursor-pointer" to='/faq'>FAQ's</Link>
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                <Link className="cursor-pointer" to='/blogs'>Blogs</Link>
                            </p>
                            {localStorage.getItem('token') ?
                                null
                                :
                                <>
                                    <p className='text-left text-gray-300 w-56 mb-1'>
                                        <Link to="/sign-up">Sign Up</Link>
                                    </p>
                                    <p className='text-left text-gray-300 w-56 my-1'>
                                        <Link to="/login">Sign In</Link>
                                    </p>
                                </>
                            }
                        </div>
                        <div className='flex flex-col items-center '>
                            <p className='text-left text-gray-300 w-56 mb-1 '>
                                Weed Delivery Toronto
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Downtown Toronto
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery North York
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Willowdale
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Lawrence Park
                            </p>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 xxs:px-4">
                        <div className='flex flex-col items-center'>
                            <p className='text-left text-gray-300 w-56 mb-1'>
                                Weed Delivery Etobicoke
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Scarborough
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery East York
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Vaughan
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Richmond Hill
                            </p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-left text-gray-300 w-56 mb-1'>
                                Weed Delivery Markham
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Mississauga
                            </p>
                            <p className='text-left text-gray-300 w-56 my-1'>
                                Weed Delivery Brampton
                            </p>
                        </div>
                    </div>
                </div>
                <div className='text-gray-300 text-center py-3'>
                    Zenpai Dispensary © 2023
                </div>
                <script src='https://www.gstatic.com/firebase/6.2.0/firebase.js'></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/firebase/9.9.2/firebase-auth.min.js" integrity="sha512-VFdqT83o0epWSKSZOGryhioVcx0sCaPbujRJ76odePTjA/Mqcwwp3Zm5jUYfi7WjRPROpAYmOzXXSEGUAtKviA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/firebase/9.9.2/firebase-app.min.js" integrity="sha512-aCu7Uq/UKhm7gcvqNmT2VcPzNTjRy5cSsyNw1EaBfLvso4CFmqvpm8Pnz+w20lsNv0rjzYwtmNqmghYuDa5k2Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            </div>
        </>
    )
}