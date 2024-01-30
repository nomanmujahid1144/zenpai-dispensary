import React, { useEffect, useRef, useState } from 'react'
import navLocation from '../../assets/nav-location.svg'
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderImage from '../../assets/hero-section-img.png'
import { baseURL } from '../../constants/baseURL';
import { SlickSlider, SlickSliderForHeaderImages } from './SlickSlider';
// console.log(process.env.VITE_APP_GMAP_API_KEY , "Key1")
// console.log(import.meta.env.VITE_APP_GMAP_API_KEY , "Key2")

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



export const HeroMapInput = (props) => {

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


  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      geometry: { coordinates: [lats, lngs] },
      formattedAddress: formatted_address,
    }
    props.gromatryLocation(obj)
  }
  return (
    // <div  className={`w-[100%]`}>

    //   <h1 className='text-4xl text-secondaryText font-bold'>
    //     Zenpai Dispensary
    //   </h1>

    //   <form onSubmit={handleSubmit}>
    //     <div className='flex flex-wrap items-center justify-center gap-3 my-4'>
    //       <FontAwesomeIcon size='lg' className='text-white relative bg-transparent z-0 mr-[-35px]' icon="fa-location-dot" />
    //       <input ref={searchInput} className="h-12 px-10 opacity-50 bg-blue-50  w-80 rounded  text-xs outline-0  hover:outline-0 focus:outline-none " type="text" name="search" placeholder="Enter your delivery address..." />
    //       <FontAwesomeIcon onClick={findMyLocation} size='lg' className='text-white relative bg-transparent z-50 ml-[-35px] cursor-pointer' icon="fa-location-crosshairs" />
    //       <button className='px-4 text-lg w-44 h-12 text-primaryText font-semibold bg-myBg rounded text-center'>
    //         Shop Now
    //       </button>
    //     </div>
    //     {props.located ?
    //       <p className='text-md text-red-600 font-bold'>Service is not Available in the Specific Ares</p>
    //       : null}
    //   </form>


    //   {props.isLocated ? 
    //               <form onSubmit={handleSubmit}>
    //                 <div className='flex items-center justify-center gap-2 my-4'>
    //                         <FontAwesomeIcon size='lg' className='text-myBg bg-transparent z-50 mr-[-35px]' icon="fa-location-dot" />
    //                     <div className='flex justify-center items-center'>
    //                         <input ref={searchInput}  className="h-14 pl-10 pr-10 bg-blue-50  w-96 rounded  text-xs outline-0  hover:outline-0 focus:outline-none " type="text" name="search" placeholder="Enter your delivery address..." />
    //                     </div>
    //                     <div>
    //                       <FontAwesomeIcon  onClick={findMyLocation} size='lg' className='text-myBg bg-transparent z-50 ml-[-35px] cursor-pointer' icon="fa-location-crosshairs" />
    //                     </div>
    //                     <button className='px-4 text-lg w-44 h-14 text-primaryText font-semibold bg-myBg rounded text-center'>
    //                         Shop Now
    //                     </button>
    //                 </div>
    //               </form>
    //             : 
    //               <></>
    //             }


    // </div>
    <>
      <SlickSliderForHeaderImages>
        { 
          props?.headerImage?.length > 0 ?
            props?.headerImage?.map((image) => (
              <img src={baseURL + image} className='w-12/12 h-auto md:h-[600px] px-0' />
            ))
            :
            <img src={HeaderImage} className='w-12/12 h-auto md:h-[600px] px-0' />
        
        }
      </SlickSliderForHeaderImages>
    </>
  )
} 