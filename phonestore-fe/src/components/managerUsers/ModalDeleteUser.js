import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";

function ModalDeleteUser({ userId, fetchAllUser, currentPage, setCurrentPage, setListUsers, setTotalPages, userName }) {


    const handleDeleteUser = async () => {
        try {
            let rs = await deleteUser(userId);
            toast.success(rs.EM);
            // Lấy danh sách người dùng hiện tại
            let updatedUsers = await fetchAllUser(currentPage);

            // Xác định trang mới
            let newPage = currentPage;
            if (updatedUsers.DT.users.length === 0 && currentPage > 1) {
                newPage = currentPage - 1;
            }
            // Cập nhật trạng thái trang và danh sách người dùng
            setCurrentPage(newPage);
            updatedUsers = await fetchAllUser(newPage);
            setListUsers(updatedUsers.DT.users);
            setTotalPages(updatedUsers.DT.totalPages);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <div className="modal fade" id="deleteUser" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xóa người dùng</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa {userName} không  ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => handleDeleteUser()}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDeleteUser;