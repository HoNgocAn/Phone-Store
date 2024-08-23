import React from 'react';
import Slider from "react-slick";

const CarouselHome = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Số lượng hình ảnh hiển thị cùng lúc
        slidesToScroll: 1, // Số lượng hình ảnh cuộn mỗi lần
        autoplay: true, // Tự động chạy
        autoplaySpeed: 2000, // Tốc độ chạy (2 giây)
        arrows: true, // Đảm bảo rằng nút 
    };

    const images = [

        "https://cdn.sanity.io/images/tlr8oxjg/production/a0104b3f38d8f54c7ed63099328f3ef138c2c7a7-1057x592.png?w=3840&q=80&fit=clip&auto=format",
        "https://img.freepik.com/free-psd/sales-discount-facebook-template_23-2149959351.jpg",

    ];

    return (
        <Slider {...settings} className='slick-slider' >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: "500px" }} />
                </div>
            ))}
        </Slider>
    );
}

export default CarouselHome;