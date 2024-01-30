import { SlickBlogSlider, SlickSlider } from '../minor-components/SlickSlider'
import { Card } from '../minor-components/Card'
import { baseURL } from '../../constants/baseURL';
import { Link } from 'react-router-dom';

export const SinglDashboardProduct = (props) => {
    console.log('these are props : ', props)

    return (
        <>
        {props.istype === 'categories' ?
            <>
                <SlickSlider className='flex'>
                    {props.products?.map((item , index)=>( 
                        <>  
                            <div key={index} className='px-4'>
                                    <Card 
                                        svg={`${baseURL}${item.categoryPhoto}`} 
                                        title={item.brand}
                                        value={index}
                                        type="category"
                                    /> 
                            </div>
                        </>
                    ))}
                </SlickSlider>
            </>
        :
            <div className='flex'>
                {props.products?.map((item , index)=>( 
                    <>  
                        {item.brand === props.brand ?
                            <div key={index} className='px-4'>
                                <Card 
                                    svg={`${baseURL}${item.productPhoto}`} 
                                    title={item.name} 
                                    desc={item.description} 
                                    price={item.price} 
                                    item={item}
                                    value={index}
                                    getItem={props.handleItem}
                                /> 
                            </div>
                        :null}
                    </>
                ))}
            </div>
        }
        {props.isBlogType ?
            <SlickBlogSlider className='flex'>
                {props.blogs?.map((blog , index)=>( 
                    <div id={index} className="relative p-4">
                        <div className="bg-white  shadow-md border border-gray-200 rounded-3xl max-w-sm mb-5">
                            <a href={`/blog/${blog?._id}`}> <img className="rounded-t-3xl w-full  h-44" src={blog?.blogImage != '' ? baseURL + blog?.blogImage  : `https://flowbite.com/docs/images/blog/image-1.jpg`} alt="" /> </a>
                            <div className="p-5">
                                <a href={`/blog/${blog?._id}`}>
                                    <h5 className="text-textColor font-bold text-2xl tracking-tight mb-2" dangerouslySetInnerHTML={{ __html: blog?.blogHeading != '' ? blog?.blogHeading : '' }}></h5>
                                </a>
                                <p className="font-normal text-textColor mb-3" dangerouslySetInnerHTML={{ __html: blog?.data != '' ? blog?.data.slice(0, 50) + '...' : '' }}></p>
                                <div className="flex justify-center">
                                    <a className="text-white bg-myBg font-medium rounded-full text-sm px-3 py-2 text-center inline-flex items-center" href={`/blog/${blog?._id}`} >
                                        Read more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </SlickBlogSlider>
        : null}
        </>
    )
}