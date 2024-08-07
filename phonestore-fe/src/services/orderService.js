import axios from "axios";

const createNewOrder = (data) => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.post("http://localhost:8080/api/order/create", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during create new order. Please try again later.");
    }
}

export { createNewOrder }