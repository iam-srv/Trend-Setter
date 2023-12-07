import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../customer/state/Product/Action'
import { useDispatch, useSelector } from 'react-redux'
import { CarCrash, ImportExport } from '@mui/icons-material'

const ProductsTableView = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(store => store);



    useEffect(() => {

        const data = {
            category: "",
            colors: [],
            sizes: [],
            minPrice: 0,
            maxPrice: 10000000,
            minDiscount: 0,
            sort: "price_value",
            pageNumber: 0,
            pageSize: 50,
            stock: ""
        }
        dispatch(findProducts(data));

    }, [products.deletedProduct])
    return (
        <div className=' p-5 h-[100vh] overflow-auto ' >

            <Card className='mt-2 ' sx={{ bgcolor: "#2C3335", }}>
                <CardHeader title='All Products' />
                <TableContainer component={Paper} sx={{ bgcolor: "#2C3335" }}>
                    <Table sx={{ minWidth: 650, color: 'white !important' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.products?.content?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">
                                        <Avatar src={row.imageUrl}></Avatar>
                                    </TableCell>


                                    <TableCell component="th" scope="row">{row.title}</TableCell>
                                    <TableCell align="left">{row.category.name}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left">{row.quantity}</TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>


        </div >
    )
}

export default ProductsTableView;