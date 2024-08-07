import React, { useEffect, useState } from 'react';
import "./GroupRole.scss";
import { fetchAllGroup } from "../../services/groupService";
import { fetchAllRole, fetchRolesByGroup, assignRoleToGroup } from "../../services/roleService";
import _ from "lodash";
import { toast } from 'react-toastify';

function GroupRole(props) {

    const [listGroups, setListGroups] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getAllGroups();
        getAllRole();
    }, []);




    const getAllGroups = async () => {
        try {
            let rs = await fetchAllGroup();
            if (rs && +rs.data.EC === 0) {
                setListGroups(rs.data.DT)
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


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

    const handleSelectGroup = async (value) => {
        setSelectGroup(value)
        console.log(value);
        if (value) {
            let rs = await fetchRolesByGroup(value)
            if (rs && +rs.data.EC === 0) {
                let data = buildDataRolesByGroup(rs.data.DT.Roles, listRole);
                setAssignRolesByGroup(data)
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let obj = {};
                obj.id = role.id;
                obj.url = role.url;
                obj.description = role.description;
                obj.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    obj.isAssigned = groupRoles.some(item => item.url === obj.url)
                }
                result.push(obj)
            })
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }

    const buildDataToSave = () => {
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = selectGroup;
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        })
        result.groupRoles = finalGroupRoles
        return result;
    }

    const handleSave = async () => {
        let data = buildDataToSave();
        console.log(data);
        let rs = await assignRoleToGroup(data)
        if (rs && rs.data.EC === 0) {
            toast.success(rs.data.EM)
        } else {
            toast.error(rs.data.EM)
        }
    }

    return (
        <div className='Group-Role'>
            <div className='container'>
                <div className='title mt-3'>
                    <h4>Group Role</h4>
                </div>
                <div className='row'>
                    <label> Select group (<span className="red">*</span>) </label>
                    {listGroups && listGroups.length > 0 ? (
                        <select className="form-select" onChange={(event) => handleSelectGroup(event.target.value)} >
                            <option value="" >Please select your group </option>
                            {listGroups.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    ) : (
                        <p>Không tìm thấy dữ liệu</p>
                    )}
                </div>
                <hr />
                {selectGroup &&
                    <div className='row'>

                        <h5>Assign Roles</h5>
                        {assignRolesByGroup && assignRolesByGroup.length > 0 ? (
                            assignRolesByGroup.map((item, index) => (
                                <div className="form-check" key={item.id}>
                                    <input className="form-check-input" type="checkbox" value={item.id} id={item.id} checked={item.isAssigned}
                                        onChange={(event) => handleSelectRole(event.target.value)} />
                                    <label className="form-check-label" htmlFor={item.id}>
                                        {item.url}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <div colSpan="5">Không tìm thấy dữ liệu</div>
                        )}
                        <div className='mt-3 ' >
                            <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}

export default GroupRole;