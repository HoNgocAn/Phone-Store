import { Route, Routes } from "react-router-dom";
import React, { useEffect, useContext } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    useEffect(() => {
        let session = sessionStorage.getItem("jwt");
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