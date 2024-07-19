import { useState, useEffect } from "react";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import "./Users.scss";
import { useNavigate } from 'react-router-dom';
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import 'font-awesome/css/font-awesome.min.css';


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

    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const handleDeleteClick = (userId, username) => {
        setUserIdToDelete(userId);
        setNameUser(username)
    };


    useEffect(() => {
        getAllUsers(1)
    }, [])


    const getAllUsers = async (page) => {
        try {

            let rs = await fetchAllUser(page);

            setListUsers(rs.DT.users); // Cập nhật trạng thái với dữ liệu nhận được
            setTotalPages(rs.DT.totalPages)
            setCurrentPage(page)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const handlePageClick = (event) => {
        getAllUsers(event.selected + 1)
    }

    const handleAddUser = () => {
        setIsShow(true)
    }

    const handleEditUser = (item) => {
        setIsShowEdit(true)
        setUser(item)
    }

    const handleRefresh = () => {
        navigate("/")
    }

    const refreshPage = () => {
        getAllUsers(currentPage);
    }


    return (
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
                            <td colSpan="5">Không tìm thấy dữ liệu</td>
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
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Sau>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalPages}
                        previousLabel="<Trước"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                )}
            </div>
        </div>
    )

}

export default Users;