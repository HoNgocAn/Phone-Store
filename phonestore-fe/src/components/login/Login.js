import React, { useState, useEffect, useContext } from "react";
import "./Login.scss";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../services/userService";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";

function Login() {

    const { login } = useContext(UserContext);


    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleCreateNewAccount = () => {
        navigate("/register")
    }

    const handleLogin = async () => {
        setErrors({});

        // Kiểm tra validate trước khi submit
        let newErrors = {};

        if (!valueLogin) {
            newErrors.valueLogin = "Email or Phone is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Nếu có lỗi thì không thực hiện đăng ký
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let userData = { valueLogin, password };

        // Gửi request đăng ký lên server ở đây
        let response = await loginUser(userData);
        if (response && +response.EC === 0) {
            toast.success("Login successfully");
            let id = response.DT.id;
            let group = response.DT.group;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let data = {
                isAuthenticated: true,
                token: token,
                account: { id, group, email, username }
            }

            sessionStorage.setItem("jwt", token);
            login(data)
            navigate("/dashboard");
            // window.location.reload();

        } else {
            toast.error(response.EM);
        }

    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 || event.code === "Enter") {
            handleLogin();
        }
    }


    useEffect(() => {
        let session = sessionStorage.getItem("jwt");
        if (session) {
            navigate("/");
            window.location.reload();
        }
    }, [])

    return (
        <div className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='login-left col-12 d-none col-sm-7 d-sm-block d-flex flex-column align-items-center '>
                        <div className='brand'>
                            <h3>Facebook</h3>
                        </div>
                        <div className='detail'>
                            <p>Facebook helps you connect and share with the people in your life</p>
                        </div>
                    </div>
                    <div className='login-right col-sm-5 col-12 d-flex flex-column py-3 '>
                        <div className='brand d-sm-none'>
                            <h3>Facebook</h3>
                        </div>
                        <input type="text" className={errors.valueLogin ? "is-invalid form-control mb-3" : "form-control mb-3"} placeholder="Email or Phone" value={valueLogin} onChange={(event) => setValueLogin(event.target.value)} />
                        {errors.valueLogin && <div className="text-danger">{errors.valueLogin}</div>}
                        <input type="password" className={errors.password ? "is-invalid form-control mb-3" : "form-control mb-3"} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyPress={(event) => handlePressEnter(event)} />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                        <button className='btn btn-primary mb-3' onClick={() => handleLogin()}>Login</button>
                        <Link to="#" className="forgot-password mb-3">Forgot your password?</Link>
                        <hr className="mb-3" />
                        <div className="text-center">
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()} >Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;