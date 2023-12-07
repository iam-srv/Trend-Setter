import { Grid } from '@mui/material'
import React from 'react'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
import OrderTableView from '../view/OrderTableView'

import ProductsTableView from '../view/ProductTableView'


const AdminDashboard = () => {
    return (
        <div className='p-10 '>
            <Grid container spacing={3} >
                <Grid item xs={12} md={4} >
                    <div className='shadow-lg shadow-gray-500'>
                        <Achievement />
                    </div>
                </Grid>

                <Grid item xs={12} md={8} >
                    <div className='shadow-lg shadow-gray-500'>
                        <MonthlyOverview />
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>

                    <div className='shadow-lg shadow-gray-500'>
                        <OrderTableView />
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>

                    <div className='shadow-lg shadow-gray-500'>
                        <ProductsTableView />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminDashboard