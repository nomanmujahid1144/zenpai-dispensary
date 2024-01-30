import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo } from "react"
import { axiosInstance } from "../../constants/axiosInstance"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const AddFaqs = () => {

    const [moreExtras, setMoreExtras] = useState(1)
    const [faqs, setFaqs] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );



    useEffect(() => {
        getFAQS();
    }, []);


    const getFAQS = async () => {
        await axiosInstance.get('/api/v1/faq/getfaqs')
            .then((res) => {
                let aboutUs = res.data.data;
                if (aboutUs.length != 0) {
                    setFaqs(aboutUs[0].faqs)
                    setMoreExtras(aboutUs[0].faqs.length)
                }
            })
            .catch((err) => {

            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        var data = new FormData(e.target);
        let formObject = Object.fromEntries(data.entries());
        const count = Object.keys(formObject).length / 2;

        let faqs = [];

        for (let i = 1; i <= count; i++) {
            let storedString = JSON.parse(`{
                        "Question" : "${eval(`formObject.question_${i}`)}",
                        "Answer" : "${eval(`formObject.answer_${i}`)}"
                }`)
            faqs.push(storedString);
        }

        axiosInstance.post('/api/v1/faq/addfaqs', { faqs })
            .then((res) => {
                alert.show("Successfully Added FAQ's")
                getFAQS()
            })
            .catch(() => {
                alert.show('No Category Found')
            })
    }


    const handleCount = async (e) => {
        setMoreExtras(parseInt(moreExtras) + 1)
    };
    const decreaseCross = async (e) => {
        setMoreExtras(parseInt(moreExtras) - 1)
    };

    return (
        <>
            <div className="bg-gray-50   z-0">
                {!loading ? (
                    <div className=" mt-24  ml-[20%]  w-[78%]">
                        <div className="py-2 bg-gray-50">
                            <div className=' bg-white rounded-lg  shadow-lg'>
                                <div className='px-5 pt-4 mb-4 flex justify-between'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Add Faqs</h2>
                                    <Link to='/pages'>
                                        <button className='bg-myBg text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="pr-2" />
                                            Back
                                        </button>
                                    </Link>

                                </div>

                                <div className="p-10">
                                    {console.log(faqs , 'faqs')}
                                    <form onSubmit={handleSubmit}>
                                        {(() => {
                                            const arr = [];
                                            for (let i = 0; i < moreExtras; i++) {
                                                arr.push(
                                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Question ' + (i + 1)}</label>
                                                                {(i + 1)  ?
                                                                    <span className='cursor-pointer' onClick={decreaseCross}>
                                                                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                                                    </span>
                                                                    : null}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                id="first_name"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Add Question"
                                                                required=""
                                                                name={`question_${i + 1}`}
                                                                defaultValue={eval(`faqs[${i}]?.Question`)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Answer ' + (i + 1)}</label>
                                                            <textarea name={`answer_${i + 1}`} defaultValue={eval(`faqs[${i}]?.Answer`)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Answer..."></textarea>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return arr;
                                        })()}

                                        <div className="w-100 flex justify-between">
                                            <button
                                                type="submit"
                                                className="text-white w-32 items-end bg-myBg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Submit
                                            </button>
                                            <a onClick={handleCount} href="#" class="text-myBg underline hover:text-blue-700">Add More</a>
                                        </div>
                                    </form>

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