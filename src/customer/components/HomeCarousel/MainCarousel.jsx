import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

// const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     1024: { items: 3 },
// };

// const items = [
//     <div className="item" data-value="1">1</div>,
//     <div className="item" data-value="2">2</div>,
//     <div className="item" data-value="3">3</div>,
//     <div className="item" data-value="4">4</div>,
//     <div className="item" data-value="5">5</div>,
// ];

const MainCarousel = () => {
    const items = MainCarouselData.map((item) => <img className='cursor-pointer -z-10' role='presentation' src={item.image} alt="" />)

    return (
        <div className="-z-10">
            < AliceCarousel
                // mouseTracking
                items={items}
                disableButtonsControls
                autoPlay
                autoPlayInterval={1000}
                infinite
            // responsive={responsive}
            // controlsStrategy="alternate"
            />
        </div>
    )
}
export default MainCarousel;