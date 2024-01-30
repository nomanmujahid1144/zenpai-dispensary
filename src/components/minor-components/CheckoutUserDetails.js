import { useEffect, useRef, useState } from "react";
import { PaymentMethods } from "../minor-components/CheckoutPaymentMethod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLatLng } from 'use-places-autocomplete';
import SameDayDelivery from '../../assets/Samedaydelivery.png'
import Mailorderdelivery from '../../assets/Mailorderdelivery.png'



const apiKey = 'AIzaSyC7bLhDH_v6YSanp-5f41zwMgoio0eO-6Y';
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';
let lats, lngs;
let formatted_address;

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

const extractAddress = (place) => {

  // const results = await getGeocode({ place });

  if (typeof (place.geometry.location.lat) && typeof (place.geometry.location.lng) != 'function') {
    lats = place.geometry.location.lat;
    lngs = place.geometry.location.lng;
  } else {
    const { lat, lng } = getLatLng(place);
    lats = lat;
    lngs = lng;
  }

  formatted_address = place.formatted_address;

  const address = {
    sublocal2: "",
    sublocal: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const sublocal2 = this.sublocal2 ? this.sublocal2 + ", " : "";
      const sublocal = this.sublocal ? this.sublocal + ", " : "";
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return sublocal2 + sublocal + city + zip + state + this.country;
    }
  }

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach(component => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("sublocality_level_2")) {
      address.sublocal2 = value;
    }
    if (types.includes("sublocality_level_1")) {
      address.sublocal = value;
    }
    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;
}



export const CheckoutUserDetails = (props) => {

    const [deliveryCharges , setDeliveryCharges] = useState(0)
    const [selected, setSelected] = useState([]);
    const [placeOrder , setPlaceOrder] = useState(false)
    const [totalPrice , setTotalPrice] = useState(0)
    const [paymentMethod , setPaymentMethod] = useState('')
    const [credentials, setcredentials] = useState({
      address: "",
      postalCode: ""
    });

    useEffect(() => {
      setcredentials({
        address : props?.cartUser?.formattedAddress , 
        postalCode : props?.cartUser?.deliveryZipCode
      })
    }, []) 


    const searchInput = useRef(null);
  const [address, setAddress] = useState({});

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  }

  // do something on address change
  const onChangeAddress = async (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  }

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_component", "formatted_address", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

  }


  const reverseGeocode = async ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then(response => response.json())
      .then(location => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      })
  }

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        reverseGeocode(position.coords)
      })
    }
  }



  useEffect(() => {
    setcredentials({
      address: props?.cartUser?.formattedAddress,
      postalCode: props?.cartUser?.deliveryZipCode
    })

    initMapScript().then(() => initAutocomplete())
  }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const address = formatted_address
      const postalCode = document.getElementById('postal-code').value;
      const coordinates = [lats, lngs]
      props.handleSubmit(selected , totalPrice , deliveryCharges , address , postalCode , paymentMethod, coordinates )
    }

    let arr = []
    function changeCheck(val) {
      setSelected(val);
      setPlaceOrder(true);


      if((props.totalPrice >= 30 && props.totalPrice <= 50) && val == 'Same Day Delivery'){ 
        setDeliveryCharges(10)
        setTotalPrice(props.totalPrice + 10)
      }else if((props.totalPrice >= 50 && props.totalPrice <= 150) && val == 'Same Day Mail Delivery'){ 
        setDeliveryCharges(15)
        setTotalPrice(props.totalPrice + 15)
        setPaymentMethod('')
      }else{
        setDeliveryCharges(0)
        setTotalPrice(props.totalPrice)         
      }

    }

    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handlePaymentOptions = (e) => {
      setPaymentMethod(e.target.value)
    }

    return (
        <>
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <form onSubmit={handleSubmit}>
              <div >
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <input type="text" id="email" name="email" readOnly disabled value={props?.cartUser?.email} className="w-full cursor-not-allowed bg-gray-100 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                <div className="relative">
                  <input type="text" id="card-holder" name="card-holder" readOnly disabled  value={props?.cartUser?.fullName} className="w-full cursor-not-allowed bg-gray-100 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
                <div className="relative flex-shrink-0">
                    <input type="text" id="card-no" name="card-no" readOnly disabled  value={props?.cartUser?.phoneNumber} className="w-full cursor-not-allowed bg-gray-100 rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between w-12/12">
                    <div className="relative flex-shrink-0 w-8/12">
                      <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
                      {/* <input type="text" id="billing-address" name="address" onChange={onChange} value={credentials.address} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" /> */}
                      <input ref={searchInput} required className="w-full rounded-md border border-gray-200 px-4 py-3 pl-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" type="text" name="search" placeholder="Enter your delivery address..." />
                      <FontAwesomeIcon onClick={findMyLocation} size='lg' className='text-black relative bg-transparent z-20 ml-[-35px] cursor-pointer' icon="fa-location-crosshairs" />
                    </div>
                    <div className="relative flex-shrink-0 w-3/12">
                      <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Postal Code</label>
                      <input type="text" id="postal-code" required name="postalCode" onChange={onChange} value={credentials.postalCode} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Postal Code" />
                    </div>

                  </div>
                {/* Total */}  
                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                  <PaymentMethods 
                    value='Same Day Delivery' 
                    text='Same Day Delivery'  
                    icon={SameDayDelivery}
                    changeCheck={changeCheck} 
                    selected={selected == "Same Day Delivery" ? true : false}
                  />

                  <PaymentMethods 
                    value='Same Day Mail Delivery'  
                    text='Same Day Mail Delivery (Canada Post Express)'  
                    changeCheck={changeCheck} 
                    icon={Mailorderdelivery}
                    selected={selected == "Same Day Mail Delivery" ? true : false}
                  />
                  
                <p className="mt-8 text-lg font-medium">Payment Methods</p>
                {selected === "Same Day Mail Delivery" ?
                  <div class="bg-blue-100 border rounded-lg border-blue-500 text-blue-700 px-4 py-3 my-4" role="alert">
                    <p class="text-sm"><FontAwesomeIcon icon="fa-solid fa-circle-info px-1" size="lg" /> We will contact you to discuss Payment options</p>
                  </div>
                : selected === "Same Day Delivery" ?
                  <select onChange={handlePaymentOptions} required class="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option hidden>Select Payment Option</option>
                    <option >Pay by Cash</option>
                    <option >Pay by E-transfer</option>
                  </select>                
                : null}

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                    <p className="font-semibold text-gray-900">${props.subTotalPrice}</p>
                  </div>

                  {(props.totalPrice >= 30 && props.totalPrice <= 50) && selected == 'Same Day Delivery' ? 
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Shipping</p>
                      <p className="font-semibold text-gray-900">${deliveryCharges}</p>
                    </div> 
                  :
                    (props.totalPrice >= 50 && props.totalPrice <= 150) && selected == 'Same Day Mail Delivery' ? 
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Shipping</p>
                          <p className="font-semibold text-gray-900">${deliveryCharges}</p>
                        </div>
                      :
                        null 
                  }
                  
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  {(props.totalPrice >= 30 && props.totalPrice <= 50) && selected == 'Same Day Delivery' ? 
                    <p className="text-2xl font-semibold text-gray-900">${props.totalPrice + deliveryCharges}</p>
                  :
                    (props.totalPrice >= 50 && props.totalPrice <= 150) && selected == 'Same Day Mail Delivery' ? 
                    <p className="text-2xl font-semibold text-gray-900">${props.totalPrice + deliveryCharges}</p>
                      :
                      <p className="text-2xl font-semibold text-gray-900">${props.totalPrice}</p>
                  }

                </div>
              </div>
              {placeOrder ?
              <>
                {(props.totalPrice < 30 ) && selected == 'Same Day Delivery' || (placeOrder == false) ? 
                    <div class="bg-red-100 border rounded-lg border-red-500 text-red-700 px-4 py-3 my-4" role="alert">
                      <p class="text-sm"><FontAwesomeIcon icon="fa-solid fa-circle-info px-1" size="lg" /> We don't accept order if it is below $30 </p>
                    </div>
                  :
                  (props.totalPrice < 50 ) && selected == 'Same Day Mail Delivery' || (placeOrder == false) ? 
                    <div class="bg-red-100 border rounded-lg border-red-500 text-red-700 px-4 py-3 my-4" role="alert">
                      <p class="text-sm"><FontAwesomeIcon icon="fa-solid fa-circle-info px-1" size="lg" /> We don't accept order if it is below $50 </p>
                    </div>
                    :
                  <button className="mt-4 mb-8 w-full rounded-md bg-[#E9C95D] px-6 py-3 font-medium text-white" >Place Order</button> 
                }
              </>
              :null}
              
            </form>
        </>
    )
}