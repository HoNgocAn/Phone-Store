import React, { useState, createContext, useEffect } from "react";
import { getUserAccount } from "../services/userService";
import { useLocation } from 'react-router-dom';
import { fetchProductList } from "../services/productService";

const UserContext = createContext({ name: '', auth: false });

const UserProvider = ({ children }) => {

    const location = useLocation();

    const [listProducts, setListProducts] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    const changeIsPayment = (value) => {
        setIsPaymentSuccess(value);
    }

    const [user, setUser] = useState({
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: ""
    });

    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const setCartNumber = (value) => {
        setCartCount(value)
    }


    useEffect(() => {
        fetchUser();
        getAllProducts()
    }, []);

    const getAllProducts = async () => {

        try {
            let rs = await fetchProductList();
            if (rs && rs.DT) {
                setListProducts(rs.DT); // Cập nhật trạng thái với dữ liệu nhận được
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }


    useEffect(() => {
        // Reset lại isLoadingUser khi vào trang chủ "/user"
        if (location.pathname === "/user") {
            setIsLoadingUser(true);
        }
    }, [location]);

    useEffect(() => {
        if (user.isAuthenticated) {
            const userCartCount = sessionStorage.getItem(`cartCount_${user.account.username}`);
            const userCartItems = sessionStorage.getItem(`cartItems_${user.account.username}`);

            setCartCount(userCartCount ? JSON.parse(userCartCount) : 0);
            setCartItems(userCartItems ? JSON.parse(userCartItems) : []);
        } else {
            setCartCount(0);
            setCartItems([]);
        }
    }, [user]);

    // Hàm để thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        const itemIndex = cartItems.findIndex(item => item.id === product.id);

        try {
            if (itemIndex === -1) {
                const newCartItems = [...cartItems, { ...product, quantity: 1 }];
                const newCartCount = cartCount + 1;

                setCartItems(newCartItems);
                setCartCount(newCartCount);

                // Lưu vào sessionStorage với key riêng cho tài khoản
                sessionStorage.setItem(`cartCount_${user.account.username}`, JSON.stringify(newCartCount));
                sessionStorage.setItem(`cartItems_${user.account.username}`, JSON.stringify(newCartItems));
            } else {
                alert("This product has been added to the cart");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const login = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const changeIsLoadingUser = (isLoadingUser) => {
        setIsLoadingUser(isLoadingUser);
    };

    const logout = () => {
        setUser({
            isLoading: true,
            isAuthenticated: false,
            token: "",
            account: null
        });
        changeIsLoadingUser(true);

        // Xóa giỏ hàng khi logout
        setCartCount(0);
        setCartItems([]);
    };

    const fetchUser = async () => {
        let session = sessionStorage.getItem("jwt");
        if (!session) {
            return;
        }

        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let id = response.DT.id;
            let group = response.DT.group;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let data = {
                isAuthenticated: true,
                token: token,
                account: { id, group, email, username },
                isLoading: false
            };
            setUser(data);
        }
    };


    return (
        <UserContext.Provider value={{ user, listProducts, login, logout, isLoadingUser, changeIsLoadingUser, cartCount, setCartNumber, addToCart, cartItems, setCartItems, changeIsPayment, isPaymentSuccess }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
