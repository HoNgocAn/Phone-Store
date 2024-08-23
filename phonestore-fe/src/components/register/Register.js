import { useState } from 'react';
import "./Register.scss";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from "../../services/userService";

function Register(props) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState("");
    const groupId = 3;
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    const handleRegister = async () => {
        // Xóa tất cả các thông báo lỗi trước khi kiểm tra
        setErrors({});
        setEmailError("");

        // Kiểm tra validate trước khi submit
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            setEmailError("Invalid email format");
        }
        if (!phone) {
            newErrors.phone = "Phone is required";
        }
        if (!username) {
            newErrors.username = "Username is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!confirmPW) {
            newErrors.confirmPW = "Please confirm your password";
        }

        if (password !== confirmPW) {
            newErrors.confirmPW = "Your password is not the same";
        }

        // Nếu có lỗi thì không thực hiện đăng ký
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Nếu không có lỗi, tiến hành đăng ký
        let userData = { email, phone, username, password, groupId };

        // Gửi request đăng ký lên server ở đây

        let response = await registerNewUser(userData)

        if (+response.EC === 0) {
            toast.success("User registered successfully");
            navigate("/login");
        } else {
            toast.error(response.EM);
        }

    }


    return (
        <div className='register'>
            <div className='container'>
                <div className='row'>
                    <div className='register-left col-12 d-none col-sm-7 d-sm-block d-flex flex-column align-items-center '>
                        <div className='brand'>
                            <h3>PHONE-STORE</h3>
                        </div>
                        <div className='detail'>
                            <p> THIS IS A PLACE TO HELP YOU BUY THE BEST PHONES AT THE RIGHT PRICE</p>
                        </div>
                    </div>
                    <div className='register-right col-sm-5 col-12 d-flex flex-column py-3 '>
                        <div className='brand d-sm-none'>
                            <h3>Facebook</h3>
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="text" className="form-control mb-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Phone</label>
                            <input type="text" className="form-control mb-3" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                        </div>
                        <div className='form-group'>
                            <label>User Name</label>
                            <input type="text" className="form-control mb-3" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Re-Enter Password</label>
                            <input type="password" className="form-control mb-3" placeholder="Re-Enter Password" value={confirmPW} onChange={(e) => setConfirmPW(e.target.value)} />
                            {errors.confirmPW && <div className="text-danger">{errors.confirmPW}</div>}
                        </div>


                        <button className='btn btn-primary mb-3' type='button' onClick={handleRegister}>Register</button>

                        <hr className="mb-3" />
                        <div className="text-center">
                            <button className='btn btn-success' type='button' onClick={handleLogin} >Already have an account? Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;