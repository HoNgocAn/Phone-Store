import React, { useState, useEffect, useContext } from "react";
import { fetchAllProduct } from "../../services/productService";
import ReactPaginate from 'react-paginate';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import "./FindProduct.scss";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Pagination from "../other/Pagination";

function FindProduct(props) {

    const { cartItems, addToCart, isPaymentSuccess, changeIsPayment } = useContext(UserContext);

    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [error, setError] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

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
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage); // Cập nhật số trang hiện tại
        getAllProducts(selectedPage, nameSearch, minPrice, maxPrice);
    }

    const handleLogin = () => {
        navigate("/login")
    }

    let session = sessionStorage.getItem("jwt")

    const submitSearch = async () => {
        try {
            setCurrentPage(1);
            let res = await fetchAllProduct(currentPage, nameSearch, minPrice, maxPrice);
            console.log(res);
            setListProducts(res.DT.products);
            setTotalPages(Math.ceil(res.DT.totalRows / res.DT.products.length));
            setError("");
        } catch (e) {
            navigate("/error404");
        }
    }


    const dontContainsSpecialCharacters = (string) => {
        const regex = /^[^!@#$%^&*()_+={}\[\]:;,<.>?\\\/'"`]*$/;
        if (!regex.test(string)) {
            setError("Do not write any special signs");
            return false;
        }
        return true;
    };

    const search = () => {
        if (dontContainsSpecialCharacters(nameSearch)) {
            submitSearch();
        } else {
            console.log("error");
        }
    };

    const handleSliderChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };


    return (
        <div className='container mt-3'>
            <h1>Đây là tìm kiếm</h1>
            <div className="input-find" >
                <form style={{ width: "30%", alignContent: "center" }} className="input-group mb-3 mb-md-2 "
                    role="search">
                    <div className="input-search-product">
                        <input type="search" className="form-control form-control-dark text-bg-light col-6"
                            placeholder="name product..." aria-label="Search" onChange={(event) => {
                                setNameSearch("" + (event.target.value))

                            }} />
                        <button type="submit" className="btn btn-light me-2"
                            onClick={(event) => {
                                event.preventDefault();
                                search();
                            }}>
                            <i className="fa fa-search" > Find</i>
                        </button>
                    </div>
                    {error ? <p style={{ color: "red" }}>{error}</p> : <p></p>}

                </form>
            </div>
            <div className="row slider-container">
                <div className="col-12">
                    <Slider
                        range
                        min={0}
                        max={5000}
                        defaultValue={[0, 5000]}
                        onChange={handleSliderChange}
                        value={[minPrice, maxPrice]}
                    />
                    <div className="d-flex justify-content-between">
                        <span>Min Price: {minPrice} USD</span>
                        <span>Max Price: {maxPrice} USD</span>
                    </div>
                </div>
            </div>

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
                    <h5 style={{ color: "red" }}>
                        No data found</h5>
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

export default FindProduct;