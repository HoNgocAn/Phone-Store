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

const fetchAllUser = (page) => {
    try {
        return axios.get(`/api/user/list?page=${page}`);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list user. Please try again later.");
    }
}

const deleteUser = (id) => {
    try {
        return axios.delete(`/api/user/delete/${id}`);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const createUser = (data) => {
    try {
        return axios.post("/api/user/create", data);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

const updateUser = (data) => {
    try {
        return axios.put("/api/user/update", data);

    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}

export { registerNewUser, loginUser, fetchAllUser, deleteUser, createUser, updateUser }