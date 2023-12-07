import { AccountCircle, SmsFailedSharp, TrendingUp } from '@mui/icons-material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import React from 'react'

const salesData = [  /// 1.04 hr 
    {
        stats: '245k',
        title: "Sales",
        color: '#BB2CD9',
        icon: <TrendingUp sx={{ fontSize: '1.7rem' }} />
    },
    {
        stats: '12.5k',
        title: "Customers",
        color: '#22CB5C',
        icon: <AccountCircle sx={{ fontSize: '1.7rem' }} />
    },
    {
        stats: '1.54k',
        title: "Products",
        color: '#FF3031',
        icon: <Inventory2Icon sx={{ fontSize: '1.7rem' }} />
    },
    {
        stats: '88k',
        title: "Revenue",
        color: '#25CCF7',
        icon: <AttachMoneyIcon sx={{ fontSize: '1.7rem' }} />
    }

]

const renderStats = () => {
    return salesData.map((item, index) => (

        <Grid item xs={12} sm={3} key={index} >
            <Box sx={{
                display: 'flex', alignItems: 'center'
            }} >

                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: "white",
                    background: `${item.color}`
                }}>
                    {item.icon}
                </Avatar>

                <Box sx={{
                    display: 'flex',
                    flexDirection: "column"
                }}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>
        </Grid>
    ))
}
console.log(renderStats());
const MonthlyOverview = () => {
    return (
        <Card  >
            <CardHeader title="Monthly Overview"
                action={
                    <IconButton size='small' >
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant='body2'>

                        <Box component="span" sx={{ fontWeight: 600, mx: 2 }}>
                            Total 48.5% growth
                        </Box>
                        😎 this month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important'
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 0]}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MonthlyOverview