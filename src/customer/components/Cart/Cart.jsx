import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Divider, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../state/Cart/Action';
import { store } from '../../state/store';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store)
    const handleCheckOut = () => {
        navigate("/checkout?step=2")
    }

    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem, cart.deleteCartItem])


    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>

                <div className='col-span-2'>
                    {cart.cart?.cartItems.map((item) => <CartItem item={item} />)}
                </div>

                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border p-6'>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                        <hr />
                        <div className='space-y font-semibold'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-green-600'>
                                <span>Discount</span>
                                <span>{cart.cart?.discount}%</span>
                            </div>
                            <div className='flex justify-between pt-3 text-green-600'>
                                <span>Delivery Charge</span>
                                <span>₹50</span>
                            </div>
                            <div className='flex justify-between pt-3 text-green-600'>
                                <span>Total Amount</span>
                                <span>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>
                        <Button onClick={handleCheckOut} variant="contained" className='w-full' sx={{ px: '2.5rem', py: ".7rem", bgcolor: '#9155fd', mt: "3rem" }}>
                            Checkout
                        </Button>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Cart