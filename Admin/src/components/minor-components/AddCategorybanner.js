import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../minor-components/Modal"
import { Loader } from "../minor-components/Loader"
import { AddCategoriesBannerForm } from "./AddCategoriesBannerForm"
import { getBanners } from "../../redux/Actions/CategoryBannerAction"

const tableColumnsReal = [
    'Photo',
    'Category Name',
    'Actions'
]
export const AddCategoryBanner = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const { banners } = useSelector(
        (state) => state.categoryBannerReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getBanners());
    }, [isOpen, isUpdateOpen]);

    return (
        <>
            <div className="bg-gray-50   z-0">
            {!loading ? (
                <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                    <div className="flex items-center justify-end py-4 px-4">
                        <button onClick={() => {
                            setIsOpen(true)
                        }}
                            className='bg-myBg text-gray-600 px-4 py-2 cursor-pointer hover:bg-[#E9D95D]'>
                            Add Category Banner
                        </button>
                    </div>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)} >
                        <AddCategoriesBannerForm modal={setIsOpen} isAdd={true} />
                    </Modal>
                    {
                        banners.length === 0 ? (
                            <div className="flex justify-center items-center py-8 text-lg h-screen">No Banner Found</div>
                        )
                            : (
                                <ActionsTable isOpen={isUpdateOpen} tableColumnsReal={tableColumnsReal} checkBox={true} isBanner={true} modal={setIsUpdateOpen} key={parseInt(Math.random() * 10000)} tableDataReal={banners} />
                            )
                    }
                </div>
            ):(
                <Loader />
            )}
               
            </div>
        </>
    )
}