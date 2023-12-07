import React from "react";
import "./index.css";
import Product from "./customer/components/Product/Product";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./customer/Routers/CustomerRouters";
import AdminRouters from "./customer/Routers/AdminRouters";
const App = () => {

    return (
        <div className="">

            <Routes>
                <Route path="/*" element={<CustomerRouters />} ></Route>
                <Route path="/admin/*" element={<AdminRouters />}></Route>
            </Routes>

            {/* <div> */}
            {/* <Navigation /> */}
            {/* <HomePage /> */}
            {/* <Product /> */}
            {/* <ProductDetails /> */}
            {/* <Cart /> */}
            {/* <Checkout /> */}
            {/* <Order /> */}
            {/* <OrderDetails /> */}
            {/* </div> */}
            {/* <div>
                <Footer />
            // </div> */}

        </div>

    )
}

export default App;