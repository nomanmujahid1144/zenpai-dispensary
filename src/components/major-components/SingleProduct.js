import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Filters } from "../minor-components/Filters";
import { DashboardProducts } from "../minor-components/DashboardProducts";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/Actions/CategoryActions";
import { useState } from "react";
import { getSingleBanner } from "../../redux/Actions/CategoryBannerAction";
import { baseURL } from "../../constants/baseURL";
import { Loader } from "../minor-components/Loader";


export const SingleProduct = () => {

  const { brandName } = useParams();
  const dispatch = useDispatch();

  const [banners, setBanner] = useState('');

  const { categories } = useSelector(
    (state) => state.categoryReducer
  )
  const { banner } = useSelector(
    (state) => state.categoryBannerReducer
  );
  const loading = useSelector(
    (state) => state.ProgressBarReducer
  );

  useEffect(() => {
    console.log(brandName, 'brandName')
    dispatch(getCategories());
    setBanner(categories.filter(
      (category) => category.brand.toLowerCase() === brandName.toLowerCase()
    ));
    // if(localStorage.getItem('token')){
    //   navigate(`/brand/${brandName}`)
    // }else{
    //   navigate("/login")
    // }
  }, [brandName])

  useEffect(() => {
    dispatch(getSingleBanner(banners.length > 0 ? banners[0]._id : ''))
  }, [banners])

  useEffect(() => {
    dispatch(getSingleBanner(banners.length > 0 ? banners[0]._id : ''))
  }, [])




  return (
    <>
      {!loading ? (
                <>
                  {/* <div className="bg-hero-img2 w-[100%] h-[60vh]  bg-no-repeat bg-center  bg-cover px-28  flex  items-center gap-4">
                    <div className='w-auto h-80 rounded flex flex-col justify-end text-center'>
                      <h1 className='text-4xl text-white font-bold '>
                        {brandName.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())}
                      </h1>
                    </div>
                  </div> */}
                  <div className='w-[90vw] mx-auto my-10'>
                      <h1 className='text-primaryText font-bold text-2xl my-10'>
                          Browse Our Catalogues
                      </h1>
                      <DashboardProducts products={categories} istype='categories' />
                  </div>
                  {banner !== null && banner && Object.keys(banner).length > 0 ? (
                    <div className='w-[90vw] mx-auto my-10 bg-white rounded-sm shadow-md'>
                      <div className="flex justify-between p-3">
                        <div>
                          <img src={baseURL + banner?.categoryBannerPhoto} className="w-56"/>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  ) : null}
                  <Filters />
                  <Footer />
          </>
        ) : (
            <Loader />
        )}
    </>
  );
};
