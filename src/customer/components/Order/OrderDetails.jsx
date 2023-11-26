import React from 'react'
import AddressCard from "../Checkout/AddressCard/AddressCard"
import OrderTracking from './OrderTracking'
import { Grid, Box } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { deepPurple } from '@mui/material/colors';


const OrderDetails = () => {
    return (
        <div className='px:5 lg:px-20'>
            <div>
                <h1 className='font-bold text-lg py-7'>Delivery Address</h1>
                <AddressCard />
            </div>
            <div className='py-20'>
                <OrderTracking activeStep={3} />
            </div>
            <Grid container className='space-x-5'>
                {[1, 1, 1, 1, 1, 1].map(item =>
                    <Grid item container className='shadow-xl rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid item xs={6}>
                            <div className='flex items-center space-x-5'>
                                <img className=" w-[5rem] h-[5rem] object-cover object-top" src='https://belavous.com/cdn/shop/files/BJO-316-OFF-WHITE_2400x_jpg_533x.webp?v=1684152502' alt='image' />

                                <div className='space-y ml-5'>
                                    <p className='font-semibold'>Men Slim Mid Black Jeans</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Color : Pink</span> <span>Size: M</span></p>
                                    <p>Seller: Trend Setter</p>
                                    <p>$1099</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <Box sx={{ color: deepPurple[500] }}>
                                <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2 text-5xl' />
                                <span>Rate & Review Product</span>
                            </Box>
                        </Grid>
                    </Grid>)}

            </Grid>
        </div>
    )
}

export default OrderDetails