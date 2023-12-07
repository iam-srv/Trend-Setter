import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliverOrder, getOrders, shipOrder } from '../../customer/state/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrderTableView = () => {

    const dispatch = useDispatch();

    const { adminOrder } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrders())
    }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder])

    // for menu button (status)
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = event.currentTarget
        setAnchorEl(newAnchorElArray);
    };

    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = null
        setAnchorEl(newAnchorElArray);
    };

    const handleShippedOrder = (orderId) => {
        dispatch(shipOrder(orderId))
        handleClose();
    }

    const handleConfirmOrder = (orderId) => {
        dispatch(confirmOrder(orderId));
        handleClose();
    }

    const handleDeliverOrder = (orderId) => {
        dispatch(deliverOrder(orderId));
        handleClose();
    }

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId));
        handleClose();
    }

    console.log("admin orders", adminOrder);
    return (
        <div className='p-5 shadow-xl h-[100vh] overflow-auto' >
            <Card className='mt-2 ' >
                <CardHeader title='All Products' />
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650, }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>

                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Status</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {adminOrder.orders?.map((row, index) => (
                                <TableRow
                                    // key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="" >
                                        <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                                            {row.orderItems?.map((orderItem) => <Avatar src={orderItem.product.imageUrl}></Avatar>)}
                                        </AvatarGroup>

                                    </TableCell>


                                    <TableCell component="th" scope="row">
                                        {row.orderItems.map((orderItem) => <p>{orderItem.product.title}</p>)}
                                    </TableCell>

                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.totalPrice}</TableCell>
                                    <TableCell align="left"><span className={`text-white px-5 py-2 rounded-full
                                    ${row.orderStatus == 'CONFIRMED' ? "bg-[yellow]" :
                                            row.orderStatus == 'SHIPPED' ? 'bg-[blue]' :
                                                row.orderStatus == 'PLACED' ? 'bg-[orange]' :
                                                    row.orderStatus == 'PENDING' ? 'bg-[grey]' :
                                                        'bg-[green]'}`}>
                                        {row.orderStatus}</span></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </div >
    )
}

export default OrderTableView;