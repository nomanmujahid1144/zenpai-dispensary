import React, { useEffect , useState } from "react";
import {  useParams } from "react-router-dom";
import { Footer } from "../major-components/Footer";
import  {axiosInstance}  from "../../constants/axiosInstance";
import { baseURL } from "../../constants/baseURL";
import BottomImage from '../../assets/second-hero-section.png'
import { Loader } from "./Loader";


export const BlogDetails = () => {

    const { id } = useParams();
    const [blog, setSingleBlog] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSingleBlog(id);
    }, [id])

    const getSingleBlog =async () => {
        setLoading(true)
        const res = await axiosInstance.get('/api/v1/blog/getblogbyid', {
            params: {
                id : id
            }
        })
        if (res.data.success === true) {
            setLoading(false)
            setSingleBlog(res.data.data)
        }
        else {
            setLoading(false)
        }
    }

  return (
    <>
        {!loading ? (
              <>
        <div style={{backgroundImage : `url(${blog?.blogImage !== '' ? baseURL + blog?.blogImage : BottomImage})` }} className="w-[100%] h-[60vh]  bg-no-repeat bg-center  bg-cover px-28  flex  items-center gap-4">
            <div className='w-auto h-80 rounded flex flex-col justify-end text-center'> 
                {/* <h1 className='text-4xl text-white font-bold '></h1> */}
            </div>
        </div>
        <main className=" pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue ">
                <header className="mb-4 lg:mb-6 not-format">
                    <h1 dangerouslySetInnerHTML={{ __html: blog?.blogHeading !== '' ? blog?.blogHeading : '' }} className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl "></h1>
                </header>
                <p className="lead" dangerouslySetInnerHTML={{ __html: blog?.data !== '' ? blog?.data : '' }}></p>
                </article>
            </div>
        </main>  
        <Footer />
        </>
        ) : (
            <Loader />
        )}
    </>
  );
};
