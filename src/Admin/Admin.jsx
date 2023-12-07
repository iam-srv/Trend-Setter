
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminDashboard from './components/AdminDashboard';
import CreateProductForm from './components/CreateProductForm';
import ProductsTable from './components/ProductsTable';
import OrderTable from './components/OrderTable';
import CustomersTable from './components/CustomersTable';



const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <ShoppingCartIcon /> },
    { name: "Customers", path: "/admin/customers", icon: < EmojiPeopleIcon /> },
    { name: "Orders", path: "/admin/orders", icon: < EditNoteIcon /> },
    { name: "AddProducts", path: "/admin/product/create", icon: <AddBoxIcon /> },
    // { name: "", path: "" },

]
const Admin = () => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
        <Box sx={{
            overFlow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%"
        }}>

            {isLargeScreen}
            <List >
                {menu.map((item, index) => <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)} >
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {item.name}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>)}
            </List>
            <List>
                <ListItem  >
                    <ListItemButton>
                        <ListItemIcon >
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>

    )


    return (

        <div className='relative flex h-[100vh]'>
            <CssBaseline />

            <div className='w-[15%] border border-r-gray-300 h-full fixed top-0 '>
                {drawer}
            </div>

            <div className='w-[85%] h-full ml-[15%] '>
                <Routes>
                    <Route path="/" element={<AdminDashboard />}></Route >
                    <Route path="/product/create" element={<CreateProductForm />}></Route >
                    <Route path="/Products" element={<ProductsTable />}></Route >
                    <Route path="/orders" element={<OrderTable />}></Route >
                    <Route path="/customers" element={<CustomersTable />}></Route >
                </Routes>
            </div>
        </div>

    )
};


export default Admin