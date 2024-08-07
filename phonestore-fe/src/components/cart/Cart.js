import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/UserContext";
import "./Cart.scss"
import { createNewOrder } from "../../services/orderService"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Cart(props) {
    const { user, cartItems, setCartItems, listProducts, setCartNumber, changeIsPayment } = useContext(UserContext);

    const navigate = useNavigate();

    // Tìm sản phẩm và thay đổi số lượng
    const changeQuantity = (p, quantity) => {
        const i = cartItems.indexOf(p);
        const arr = [...cartItems];

        const availableProduct = listProducts.find(product => product.name === p.name);

        // Kiểm tra nếu số lượng mới vượt quá số lượng tồn kho trong database
        const newQuantity = arr[i].quantity + quantity;
        if (newQuantity > availableProduct.quantity) {
            arr[i].quantity = availableProduct.quantity;  // Đặt số lượng bằng với số lượng tối đa có sẵn
        } else if (newQuantity <= 0) {
            arr[i].quantity = 1;  // Không cho phép số lượng nhỏ hơn 1
        } else {
            arr[i].quantity = newQuantity;  // Cập nhật số lượng bình thường
        }

        setCartItems([...arr]);

        // Tính tổng số lượng sản phẩm trong giỏ hàng
        const newCartCount = arr.reduce((total, item) => total + item.quantity, 0);

        setCartNumber(newCartCount);

        // Cập nhật vào sessionStorage
        sessionStorage.setItem(`cartCount_${user.account.username}`, JSON.stringify(newCartCount));
    }

    const updateCartStorage = (items) => {
        sessionStorage.setItem(`cartItems_${user.account.username}`, JSON.stringify(items));
        setCartItems(items);
    }

    const removeProduct = (product) => {
        const updatedCartItems = cartItems.filter(p => p.id !== product.id);

        // Cập nhật cartItems
        updateCartStorage(updatedCartItems);

        // Tính lại tổng số lượng sản phẩm trong giỏ hàng sau khi xóa
        const newCartCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

        setCartNumber(newCartCount);

        sessionStorage.setItem(`cartCount_${user.account.username}`, JSON.stringify(newCartCount));
    }

    const handleClose = () => {
        props.setIsShowModal(false);
    };

    const totalAmount = cartItems.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    console.log(user.account);

    const handlePay = async () => {


        const orderData = {
            userId: user.account.id, // ID của người dùng hiện tại
            cartItems: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount
        };

        try {
            const response = await createNewOrder(orderData);
            if (response) {
                toast.success("Added successfully");
                setCartItems([]);
                setCartNumber(0);
                sessionStorage.setItem(`cartCount_${user.account.username}`, 0);
                sessionStorage.setItem(`cartItems_${user.account.username}`, []);
                handleClose();
                changeIsPayment(true);
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    return (
        <div>
            <Modal size="lg" show={props.isShowModal} className="modal-user" onHide={() => handleClose()} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="container">
                            <table className="table table-hover">
                                <thead className="">
                                    <tr className="text-center">
                                        <th>Product</th>
                                        <th>Price (USD)</th>
                                        <th>Quantity</th>
                                        <th>Total Amount (USD)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className=" text-center fw-bold align-text-top">
                                    {
                                        cartItems.map(product => (
                                            <tr key={product.id}>
                                                <td className="text-start">
                                                    <img src={product.image} width="100" height="100" className="me-2" />
                                                    {product.name}
                                                </td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button onClick={() => changeQuantity(product, -1)} className="btn">
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                    <input type="text" className="form-control-sm fw-bold text-center"
                                                        style={{ width: "70px" }} value={product.quantity} readOnly />
                                                    <button onClick={() => changeQuantity(product, 1)} className="btn">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td>{product.price * product.quantity}</td>
                                                <td>
                                                    <button onClick={() => removeProduct(product)} className="btn btn-danger">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="text-end mt-3" style={{ marginRight: "70px" }}>
                                <h5>Total amount of all: {totalAmount} USD</h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handlePay()} >
                        Pay
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Cart;