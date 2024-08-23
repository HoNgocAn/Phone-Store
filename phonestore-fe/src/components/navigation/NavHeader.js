import { useState, useEffect, useContext } from 'react';
import "./Nav.scss";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { logoutUser } from '../../services/userService';
import { toast } from "react-toastify";
import ModalCart from "../cart/Cart";
import ModalchangePassword from '../managerUsers/ModalchangePassword';


function NavHeader() {

    const { user, logout, cartCount } = useContext(UserContext);

    const [isShowCPassword, setIsShowPassword] = useState(false)

    const [groupName, setGroupName] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();

    const [iShowCart, setIsShowCart] = useState(false);


    const handleLogout = async () => {
        try {
            let data = await logoutUser();
            sessionStorage.removeItem("jwt");
            logout();
            if (data && +data.EC === 0) {
                toast.success("Logout successfully")
                navigate("/")
            } else {
                toast.error(data.EM)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user?.account?.group?.name) {
            setGroupName(user.account.group.name);
        }
    }, [user]);

    const handleCartPage = () => {
        setIsShowCart(true)

    }



    const handleChangePassword = () => {
        setIsShowPassword(true)
    }


    let session = sessionStorage.getItem("jwt")

    if ((user && user.isAuthenticated) || location.pathname === "/" || location.pathname === "/find-product" || location.pathname.startsWith("/detail-product")) {
        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" className="nav">
                        <Container>
                            <Navbar.Brand href="#home">Phone-Store</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link'>Home </NavLink>
                                    {groupName === "admin" && session ?
                                        <div>
                                            <NavLink to="/user" className='nav-link'>User</NavLink>
                                            <NavLink to="/group-role" className='nav-link'>Group-Role</NavLink>
                                            <NavLink to="/role" className='nav-link'>Role</NavLink>
                                        </div>
                                        :
                                        <></>
                                    }
                                </Nav>
                                <Nav>
                                    {(groupName === "admin" || groupName === "employee") && session ?
                                        <div>
                                            <NavLink to="/add-product" className='nav-link'>Add Product</NavLink>
                                        </div>
                                        :
                                        <></>
                                    }

                                    <NavLink to="/find-product" className='nav-link'>Find Product</NavLink>
                                    <Nav className='cart-nav'>
                                        <span title="cart" className="edit" onClick={() => handleCartPage()}><i className="fa fa-shopping-cart"></i></span>
                                        <span className="cart-badge">{cartCount}</span>
                                    </Nav>

                                    {session ?
                                        <>
                                            <Nav.Item className='nav-link'>Welcome {user.account.username}</Nav.Item>
                                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                                <NavDropdown.Item > <span onClick={() => handleChangePassword()} >
                                                    Change Password
                                                </span></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()} >
                                                        Logout
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link to="/login" className='nav-link'>Login</Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div >
                <ModalCart title="Cart"
                    isShowModal={iShowCart}
                    setIsShowModal={setIsShowCart}

                />
                <ModalchangePassword title="Change Password"
                    isShowModal={isShowCPassword}
                    setIsShowModal={setIsShowPassword}
                />
            </>
        );
    } else {
        return <></>
    }

}

export default NavHeader;