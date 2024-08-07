import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Users.scss";
import { useState, useEffect } from "react";
import { fetchAllGroup } from "../../services/groupService";
import { createUser } from "../../services/userService";
import _ from "lodash";
import { toast } from "react-toastify";

const ModalUser = (props) => {

    const defaultUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        sex: "Male",
        groupId: 1,
    };

    const validInputDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        groupId: true,
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputDefault);
    const [listGroups, setListGroups] = useState([]);

    const handleClose = () => {
        props.setIsShowModal(false);
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    useEffect(() => {
        if (props.isShowModal) {
            setUserData(defaultUserData); // Reset dữ liệu khi mở modal
            setValidInput(validInputDefault); // Reset trạng thái hợp lệ khi mở modal
        }
    }, [props.isShowModal]);

    const getAllGroups = async () => {
        try {
            let rs = await fetchAllGroup();
            setListGroups(rs.data.DT); // Cập nhật trạng thái với dữ liệu nhận được
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const validateInput = () => {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput.email = userData.email.trim() !== "";
        _validInput.phone = userData.phone.trim() !== "";
        _validInput.username = userData.username.trim() !== "";
        _validInput.password = userData.password.trim() !== "";
        _validInput.address = userData.address.trim() !== "";
        _validInput.sex = userData.sex.trim() !== "";
        _validInput.groupId = userData.groupId !== "";

        setValidInput(_validInput);

        return Object.values(_validInput).every(value => value === true);
    };

    const handleSave = async () => {
        if (!validateInput()) {
            return;
        }

        try {
            let rs = await createUser(userData);
            if (rs && rs.EC === 0) {
                toast.success(rs.EM)
                handleClose(); // Đóng modal sau khi tạo thành công
                props.onUserCreated();
            } else {
                toast.error(rs.EM)
            }
        } catch (error) {
            toast.error("Error create new user");
        }
    };

    return (
        <>
            <Modal size="lg" show={props.isShowModal} className="modal-user" onHide={() => handleClose()} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email (<span className="red" >*</span>) </label>
                            <input className="form-control" type="email" placeholder="Enter Email" value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")} />
                            {!validInput.email && <span className="text-danger">Email can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone Number (<span className="red" >*</span>) </label>
                            <input className="form-control" type="text" placeholder="Enter phone number" value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                            {!validInput.phone && <span className="text-danger">Phone can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>User Name : </label>
                            <input className="form-control" type="text" placeholder="Enter user name" value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, "username")}
                            />
                            {!validInput.username && <span className="text-danger">Username can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Password (<span className="red" >*</span>) </label>
                            <input className="form-control" type="password" placeholder="Enter Password" value={userData.password}
                                onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                            />
                            {!validInput.password && <span className="text-danger">Password can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address:</label>
                            <input className="form-control" type="text" placeholder="Enter Address" value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, "address")}
                            />
                            {!validInput.address && <span className="text-danger">Address can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender: </label>
                            <select className="form-select" value={userData.sex} onChange={(event) => handleOnChangeInput(event.target.value, "sex")} >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {!validInput.sex && <span className="text-danger">Gender can't be left blank</span>}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group (<span className="red">*</span>) </label>
                            {listGroups && listGroups.length > 0 ? (
                                <select className="form-select" value={userData.groupId} onChange={(event) => handleOnChangeInput(event.target.value, "groupId")}  >
                                    {listGroups.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <p>No data found</p>
                            )}
                            {!validInput.groupId && <span className="text-danger">Group can't be left blank</span>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;