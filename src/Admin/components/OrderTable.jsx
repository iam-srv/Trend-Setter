import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliverOrder, getOrders, shipOrder } from '../../customer/state/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrderTable = () => {

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
        <div className='p-5 shadow-xl' >
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
                                <TableCell align="left">Updates</TableCell>
                                <TableCell align="left">Action</TableCell>

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
                                    <TableCell align="left">
                                        <Button
                                            id="demo-positioned-button"
                                            aria-haspopup="true"
                                            onClick={(event) => handleClick(event, index)}
                                            aria-controls={`basic-menu-${row.id}`}
                                            aria-expanded={Boolean(anchorEl[index])}
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${row.id}`}
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleConfirmOrder(row.id)}>Confirmed Order</MenuItem>
                                            <MenuItem onClick={() => handleShippedOrder(row.id)}>Shipped Order</MenuItem>
                                            <MenuItem onClick={() => handleDeliverOrder(row.id)}>Delivered Order</MenuItem>
                                        </Menu>

                                    </TableCell>
                                    <TableCell align="left">
                                        <Button variant='outline' sx={{ bgcolor: "red", color: "white" }}
                                            onClick={() => handleDeleteOrder(row.id)}

                                        > Delete</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </div >
    )
}

export default OrderTable