import classes from "./Layout.module.css";
import { Navbar } from "../major-components/Navbar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../constants/axiosInstance";
import { HeroMapInput } from "../minor-components/HeroMapInput";
import { useLocation } from "react-router";
import instagramImage from '../../assets/icons/instagram_logo.gif';
import twitterImage from '../../assets/icons/twitter_logo.gif';
import telegramImage from '../../assets/icons/telegram_logo.gif';
import { getSocialLinks } from "../../redux/Actions/SocialLinksAction";
import { useDispatch, useSelector } from "react-redux";
function Layout(props) {

    const dispatch = useDispatch();
    const params = useLocation();
    const [isAuth, setIsAuth] = useState(true);

    const [editHeaderPreview, seteditHeaderFilePreview] = useState('')

    useEffect(() => {
        getHeaderImages();
    }, [])


    const { socialLink } = useSelector(
        (state) => state.socialReducer
    )

    useEffect(() => {
        dispatch(getSocialLinks())
    }, [])

    useEffect(() => {
        const excludedRoutes = ['/sign-up', '/login', '/reset-password', 'accounts', '/confirm-password'];
        const isExcludedRoute = excludedRoutes.some((route) => params.pathname.startsWith(route));

        setIsAuth(!isExcludedRoute);
    }, [params.pathname]);

    const getHeaderImages = async () => {
        await axiosInstance.get('/api/v1/headerimages/getHeaderImages')
            .then((res) => {
                console.log(res.data.data, 'Images Get')
                let images = res.data.data;
                if (images.length != 0) {
                    seteditHeaderFilePreview(res.data.data[0].headerPhotos)
                }

            })
            .catch((err) => {

            })
    }

    return (
        <div >
            {isAuth ?
                <>
                    <Navbar />
                    <HeroMapInput headerImage={editHeaderPreview} />
                </>    
            : null}
            <main className={classes.main}>{props.children}</main>
            <div className="floating-container">
                <div className="floating-button">+</div>
                {Object.keys(socialLink).length > 0 ? (
                    <div className="element-container">
                        {socialLink.instagram !== '' ? 
                            <span className="float-element tooltip-left">
                                {/* <a className='trans' href='https://www.instagram.com/zenpaidispensary/' target='_blank'> */}
                                <a className='trans' href={socialLink.instagram} target='_blank'>
                                    <img src={instagramImage} />
                                </a>
                            </span>
                            : null}
                        {socialLink.twitter !== '' ? 
                            <span className="float-element">
                                {/* <a className='trans' href='https://twitter.com/Zenpai_D' target='_black'> */}
                                <a className='trans' href={socialLink.twitter} target='_black'>
                                    <img src={twitterImage} />
                                </a>
                            </span>
                            : null}
                        {socialLink.telegram !== '' ? 
                            <span className="float-element">
                                {/* <a className='trans' href='https://t.me/ZenpaiSupport' target='_black'> */}
                                <a className='trans' href={socialLink.telegram} target='_black'>
                                    <img src={telegramImage} />
                                </a>
                            </span>
                        : null}
                    </div>
                )
                : null}
            </div>
        </div>
    );
}

export default Layout;
