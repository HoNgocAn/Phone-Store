import axios from "axios";

const fetchAllRole = () => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.get("http://localhost:8080/api/role/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list role. Please try again later.");
    }
}

const createNewRole = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.post("http://localhost:8080/api/role/create", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during create new role. Please try again later.");
    }
}

const deleteRole = (id) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.delete(`http://localhost:8080/api/role/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete role. Please try again later.");
    }
}

const fetchRolesByGroup = (id) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.get(`http://localhost:8080/api/role/by-group/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get group with role. Please try again later.");
    }
}


const assignRoleToGroup = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.post("http://localhost:8080/api/role/assign-to-group", { data }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get assign role to group. Please try again later.");
    }
}


export { fetchAllRole, createNewRole, deleteRole, fetchRolesByGroup, assignRoleToGroup }