import React, { useState, useEffect, useContext } from "react";
import { fetchAllUser } from "../../services/userService";
import "./Users.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import 'font-awesome/css/font-awesome.min.css';
import { UserContext } from "../../context/UserContext";
import { Oval } from 'react-loader-spinner';
import { fetchAllGroup } from "../../services/groupService";
import Pagination from "../other/Pagination";


function Users() {

    const [ishow, setIsShow] = useState(false);
    const [ishowEdit, setIsShowEdit] = useState(false)
    const [nameUser, setNameUser] = useState(null);
    const [user, setUser] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * 3;
    const navigate = useNavigate();
    const { isLoadingUser, changeIsLoadingUser } = useContext(UserContext);

    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const [nameSearch, setNameSearch] = useState("");
    const [groupId, setGroupId] = useState("");
    const [error, setError] = useState("");
    const [listGroups, setListGroups] = useState([]);

    const location = useLocation();

    const handleDeleteClick = (userId, username) => {
        setUserIdToDelete(userId);
        setNameUser(username)
    };



    useEffect(() => {
        const timer = setTimeout(() => {
            getAllGroups()
            getAllUsers(1, nameSearch, groupId);
        }, 2000); // Thay đổi thời gian trì hoãn (đơn vị: milliseconds)

        return () => clearTimeout(timer);
    }, [])

    const getAllGroups = async () => {
        try {
            let rs = await fetchAllGroup();
            setListGroups(rs.data.DT); // Cập nhật trạng thái với dữ liệu nhận được
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    if (location.pathname !== "/user") {
        changeIsLoadingUser(true)
    }
    const getAllUsers = async (page, nameSearch, groupId) => {
        try {
            let rs = await fetchAllUser(page, nameSearch, groupId);


            if (rs && rs.DT) {
                setListUsers(rs.DT.users); // Cập nhật trạng thái với dữ liệu nhận được
                setTotalPages(rs.DT.totalPages);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            changeIsLoadingUser(false); // Kết thúc loading
        }
    }

    const handlePageClick = (event) => {

        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage); // Cập nhật số trang hiện tại
        getAllUsers(selectedPage, nameSearch, groupId);
    }

    const handleAddUser = () => {
        setIsShow(true)
    }

    const handleEditUser = (item) => {
        setIsShowEdit(true)
        setUser(item)
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    const refreshPage = () => {
        getAllUsers(currentPage);
        window.location.reload()
    }

    const submitSearch = async () => {
        try {
            setCurrentPage(1);
            let res = await fetchAllUser(currentPage, nameSearch, groupId);
            setListUsers(res.DT.users);
            setTotalPages(Math.ceil(res.DT.totalRows / res.DT.users.length));
            setError("");
        } catch (e) {
            navigate("/error404");
        }
    }


    const dontContainsSpecialCharacters = (string) => {
        const regex = /^[^!#$%^&*()_+={}\[\]:;,<.>?\\\/'"`]*$/;
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
            navigate("/error404");
        }
    };


    return (
        <>
            {isLoadingUser ?
                <div className="loading-container" >
                    <Oval className="loading"
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <div>Loading data...</div>
                </div> :
                <div className="container">
                    <h3 className="mb-3 mt-3">List Users</h3>
                    <div className="action">
                        <button type="button" className="btn btn-primary refresh" onClick={() => handleRefresh()}>
                            <i className="fa fa-refresh"></i> Refresh
                        </button>
                        <button type="button" className="btn btn-success add-user" onClick={() => handleAddUser()}>
                            <i className="fa fa-plus"></i> Add User
                        </button>
                    </div>

                    <div className="input-find" >
                        <form style={{ width: "50%", alignContent: "center" }} className="input-group mb-3 mb-md-2 "
                            role="search">
                            <div className="input-search-product">
                                <input type="search" className="form-control form-control-dark text-bg-light col-6"
                                    placeholder="name user..." aria-label="Search" onChange={(event) => {
                                        setNameSearch("" + (event.target.value))

                                    }} />
                                {listGroups && listGroups.length > 0 ? (
                                    <select className="form-select" style={{ width: "30%" }} value={groupId} onChange={(event) => setGroupId(event.target.value)}  >
                                        <option value="" >Select a group</option>
                                        {listGroups.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>No data found</p>
                                )}
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

                    <table className="table table-primary table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Group Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                listUsers.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{offset + index + 1}</th>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.Group.name}</td>
                                        <td>
                                            <span title="edit" className="edit" onClick={() => handleEditUser(item)}><i className="fa fa-pencil"></i></span>
                                            <span title="delete" className="delete" data-bs-toggle="modal"
                                                data-bs-target="#deleteUser" onClick={() => handleDeleteClick(item.id, item.username)}><i className="fa fa-trash-o"></i></span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-danger">No data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ModalDeleteUser
                        userId={userIdToDelete}
                        fetchAllUser={fetchAllUser}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setListUsers={setListUsers}
                        setTotalPages={setTotalPages}
                        userName={nameUser}
                    />
                    <ModalUser title="Create New User"
                        isShowModal={ishow}
                        setIsShowModal={setIsShow}
                        onUserCreated={refreshPage}
                    />

                    <ModalEditUser title="Edit User"
                        user={user}
                        isShowModal={ishowEdit}
                        setIsShowModal={setIsShowEdit}
                        onUserEdit={refreshPage}
                    />

                    <div className="paginate">
                        {totalPages > 1 && (
                            <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
                        )}
                    </div>
                </div>
            }
        </>
    )

}

export default Users;