import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo  } from "react"
import { axiosInstance } from "../../constants/axiosInstance"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { baseURL } from "../../constants/baseURL"
import { addBlog, deleteBlog, getBlogs } from "../../redux/Actions/BlogsActions"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const AddBlogs = () => {

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, getData] = useState('');

    const [aboutData, setaboutData] = useState('');
    const [blogHeading, setBlogHeading] = useState('');
    const [fileHeaderPreview, setHeaderFilePreview] = useState(null)
    const [headerImage, setHeaderFileImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)


    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axiosInstance.post(`${baseURL}/api/v1/blog/addblogimg`, body)
                            .then((res) => {
                                resolve({default : `${res?.data?.url}`})
                            }).catch((err) => {
                                reject(err)
                            })
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );
    const { blogs } = useSelector(
        (state) => state.blogReducer
    );

    useEffect(() => {
        dispatch(getBlogs())
    }, [isOpen]);


    const handleBlogHeadingChange = (event, editor) => {
        const data = editor?.getData();
        setBlogHeading(data)
    };

    const handleEditorChange = (event, editor) => {
        const data = editor?.getData();
        setaboutData(data)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(aboutData, blogHeading, headerImage)
        var formData = new FormData();
        formData.append('blogImage', headerImage)
        let values = {};
        values.data = aboutData;
        values.blogHeading = blogHeading;
        dispatch(addBlog(values, formData, navigate, alert, isOpen, setIsOpen))
        setHeaderFilePreview(null)
        setBlogHeading('')
        setaboutData('')
    }

    const handleDeleteBlog = async (id) => {
        dispatch(deleteBlog(id, navigate, alert , isOpen , setIsOpen))
    }

    return (
        <>
            <div className="bg-gray-50   z-0">
                {!loading ? (
                    <div className=" mt-24  ml-[20%]  w-[78%]">
                        <div className="py-2 bg-gray-50">
                            <div className=' bg-white rounded-lg  shadow-lg'>
                                <div className='px-5 pt-4 mb-4 flex justify-between'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Blogs</h2>
                                    <Link to='/pages'>
                                        <button className='bg-myBg text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="pr-2" />
                                            Back
                                        </button>
                                    </Link>

                                </div>
                                <div className="p-3">
                                    <h2 className='font-semibold py-2 text-gray-800 text-lg'>Blog Heading</h2>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={blogHeading}
                                        config={{
                                            toolbar: ['heading', '|', 'bold', 'italic']
                                        }}
                                        onChange={handleBlogHeadingChange}
                                    />
                                    <h2 className='font-semibold py-2 text-gray-800 text-lg'>Blog Image</h2>
                                    <div style={{ backgroundImage: `url(${fileHeaderPreview ? fileHeaderPreview : null})` }} className="w-[30%] h-64 rounded-lg bg-no-repeat  bg-cover flex flex-col justify-center items-center" >
                                        <label className="w-[100%] h-96 cursor-pointer border-2 rounded-lg flex justify-center">
                                            {!fileHeaderPreview  ? <h3 className="self-center">Click to Upload Blog Image</h3> : null}
                                            <input className='hidden' id="upload" name="headerimage" type="file" accept="image/*"
                                                onChange={(event) => {
                                                    setHeaderFilePreview(URL.createObjectURL(event.target.files[0]))
                                                    setHeaderFileImage(event.target.files[0])
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <h2 className='font-semibold py-2 text-gray-800 text-lg'>Blog Data</h2>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data}
                                        config={{
                                            extraPlugins : [uploadPlugin],
                                            toolbar: ['heading', '|', 'bold', 'italic', '|', 'table', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' , '|' ,'imageUpload' , 'insertTable' ],
                                            heading: {
                                                options: [
                                                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                                                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                                                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                                                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                                                ]
                                            }
                                        }}
                                        onReady={editor => {
                                            editor.editing.view.change((writer) => {
                                                writer.setStyle(
                                                    "height",
                                                    "200px",
                                                    editor.editing.view.document.getRoot()
                                                );
                                            });
                                        }}
                                        onChange={handleEditorChange}
                                    />
                                </div>
                                <div className="flex justify-end p-5">
                                    <button onClick={handleSubmit} className='bg-myBg text-right text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-[#E9D95D]'>
                                        Save
                                    </button>
                                </div>
                            </div>
                            {console.log(blogs, 'Blogs')}
                            {blogs.length != 0 ? <>
                                <div className=' bg-white rounded-lg  shadow-lg my-5'>
                                    <div className='px-5 pt-4 mb-11 flex justify-between '>
                                        <h2 className='font-semibold text-gray-800 text-lg'> All Blogs</h2>
                                    </div>
                                    <div className="max-w-5xl mx-auto">
                                        <div className="grid grid-cols-3 gap-3">
                                            {blogs.map((blog, index) => (
                                                <div id={index} className="max-w-lg relative mx-auto">
                                                    <div className="bg-white  shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                                                        <a href={`/pages/blog/${blog?._id}`}> <img className="rounded-t-lg w-full  h-44" src={blog?.blogImage != '' ? baseURL + blog?.blogImage  : `https://flowbite.com/docs/images/blog/image-1.jpg`} alt="" /> </a>
                                                        <div className="p-5">
                                                            <a href={`/pages/blog/${blog?._id}`}>
                                                                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2" dangerouslySetInnerHTML={{ __html: blog?.blogHeading != '' ? blog?.blogHeading : '' }}></h5>
                                                            </a>
                                                            <p className="font-normal text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: blog?.data != '' ? blog?.data.slice(0, 50) + '...' : '' }}></p>
                                                            <div className="flex justify-between">
                                                                <a className="text-white bg-myBg font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href={`/pages/blog/${blog?._id}`} >
                                                                    Read more
                                                                </a>
                                                                <a className="text-white bg-myBg font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href={`/pages/blog/edit/${blog?._id}`} >
                                                                    Edit Blog
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => handleDeleteBlog(blog?._id)} class="absolute cursor-pointer inline-flex items-center justify-center w-9 h-9 text-xs font-bold text-white bg-myBg border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                                                        <FontAwesomeIcon className="text-gray-600" icon="fa-solid fa-trash" />
                                                    </div>
                                                </div>
                                            ))}   
                                        </div>
                                        {/* <div className="pt-12 border-t-2 border-gray-100 text-center">
                                            <a
                                            className="relative group inline-block py-4 px-7 font-semibold text-black hover:text-orange-50 rounded-full bg-myBg transition duration-300 overflow-hidden"
                                            href="#"
                                            >
                                            <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500" />
                                            <span className="relative">See More Articles</span>
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </> : null}

                            

                        </div>
                    </div>
                ) : (
                    <Loader />
                )}

            </div>
        </>
    )
}