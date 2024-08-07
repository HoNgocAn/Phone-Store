import React, { useState, useEffect, useContext } from "react";
import { fetchAllProduct } from "../../services/productService";
import ReactPaginate from 'react-paginate';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import "./HomePage.scss";
import Pagination from "../other/Pagination";


function HomePage(props) {

    const { cartItems, addToCart, isPaymentSuccess, changeIsPayment } = useContext(UserContext);

    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    useEffect(() => {
        getAllProducts(1, nameSearch, minPrice, maxPrice);
        if (isPaymentSuccess) {
            getAllProducts(1, nameSearch, minPrice, maxPrice); // Gọi API để lấy danh sách sản phẩm mới nhất
            changeIsPayment(false); // Đặt lại isPaymentSuccess sau khi gọi API
        }
    }, [isPaymentSuccess]);

    const getAllProducts = async (page, nameSearch, minPrice, maxPrice) => {

        try {
            let rs = await fetchAllProduct(page, nameSearch, minPrice, maxPrice);
            if (rs && rs.DT) {
                setListProducts(rs.DT.products); // Cập nhật trạng thái với dữ liệu nhận được
                setTotalPages(rs.DT.totalPages);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const handlePageClick = (event) => {
        getAllProducts(event.selected + 1, nameSearch, minPrice, maxPrice)
    }

    const handleLogin = () => {
        navigate("/login")
    }

    let session = sessionStorage.getItem("jwt")


    return (
        <div className='container mt-3'>
            <h1>Đây là Trang Home</h1>

            <div className="row row-1-home ">
                {listProducts && listProducts.length > 0 ? (
                    listProducts.map(item =>
                        <div key={item.id} className="col-12 col-lg-4 mt-4">
                            <div className="card" style={{ width: "300px" }}>
                                <img className="card-img-top" src={item.image} alt="Card image"
                                    height="300"
                                    width="100" />
                                <div className="card-body">
                                    <h5 className="card-text">{item.name}</h5>
                                    <p className="card-text">Price: {item.price} USD </p>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                    <Link to={`/product/detail/${item.id}`}>
                                        <span className="item-detail" ><i className="fa fa-eye" ></i></span>
                                    </Link>
                                    {!session ?
                                        <span className="item-cart" data-bs-toggle="modal"
                                            data-bs-target="#logineUser"><i className="fa fa-cart-plus"></i></span>

                                        :
                                        <span className="item-cart" onClick={() => addToCart(item)} ><i className="fa fa-cart-plus"></i></span>
                                    }
                                    <div className="modal fade" id="logineUser" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Login User</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    You must be logged in to place an order!
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => handleLogin()}>Login</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <h5 style={{ color: "red" }}>Không tìm thấy dữ liệu</h5>
                )}
            </div>
            <div className="paginate">
                {totalPages > 1 && (
                    <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
                )}
            </div>

        </div>
    );
}

export default HomePage;