import React , { useEffect }from "react";
import { Footer } from "./Footer";
import { useDispatch , useSelector } from "react-redux";
import { baseURL } from "../../constants/baseURL";
import { Loader } from "../minor-components/Loader";
import { getBlogs } from "../../redux/Actions/BlogsActions";

export const Blogs = () => {
    const dispatch = useDispatch()

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const { blogs } = useSelector(
        (state) => state.blogReducer
    )

    useEffect(() => {
        dispatch(getBlogs());
    }, [])

    return (
        <>
        {!loading ? (
            <>
            <section className="relative py-20 overflow-hidden">
                <img className="absolute top-0 right-0 xl:mt-10 -mr-24 lg:-mr-0" src="saturn-assets/images/blog/star-circle-right.svg" alt="" />
                <img className="hidden sm:block absolute bottom-0 left-0 -mb-48 lg:mb-0" src="saturn-assets/images/blog/blue-light-left.png" alt="" />
                <div className="relative container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto mb-15 text-center">
                        <div className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4" >Blogs</div>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {blogs?.map((blog, index) => (
                            <div id={index} className="max-w-lg relative">
                                <div className="bg-white  shadow-md border border-gray-200 rounded-3xl max-w-sm">
                                    <a href={`/blog/${blog?._id}`}> <img className="rounded-t-3xl w-full  h-44" src={blog?.blogImage != '' ? baseURL + blog?.blogImage  : `https://flowbite.com/docs/images/blog/image-1.jpg`} alt="" /> </a>
                                    <div className="p-5">
                                        <a href={`/blog/${blog?._id}`}>
                                            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2" dangerouslySetInnerHTML={{ __html: blog?.blogHeading != '' ? blog?.blogHeading : '' }}></h5>
                                        </a>
                                        <p className="font-normal text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: blog?.data != '' ? blog?.data.slice(0, 50) + '...' : '' }}></p>
                                        <div className="flex justify-center">
                                            <a className="text-white bg-myBg font-medium rounded-full text-sm px-3 py-2 text-center inline-flex items-center" href={`/blog/${blog?._id}`} >
                                                Read more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}  

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
        ) : (
            <Loader />
        )}
        </>
    );
};

