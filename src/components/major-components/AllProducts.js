import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navLocation from "../../assets/nav-location.svg";
import cardImg from "../../assets/prod.png";
import cardImg1 from "../../assets/card-img1.png";
import cardImg2 from "../../assets/card-img2.png";
import cardImg3 from "../../assets/card-img3.png";
import cardImg4 from "../../assets/card-img4.png";
import { Card } from "../minor-components/Card";
import spn2 from "../../assets/Group22.png";
import spn3 from "../../assets/Group23.png";
import spn4 from "../../assets/Group24.png";
import spn5 from "../../assets/Group25.png";
import spn6 from "../../assets/Group26.png";
import { baseURL } from '../../constants/baseURL';
import { URL } from '../../constants/baseURL';
import { SlickSlider, SlickSliders } from "../minor-components/SlickSlider";
import { SingleProduct } from "../major-components/SingleProduct";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

import cannabisForm from '../../assets/shareimg.png'
//<div className='px-4'><Card svg={cardImg} title="Diners Choice" desc="86% THC" price="$44" /></div>,

export const AllProducts = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProducts();
      navigate("/allProducts")
    } else {
      navigate("/login")
    }
  }, [])


  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const data = await fetch(`${baseURL}/api/v1/product/getproducts`,
      // {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   } 
      // }
    );
    const jsonData = await data.json();
    console.log(jsonData.data.name)
    const products = jsonData.data;
    console.log(products)
    setProducts(jsonData.data);
  };

  const handleModel = async (e) => {
    console.log(e, "Card")
  }


  return (
    <>
      <Navbar />
      <div className="w-[90vw] mx-auto my-40">
        <h1 className="text-primaryText font-bold text-2xl mb-6">
          Best Products
        </h1>
        <div className="flex">
          <SlickSlider className="flex">
            {products.map((item) => (
              <div className="px-4" onClick={handleModel}>
                <Card
                  svg={`${baseURL}${item.productPhoto}`}
                  data-id={item.id}
                  title={item.name}
                  desc={item.description}
                  price={item.price}
                />{" "}

              </div>
            ))}
          </SlickSlider>
        </div>

        <div className="bg-white">
          <div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 "></div>
              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 ">
                  {/* Filters */}
                  <form className=" lg:block">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">
                      All Stores
                    </h1>
                    <div className=" py-6 grid grid-cols-1 ">
                      <div>
                        <h1 className="text-lg font-medium tracking-tight text-gray-500">
                          Sort
                        </h1>
                        <div className="space-y-4 pt-3">
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="color[]"
                              defaultValue="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {" "}
                              Pick for you (Default){" "}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-1"
                              name="color[]"
                              defaultValue="beige"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {" "}
                              Most popular{" "}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-3"
                              name="color[]"
                              defaultValue="brown"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-3"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {" "}
                              Rating{" "}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-4"
                              name="color[]"
                              defaultValue="green"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {" "}
                              Delivery Time{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                      <h1 className="text-lg font-medium  text-gray-500 mt-5 border-0">
                        Max Delivery Fee
                      </h1>
                      <div className="grid grid-cols-4 ">
                        <div class="rounded-full h-10 w-10 active flex  m-2 justify-center items-center">
                          <button class="rounded-full  flex border-2 py-2 px-3 justify-center items-center">
                            $2
                          </button>
                        </div>
                        <div class="rounded-full h-10 w-10 flex   m-2 justify-center items-center ">
                          <button class="rounded-full  flex border-2 py-2 px-3 justify-center items-center">
                            $2
                          </button>
                        </div>
                        <div class="rounded-full h-10 w-10 flex   m-2 justify-center items-center">
                          <button class="rounded-full  flex border-2 py-2 px-3 justify-center items-center">
                            $2
                          </button>
                        </div>
                        <div class="rounded-full h-10 w-10 flex  m-2 justify-center items-center">
                          <button class="rounded-full  flex border-2 py-2 px-3 justify-center items-center">
                            $2
                          </button>
                        </div>
                      </div>
                      <h1 className="text-lg font-medium  text-gray-500 mt-5">
                        Shop
                      </h1>
                      <div className="mt-3">
                        <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Button
                        </button>
                        <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Button
                        </button>
                        <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          Button
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* Product grid */}
                  <div className="lg:col-span-3 ">
                    <div className="flex justify-between ">
                      <h1 className="text-xl font-bold tracking-tight text-gray-900">
                        30% off To Prevent Those Sunday Scaries
                      </h1>
                      <a href="">
                        See all 41
                      </a>
                    </div>
                    <div className="pt-9">
                      <SlickSliders className="flex">
                        {products.map((item) => (
                          <div className="px-4">
                            <Card
                              svg={`${baseURL}${item.productPhoto}`}
                              title={item.name}
                              desc={item.description}
                              price={item.price}
                            />{" "}
                          </div>
                        ))}
                      </SlickSliders>
                    </div>
                    <div className="flex justify-between mt-9">
                      <h1 className="text-xl font-bold tracking-tight text-gray-900 ">
                        30% off To Prevent Those Sunday Scaries
                      </h1>
                      <a href="">
                        See all 41
                      </a>
                    </div>
                    <div className="pt-9">
                      <SlickSliders className="flex">
                        {products.map((item) => (
                          <div className="px-4">
                            <Card
                              svg={`${baseURL}${item.productPhoto}`}
                              title={item.name}
                              desc={item.description}
                              price={item.price}
                            />{" "}
                          </div>
                        ))}
                      </SlickSliders>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
