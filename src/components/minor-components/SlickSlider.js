import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './SlickSlider.css'
import React, { useRef, useState } from "react";


const NextArrow = (props) => {
    const { className, style, onClick } = props;

    return (

        <div
            className={className}
            style={{ ...style, display: "block", top: "80px", background: "#FFFFFF", opacity: "0.9", padding: "20px", boxShadow: "0px 3px 6px #00000029", borderRadius: '50%' }}
            onClick={onClick}
        />

    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", zIndex: "1", top: "80px", background: "#FFFFFF", opacity: "0.9", padding: "20px", boxShadow: "0px 3px 6px #00000029", borderRadius: '50%' }}
            onClick={onClick}
        />
    );
}
const NextArrowImage = (props) => {
    const { className, style, onClick } = props;

    return (

        <div
            className={className}
            style={{ ...style, display: "none", top: "80px", background: "#FFFFFF", opacity: "0.9", padding: "20px", boxShadow: "0px 3px 6px #00000029", borderRadius: '50%' }}
            onClick={onClick}
        />

    );
}

const PrevArrowImage = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", zIndex: "1", top: "80px", background: "#FFFFFF", opacity: "0.9", padding: "20px", boxShadow: "0px 3px 6px #00000029", borderRadius: '50%' }}
            onClick={onClick}
        />
    );
}
var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                // dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                // initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export const SlickSlider = ({ children }) => {
    console.log(children, " :childern")
    return (

        <Slider className='w-[90vw]' {...settings}>
            {children}
        </Slider>

    )
}


var imageSliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    prevArrow: <NextArrowImage />, // Hide the previous arrow
    nextArrow: <PrevArrowImage />, // Hide the next arrow
    appendDots: dots => (
        <div
          style={{
                padding: "0px",
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: "linear",
            }
        },
        {
            breakpoint: 1200,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: "linear",
            }
        },
        {
            breakpoint: 1000,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: "linear",
            }
        },
        {
            breakpoint: 650,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: "linear",
            }
        }
    ]
};

var blogSettings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 800,
            settings: {
                speed: 1000,
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        }
    ]
};
export const SlickSliderForHeaderImages = ({ children }) => {
    const sliderRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleDotClick = (index) => {
        if (sliderRef.current && sliderRef.current.slick) {
          sliderRef.current.slick.slickGoTo(index);
        }
      };
    
    return (
    
        <Slider className="w-full" ref={sliderRef} {...imageSliderSettings} beforeChange={(oldIndex, newIndex) => setActiveSlide(newIndex)} afterChange={(index) => handleDotClick(index)} >
            {React.Children.map(children, (child, index) => React.cloneElement(child, { isActive: index === activeSlide }))}
        </Slider>
    )
}
export const SlickBlogSlider = ({ children }) => {
    return (
    
            <Slider className='w-full' {...blogSettings}>
                    {children}
            </Slider>
      
    )
}
export const SlickSliders = ({ children }) => {
    console.log(children, " :childern")
    return (

        <Slider className='w-[60vw]' {...settings}>
            {children}
        </Slider>

    )
}


