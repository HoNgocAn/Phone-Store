import axios from "../setup/axios";

const registerNewUser = (data) => {
    try {
        return axios.post("/api/register", data);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during registration. Please try again later.");
    }
}

const loginUser = (data) => {
    try {
        return axios.post("/api/login", data);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during login. Please try again later.");
    }
}

const fetchAllUser = (page, nameSearch, groupId) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.get(`/api/user/list?page=${page}&nameSearch=${nameSearch}&groupId=${groupId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list user. Please try again later.");
    }
}

const deleteUser = (id) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.delete(`/api/user/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const createUser = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.post("/api/user/create", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const updateUser = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.put("/api/user/update", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const getUserAccount = () => {
    try {
        return axios.get("/api/account");
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get user account. Please try again later.");
    }
}

const logoutUser = () => {
    try {
        return axios.post("/api/logout");
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during logout. Please try again later.");
    }
}


const fetchUserById = (id) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.get(`/api/user/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const changePassword = (password, id) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.put("/api/user/changePassword", { password, id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}


export { registerNewUser, loginUser, logoutUser, fetchAllUser, deleteUser, createUser, updateUser, getUserAccount, fetchUserById, changePassword }