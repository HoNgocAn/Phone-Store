
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchUserById, changePassword } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

function ModalchangePassword(props) {


    const { user } = useContext(UserContext);

    const id = user?.account?.id;

    const [userById, setUserById] = useState({})
    const [newPassword, setNewPassword] = useState("");
    const [validInput, setValidInput] = useState(true);

    useEffect(() => {
        getUserById(id);
    }, [id]);


    const getUserById = async (id) => {
        try {
            let rs = await fetchUserById(id);
            setUserById(rs.DT); // Cập nhật trạng thái với dữ liệu nhận được
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    const handleClose = () => {
        props.setIsShowModal(false);
    };

    const handleChange = async () => {
        try {
            if (!validateInput()) {
                return;
            }
            let rs = await changePassword(newPassword, id);
            if (rs && rs.EC === 0) {
                toast.success(rs.EM)
                props.setIsShowModal(false);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const handleOnChangeInput = (value) => {
        setNewPassword(value)
    }


    const validateInput = () => {
        const isValid = newPassword.trim() !== "";
        setValidInput(isValid);
        return isValid;
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
                        <h5>Change Password</h5>
                        {/* <div className="col-12 col-sm-6 form-group">
                            <label>Old password (<span className="red" >*</span>) </label>
                            <input className="form-control" type="password" placeholder="Enter Email"
                            />
                        </div> */}

                        <div className="col-12 col-sm-6 form-group">
                            <label>New password (<span className="red" >*</span>) </label>
                            <input className="form-control" type="password" placeholder="Enter new Password" value={newPassword}
                                onChange={(event) => handleOnChangeInput(event.target.value)}
                            />
                            {!validInput && <span className="text-danger">Password can't be left blank</span>}
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleChange()}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ModalchangePassword;