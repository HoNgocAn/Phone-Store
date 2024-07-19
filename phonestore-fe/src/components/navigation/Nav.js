import { useState, useEffect } from 'react';
import "./Nav.scss";
import { NavLink, useLocation } from 'react-router-dom';

function Nav() {

    const [isShow, setIsShow] = useState(true);

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/login") {
            setIsShow(false);
        }
    }, [])

    return (
        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" >Home </NavLink>
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    );
}

export default Nav;