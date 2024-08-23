import React, { useEffect, useContext } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

const style = { "layout": "vertical" };

async function createOrder(totalAmount, user, cartItems) {

    const token = sessionStorage.getItem("jwt");

    console.log("Check user", user);

    try {
        return await fetch("http://localhost:8080/api/paypal/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                userId: user?.account?.id,
                cart: cartItems,
                totalAmount: totalAmount
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                return order.id;
            });
    } catch (error) {
        toast.error("Failed to create order. Please try again later.");
        console.error("Order creation error:", error);
    }
}

async function onApprove(data, user, setCartItems, setCartNumber, navigate) {

    const token = sessionStorage.getItem("jwt");


    try {
        return await fetch("http://localhost:8080/api/paypal/capture-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                console.log(orderData);

                // // Xử lý sau khi đơn hàng được thanh toán thành công
                if (orderData.status === 'COMPLETED') {
                    toast.success("Payment completed successfully!");
                    // // Gọi hàm reset giỏ hàng ở đây
                    setCartItems([]);
                    setCartNumber(0);
                    sessionStorage.setItem(`cartCount_${user?.account?.username}`, 0);
                    sessionStorage.setItem(`cartItems_${user?.account?.username}`, JSON.stringify([]));
                    navigate("/")
                } else {
                    toast.error("Payment was not successful. Please try again.");
                }
            })
    } catch (error) {
        toast.error("Failed to capture order. Please try again later.");
        console.error("Order creation error:", error);
    }
}


const ButtonWrapper = ({ showSpinner, totalAmount, user, cartItems, setCartItems, setCartNumber }) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const navigate = useNavigate()

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, totalAmount]} // Đảm bảo giá trị totalAmount được cập nhật
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return createOrder(totalAmount, user, cartItems);
                }}
                onApprove={(data, actions) => {
                    return onApprove(data, user, setCartItems, setCartNumber, navigate);
                }}
            />
        </>
    );
}


export default function PayPal(props) {

    const { setCartItems, setCartNumber } = useContext(UserContext);

    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "AVneN727WSZm3ozKvUIxuri_Sx1reD6UI0qhgt5pwWD8mcOsBfHao-mnZMk1SjEd7fzMGJxTXB8jy73A", components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} totalAmount={props.totalAmount} user={props.user} cartItems={props.cartItems} setCartItems={setCartItems} setCartNumber={setCartNumber} />
            </PayPalScriptProvider>
        </div>
    );
}