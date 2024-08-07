import React, { useState, useEffect, useContext } from "react";
import { fetchAllRole, deleteRole } from "../../services/roleService";
import "./Role.scss";
import { toast } from "react-toastify";

function TableRole(props) {


    const [listRole, setListRole] = useState(props.listRole);

    useEffect(() => {
        getAllRole();
    }, [])

    useEffect(() => {
        setListRole(props.listRole);
    }, [props.listRole]);



    const getAllRole = async () => {
        try {
            let rs = await fetchAllRole();
            if (rs && +rs.data.EC === 0) {
                setListRole(rs.data.DT); // Cập nhật trạng thái với dữ liệu nhận được
            }
        } catch (error) {
            console.error(error);
        }
    }



    const handleDeleteClick = async (id) => {
        try {
            let rs = await deleteRole(id);
            if (rs && rs.data.EC === 0) {
                toast.success(rs.data.EM);
            }

            if (rs && rs.data.EC === 1) {
                toast.error(rs.data.EM);
            }


            // Lấy danh sách người dùng hiện tại
            await getAllRole();

        } catch (error) {
            console.log(error);
        }
    }

    const handleEditUser = (role) => {
        console.log(role);
    }


    return (
        <div className='contaner'>
            <h3 className="mb-3 mt-3">List Roles</h3>
            <table className="table table-primary table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">URL</th>
                        <th scope="col">Desciption</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRole && listRole.length > 0 ? (
                        listRole.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.url}</td>
                                <td>{item.description}</td>
                                <td>
                                    <span title="edit" className="edit-role" onClick={() => handleEditUser(item)}><i className="fa fa-pencil"></i></span>
                                    <span title="delete" className="delete-role"
                                        onClick={() => handleDeleteClick(item.id)}><i className="fa fa-trash-o"></i></span>
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
        </div>
    );
}

export default TableRole;