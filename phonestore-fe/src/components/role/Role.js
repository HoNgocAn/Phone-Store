import React from 'react';
import "./Role.scss";
import { useState, useEffect } from 'react';
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import TableRole from './TableRole';
import { createNewRole } from "../../services/roleService";
import { toast } from "react-toastify";
import { fetchAllRole } from "../../services/roleService";


function Role(props) {

    const dataChilddefault = { id: "", url: "", description: "", isValidUrl: true };

    const [listChilds, setListChilds] = useState({
        child1: dataChilddefault
    })

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getAllRole()
    }, [])


    const getAllRole = async () => {
        try {
            let rs = await fetchAllRole();
            if (rs && +rs.data.EC === 0) {
                setRoles(rs.data.DT); // Cập nhật trạng thái với dữ liệu nhận được
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds)
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChilddefault;
        setListChilds(_listChilds)
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds)
    }

    const buildDataPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child]) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;

    }

    const handleSave = async () => {
        let inValid = Object.entries(listChilds).find(([key, child]) => {
            return child && !child.url;
        })

        if (!inValid) {
            let data = buildDataPersist();
            let rs = await createNewRole(data)
            if (rs && rs.data.EC === 0) {
                toast.success(rs.data.EM);
                getAllRole();
                setListChilds({ 0: { ...dataChilddefault } });
            }

        } else {
            let _listChilds = _.cloneDeep(listChilds);
            const key = inValid[0]
            _listChilds[key]["isValidUrl"] = false;
            setListChilds(_listChilds)
        }

    }


    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title'>
                        <h4>Add new Roles</h4>
                    </div>
                    <div className='role-parents'>
                        {
                            Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div className='row role-child' key={`Child-${key}`}>
                                        <div className='col-5 form-group'>
                                            <label>URL:</label>
                                            <input type="text" className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} value={child.url} onChange={(event) => handleOnchangeInput("url", event.target.value, key)} />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Desciption:</label>
                                            <input type="text" className='form-control' value={child.description} onChange={(event) => handleOnchangeInput("description", event.target.value, key)} />
                                        </div>
                                        <div className='col-2 actions mt-3'>
                                            <i className="fa fa-plus add-role" onClick={() => handleAddNewInput()}></i>
                                            {index >= 1 && <i className="fa fa-trash-o delete-role" onClick={() => handleDeleteInput(key)}></i>}
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className='mt-3'>
                            <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
                <TableRole listRole={roles} />
            </div>

        </div>
    );
}

export default Role;