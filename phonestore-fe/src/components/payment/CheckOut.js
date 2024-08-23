
import payment from "./Payment.svg";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation } from 'react-router-dom';
import PayPal from './PayPal';

function CheckOut(props) {

    const { user, cartItems, totalAmount, setCartItems, setCartNumber } = useContext(UserContext);

    return (
        <div className='row container-fluid mt-3'>
            <div className='col-12 col-sm-5'>
                <img src={payment} alt='payment' style={{ height: "700px", width: "500px", objectFit: "contain" }} />
            </div>
            <div className='col-12 col-sm-7 mt-5'>
                <h2 className='text-2xl font-bold'>Checkout your order</h2>
                <table className='table-auto ' style={{ width: "100%" }}>
                    <thead>
                        <tr className='border bg-gray-200'>
                            <th className='text-left p-2'>Products</th>
                            <th className='text-center p-2'>Quantity</th>
                            <th className='text-right p-2'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(product => (
                            <tr className='border' key={product.id}>
                                <td className='text-left p-2'>{product.name}</td>
                                <td className='text-center p-2'>{product.quantity}</td>
                                <td className='text-right p-2'>{product.price} USD</td>
                            </tr>
                        ))}
                        <tr className='border bg-gray-200'>
                            <th className='text-right p-2'>Total Price</th>
                            <th className='text-right p-2'>{totalAmount} USD</th>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <PayPal totalAmount={totalAmount} user={user} cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
}

export default CheckOut;