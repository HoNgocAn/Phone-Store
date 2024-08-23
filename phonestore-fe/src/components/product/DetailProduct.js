import React, { useEffect, useState, useContext } from 'react';
import "./DetailProduct.scss"
import { fetchProductrById } from "../../services/productService";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function DetailProduct(props) {

    const navigate = useNavigate();
    const { addToCart } = useContext(UserContext);
    const { id } = useParams(); // Lấy id từ useParams

    const [product, setProduct] = useState(null); // Đặt giá trị ban đầu là null

    useEffect(() => {
        if (id) {
            getProductById(id); // Truyền id vào hàm getProductById
        }
    }, [id]);

    const getProductById = async (id) => {
        try {
            let rs = await fetchProductrById(id);
            if (rs && rs.DT) {
                setProduct(rs.DT); // Cập nhật trạng thái với dữ liệu nhận được
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    let session = sessionStorage.getItem("jwt");

    const isLocalImageURL = (url) => {
        return url.startsWith('http');
    };

    const toAbsoluteURL = (url) => {
        return `http://localhost:8080/images/${url}`;
    };

    // Kiểm tra nếu product chưa được tải
    if (!product) {
        return <div>Loading...</div>; // Hiển thị thông báo hoặc spinner khi dữ liệu đang tải
    }

    return (
        <div className='container detail-product'>
            <div className="col-12 col-lg-3 mt-3">
                <div className="card" style={{ width: "300px" }}>
                    <img className="card-img-top" src={isLocalImageURL(product.image) ? product.image : toAbsoluteURL(product.image)} alt="Card image"
                        height="300"
                        width="100" />
                    <div className="card-body">
                        <h5 className="card-text">{product.name}</h5>
                        <p className="card-text">Price: {product.price} USD </p>
                        <p className="card-text">Quantity: {product.quantity}</p>
                        <p className="card-text">Nation: {product.nation}</p>

                        {!session ?
                            <span className="item-cart" data-bs-toggle="modal"
                                data-bs-target="#logineUser"><i className="fa fa-cart-plus"></i></span>

                            :
                            <span className="item-cart" onClick={() => addToCart(product)} ><i className="fa fa-cart-plus"></i></span>
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
        </div>
    );
}

export default DetailProduct;