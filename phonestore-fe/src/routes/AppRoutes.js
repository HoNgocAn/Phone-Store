import { Route, Routes } from "react-router-dom";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Users from '../components/managerUsers/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/role/Role";
import GroupRole from "../components/group-role/GroupRole";
import HomePage from "../components/home/homePage";
import FindProduct from "../components/product/FindProduct";
import Dashboard from "../pages/Dashboard";
import Error404 from "../components/other/Error404";
import Error403 from "../components/other/Error403";
import CheckOut from "../components/payment/CheckOut";
import AddProduct from "../components/product/AddProduct";
import DetailProduct from "../components/product/DetailProduct";

const AppRoutes = () => {

    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path="/error403" element={<Error403 />} />
                <Route path='/find-product' element={<FindProduct />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/detail-product/:id' element={<DetailProduct />} />
                <Route path='/user' element={
                    <PrivateRoutes>
                        <Users />
                    </PrivateRoutes>
                } />
                <Route path='/role' element={
                    <PrivateRoutes>
                        <Role />
                    </PrivateRoutes>
                } />

                <Route path='/group-role' element={
                    <PrivateRoutes>
                        <GroupRole />
                    </PrivateRoutes>
                } />
                <Route path='/check-out' element={
                    <PrivateRoutes>
                        <CheckOut />
                    </PrivateRoutes>
                } />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default AppRoutes;