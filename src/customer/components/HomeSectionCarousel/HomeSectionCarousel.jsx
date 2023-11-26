import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';



const HomeSectionCarousel = ({ data, sectionName }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },// its the break points of the screen and we can show the number of items that need to displayed in a specific screen break point
        720: { items: 3 },
        1024: { items: 5.5 },

    };

    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = data ? data.slice(0, 10).map((item) => <HomeSectionCard product={item} />) : null;

    // console.log(slideNext, slidePrev);
    return (
        <div className='border'>
            <h2 className='text-2xl font-extrabold text-gray-800 py-5' >{sectionName}</h2>
            <div className='relative p-5 '>
                <AliceCarousel
                    items={items}
                    // disableButtonsControls
                    disableDotsControls
                    responsive={responsive}
                    onSlideChange={syncActiveIndex}
                    activeIndex={activeIndex}
                />

                {activeIndex !== items.length - 5 && <Button onClick={slideNext} className='z-50' sx={{ position: 'absolute', right: '0rem', top: "8rem", transform: "translateX(50%) rotate(90deg)", }} aria-label='next'>
                    <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: 'red' }} />
                </Button>}


                {activeIndex !== 0 && < Button onClick={slidePrev} className='z-50' sx={{ position: 'absolute', left: '0rem', top: "8rem", transform: "translateX(50%) rotate(90deg)", }} aria-label='prev'>
                    <KeyboardArrowLeftIcon sx={{ transform: "rotate(-90deg)", color: "red" }} />
                </Button>}
            </div>
        </div >
    )
}

export default HomeSectionCarousel;