import React from 'react'
import { Grid } from "@mui/material"
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
const OrderCard = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/account/order/${5}`)} className='p-5 shadow-xl hover:shadow-2xl border my-2'>

            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>

                <Grid item xs={6}>
                    <div className='flex cursor-pointer'>
                        <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://rukminim1.flixcart.com/image/550/650/kd69z0w0/dress/q/h/y/l-ttj6005207-tokyo-talkies-original-imafu53ndfgsyrjh.jpeg?q=90&crop=false" alt="" />
                        <div className='ml-5 space-y-2'>
                            <p className=''>Mens Slim Mid Rise black Jeans</p>
                            <p className='opacity-50 text-xs font-semibold'>Size :M</p>
                            <p className='opacity-50 text-xs font-semibold'>Color : Black</p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p>$1999</p>
                </Grid>
                <Grid item xs={4} className='flex'>
                    {true && <div>
                        <p><AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2' />
                            <span>Delivered On March 03</span>
                        </p>
                        <p className='text-xs'>Your Item Has Been Delivered</p>
                    </div>}
                    {false && <p>
                        <span>Expected Delivery on Mar 03</span>
                    </p>}
                </Grid>
            </Grid>
        </div>
    )
}

export default OrderCard