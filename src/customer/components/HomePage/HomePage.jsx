import React from 'react'
import MainCarousel from '../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../HomeSectionCarousel/HomeSectionCarousel'
import Mens_kurta from '../../../Data/Men/men_kurta'

const HomePage = () => {
    // console.log(Mens_kurta);

    return (
        <div>
            <MainCarousel />

            <div className='py-20 space-y-10 flex flex-col px-5 lg:px-10'>

                <HomeSectionCarousel data={Mens_kurta} sectionName={"Men's Kurta"} />
                <HomeSectionCarousel data={Mens_kurta} sectionName={"Men's Shoes"} />
                <HomeSectionCarousel data={Mens_kurta} sectionName={"Men's Shirt"} />
                <HomeSectionCarousel data={Mens_kurta} sectionName={"Women's Saree"} />
                <HomeSectionCarousel data={Mens_kurta} sectionName={"Men's Dress"} />


            </div>
        </div>
    )
}

export default HomePage