import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {children}
        </>

    )
};

export default PrivateRoutes;