import { useState, useEffect, useContext } from 'react';
import React from 'react';
import "./Footer.scss"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";


function Footer(props) {

    const { user } = useContext(UserContext);


    const location = useLocation();



    if ((user && user.isAuthenticated) || location.pathname === "/" || location.pathname === "/find-product" || location.pathname.startsWith("/detail-product")) {
        return (
            <div className="container-fluid mt-3 footer" style={{ backgroundColor: "#4f4f4f", height: "190px" }}>
                <div className='row row-1'>
                    <div className="col-12 col-lg-2">

                    </div>
                    <div className="col-12 col-lg-5">
                        <h5 style={{ color: "white", paddingTop: "15px" }}>@ 2024 PHONE STORE</h5>

                    </div>
                    <div className="col-12 col-lg-5" >

                    </div>
                </div>
                <div className='row row-2'>
                    <div className="col-12 col-lg-2">

                    </div>
                    <div className="col-12 col-lg-5">
                        <h6 style={{ color: "white", paddingTop: "15px" }}>SMARTPHONE PLAZA LLC</h6>
                        <p style={{ color: "white", paddingTop: "15px" }}>We provide you with the best and latest phones on the market.</p>
                        <p style={{ color: "white" }}>You can freely choose the phone you like</p>
                    </div>
                    <div className="col-12 col-lg-5" >
                        <i className="fa fa-home icon-footer"> <span className='text-icon'>123 Nguyen Van Linh, Phuong Tan Chinh, Quan Thanh Khe, Da Nang</span></i><br />
                        <i className="fa fa-phone icon-footer" ><span className='text-icon'>          09878942124</span> </i><br />
                        <i className="fa fa-envelope icon-footer"><span className='text-icon'> PhoneStore@gmail.com</span></i>
                    </div>
                </div>

            </div>
        )
    } else {
        return <></>
    }

}

export default Footer;