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

export { fetchAllProduct, fetchProductList }
