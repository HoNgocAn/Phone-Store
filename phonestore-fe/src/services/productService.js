import axios from "../setup/axios";


const fetchAllProduct = (page, nameSearch, minPrice, maxPrice) => {
    try {
        return axios.get(`/api/product/list?page=${page}&nameSearch=${nameSearch}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list product. Please try again later.");
    }
}

const fetchProductList = () => {
    try {
        return axios.get("/api/product/all");
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list product. Please try again later.");
    }
}

const createProduct = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.post("/api/product/create", data);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during create product. Please try again later.");
    }
}

const fetchProductrById = (id) => {
    try {
        return axios.get(`/api/product/detail/${id}`);
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during delete user. Please try again later.");
    }
}


export { fetchAllProduct, fetchProductList, createProduct, fetchProductrById }
