import React, { useEffect } from 'react'
import AddressCard from './AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../state/Order/Action';
import { useLocation } from 'react-router-dom';
import { store } from '../../state/store';
import { createPayment } from '../../state/Payment/Action';
const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { order } = useSelector(store => store)
    const searchParams = new URLSearchParams(location.search);

    const orderId = searchParams.get("order_id")

    useEffect(() => {
        dispatch(getOrderById(orderId))

    }, [orderId])

    const handleCheckout = () => {
        dispatch(createPayment(orderId));
    }

    return (
        <div>
            <div className=' px-3 mb-4'>
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            <div>
                <div className='lg:grid grid-cols-3 relative'>

                    <div className='col-span-2'>
                        {order.order?.orderItems.map((item) => <CartItem item={item} />)}
                    </div>

                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border p-6'>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                            <hr />
                            <div className='space-y font-semibold'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>${order.order?.totalPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3 text-green-600'>
                                    <span>Discount</span>
                                    <span>${order.order?.discount}</span>
                                </div>
                                <div className='flex justify-between pt-3 text-green-600'>
                                    <span>Delivery Charge</span>
                                    <span>Free</span>
                                </div>
                                <div className='flex justify-between pt-3 text-green-600'>
                                    <span>Total Amount</span>
                                    <span>${order.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>
                            <Button variant="contained" className='w-full' sx={{ px: '2.5rem', py: ".7rem", bgcolor: '#9155fd', mt: "3rem" }}
                                onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default OrderSummary