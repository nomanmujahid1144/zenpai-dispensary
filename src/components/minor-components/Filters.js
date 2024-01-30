import { Fragment, useState , useEffect } from 'react'
import {useNavigate ,  useParams } from "react-router-dom";
import { axiosInstance } from "../../constants/axiosInstance";
import { SingleProductInfo } from "../minor-components/SingleProductInfo";
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { FiltersSection } from './FiltersSection';
import { useAlert } from 'react-alert'

export const Filters = ()  => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [products , setProducts] = useState([]);  
  const [filters , setFilters] = useState([]);  
  const [Category , setCategory] = useState([])
  const [SubCategory , setSubCategory] = useState([])
  const [Type , setType] = useState([])

  const {brandName} = useParams();
  let navigate = useNavigate();
  let alert = useAlert();

  useEffect(() => {
      fetchProducts();
      navigate(`/brand/${brandName}`)
  }, [brandName  ]) 

  useEffect(() => {
      filtersss()
  }, [Category , SubCategory , Type]) 


  const handleItem = async (item , action) => {
    const details = {
      productId : item.id,
      quantity : item.quantity,
    }
    let url =''

    if(action === 'p'){
      url = '/api/v1/order/addtocart'
    }else if(action === 'm'){
      url = '/api/v1/order/decreasecartquantity'
    }

    if(localStorage.getItem('token') == null){
        alert.show("Sign in Your Account first")
        navigate('/login')
      }else{
        axiosInstance.post(url , details, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem('token')
          }
        }).then((res) => {
          localStorage.setItem('totalCart' , res.data.data.details.length)
          alert.show("Product Added to Cart")
        }).catch((err) => {
          console.log(err)
          
        })
    }

  }


  const fetchProducts = async () => {
    await axiosInstance.get('/api/v1/category/getsinglebrand' , {params : {brand : brandName}})
    .then((res) => {
        if (res.data.success) {
            let filter = [
             {
                id : res.data.data.category.length !=0 ? 'Category' : '',
                name : res.data.data.category.length !=0 ? 'Category' : '',
                options : 
                    res.data.data.category.map((item) => {
                        return {value : {item} , label : {item} , checked : false }
                    })
                    
                
             },
             {
                id : res.data.data.subCategory.length !=0 ? 'SubCategory' : '',
                name : res.data.data.subCategory.length !=0 ? 'SubCategory' : '',
                options : 
                    res.data.data.subCategory.map((item) => {
                        return {value : {item} , label : {item} , checked : false}
                    })
                    
                
             },
             {
                id : res.data.data.type.length !=0 ? 'Type' : '',
                name : res.data.data.type.length !=0 ? 'Type' : '',
                options : 
                    res.data.data.type.map((item) => {
                        return {value : {item} , label : {item} , checked : false}
                    })
                    
                
             },
            
            ]
            setFilters(filter);
            axiosInstance.get('/api/v1/product/getproductbybrand' , {params : {brand : brandName}})
                .then((res) => {
                if (res.data.success) {
                    setProducts(res.data.data);
                }
                else {
                    console.log('No Brand Found')
                }
                })
                .catch((error) => {
                console.log(error , "Error in Fetching Brands")
                })
        }
        else {
            console.log('No Brand Found')
        }
      })
      .catch((error) => {
        console.log(error , "Error in Fetching Brands")
      })
};

  const filtersss = async() => {
    let url = '/api/v1/product/getproductbybrandwithcategory';
    axiosInstance.get(url , {
      params : {
        brand : brandName ,
        category :  Category?.target?.value ? Category?.target?.value : ''  ,
        subCategory  : SubCategory?.target?.value ? SubCategory?.target?.value : '' ,
        type : Type?.target?.value ? Type?.target?.value : '' 
      }})
      .then((res) => {
          console.log(res , 'Category Response Daat')
          if (res.data.success) {
              setProducts(res.data.data);
          }
          else {
              console.log('No Brand Found')
          }
      })
      .catch((error) => {
        console.log(error , "Error in Fetching Brands")
      })
  }

  const hancleClick = async (e , value , name ) => {
    if(name === 'Category'){
      if(Category.length == 0){
          setCategory(e)
      }
      if(Category.length !== 0){
        if(e.target.value !== Category?.target?.value){
          console.log(Category)
          Category.target.checked = false;
          setCategory([])
          setCategory(e)
        }else{
          if(e.target.checked === false){
            setCategory([])
          }
        }
      }
    }
    if(name === 'SubCategory'){
      if(SubCategory.length == 0){
        setSubCategory(e)
      }
      if(SubCategory.length !== 0){
        if(e.target.value !== SubCategory.target.value){
            SubCategory.target.checked = false;
            setSubCategory([])
            setSubCategory(e)
        }else{
          if(e.target.checked === false){
            setSubCategory([])
          }
        }
      }
    }
    if(name === 'Type'){
      if(Type.length == 0){
        setType(e)
      }
      if(Type.length !== 0){
        if(e.target.value !== Type.target.value){
            Type.target.checked = false;
            setType([])
            setType(e)
        }else{
          if(e.target.checked === false){
            setType([])
          }
        }
      }
    }
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                            <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                                </Disclosure.Button>
                            </h3>
                              {section.options.map((option , optionIdx) => (
                                <FiltersSection 
                                      key={option.value.item} 
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}`} 
                                      defaultValue={`${option.value.item}`} 
                                      defaultChecked={option.checked} 
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      label={option.label.item} 
                                      handleClick={hancleClick}
                                />
                              ))}
                            </>
                          )}
                        </Disclosure>
                      ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                      <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                              {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                          </span>
                          </Disclosure.Button>
                      </h3>
                        {section.options.map((option , optionIdx) => (
                          <FiltersSection 
                                key={option.value.item} 
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}`} 
                                defaultValue={`${option.value.item}`} 
                                defaultChecked={option.checked} 
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                label={option.label.item} 
                                handleClick={hancleClick}
                          />
                        ))}
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="h-auto rounded-lg  lg:h-full" >
                    <div className="grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-4 xl:gap-x-8">
                        {products.map((item , index) => (
                            <SingleProductInfo 
                              value={index} 
                              item={item} 
                              getItem={handleItem}
                            />
                        ))}
                    </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
