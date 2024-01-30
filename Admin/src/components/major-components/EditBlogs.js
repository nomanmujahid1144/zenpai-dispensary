import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo  } from "react"
import { axiosInstance } from "../../constants/axiosInstance"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link  , useParams} from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseURL } from "../../constants/baseURL"
import { getBlogById, updateBlog } from "../../redux/Actions/BlogsActions"


export const EditBlogs = () => {

    const alert = useAlert()
    const { id } = useParams()
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
                                resolve({default : `${res.data.url}`})
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

    const {blog} = useSelector(
        (state) => state.blogReducer
    );

    

    useEffect(() => {
        dispatch(getBlogById(id))
    }, [isOpen, id]);
    
    // Assign values once the blog data is fetched
    useEffect(() => {
    if (blog?.data) {
        setaboutData(blog.data);
        setBlogHeading(blog.blogHeading);
    }
    }, [blog]);


    const handleBlogHeadingChange = (event, editor) => {
        const data = editor.getData();
        setBlogHeading(data)
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setaboutData(data)
    };


    const handleSubmit = async (event , id) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('blogImage', headerImage)
        let values = {};
        values.data = aboutData;
        values.blogHeading = blogHeading;
        dispatch(updateBlog(id, values, formData, navigate, alert, isOpen, setIsOpen))
    }


    return (
        <>
            <div className="bg-gray-50   z-0">
                {!loading ? (
                    <div className=" mt-24  ml-[20%]  w-[78%]">
                        <div className="py-2 bg-gray-50">
                            <div className=' bg-white rounded-lg  shadow-lg'>
                                <div className='px-5 pt-4 mb-4 flex justify-between'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Edit Blog</h2>
                                    <Link to='/pages/blog'>
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
                                    <div style={{ backgroundImage: `url(${fileHeaderPreview ? fileHeaderPreview : blog?.blogImage  ?  blog?.blogImage : null})` }} className="w-[30%] h-64 rounded-lg bg-no-repeat  bg-cover flex flex-col justify-center items-center" >
                                        <label className="w-[100%] h-96 cursor-pointer border-2 rounded-lg flex justify-center">
                                            {!fileHeaderPreview && (blog?.blogImage != '')  ? <h3 className="self-center">Click to Upload Blog Image</h3> : null}
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
                                        data={aboutData}
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
                                    <button onClick={(event) => handleSubmit(event , blog?._id)} className='bg-myBg text-right text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-[#E9D95D]'>
                                        Save
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