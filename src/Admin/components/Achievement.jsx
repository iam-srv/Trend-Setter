import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'
import trophy from "../trophy.png"
const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
})

const TrophyImg = styled('img')({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute',
    backgroundColor: "white"
})

const Achievement = () => {

    return (
        <Card className='' sx={{ position: 'relative' }}>
            <CardContent>
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Trend Setter
                </Typography>
                <Typography variant='body2'>Congratulations 🥳</Typography>
                <Typography variant='h5' sx={{ my: 3.1 }}>420.8k</Typography>
                <Button size='small' variant='contained' >View Sales</Button>

                <TriangleImg src='' />
                <TrophyImg src={trophy} sx={{ bgcolor: "inherit" }} />
            </CardContent>
        </Card>
    )
}

export default Achievement