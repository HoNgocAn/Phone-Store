import { Route, Routes } from "react-router-dom";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Users from '../components/managerUsers/Users';
import PrivateRoutes from "./PrivateRoutes";


const AppRoutes = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={"Home"} />
                <Route path='/news' element={"news page"} />
                <Route path='/contact' element={"contact page"} />
                <Route path='/about' element={"about page"} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user' element={
                    <PrivateRoutes>
                        <Users />
                    </PrivateRoutes>
                } />
                <Route path="*" element={"404 not found"} />
            </Routes>
        </>
    )
}

export default AppRoutes;