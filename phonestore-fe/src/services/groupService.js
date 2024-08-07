import axios from "axios";

const fetchAllGroup = () => {
    try {
        const token = sessionStorage.getItem("jwt");
        return axios.get("http://localhost:8080/api/group/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list group. Please try again later.");
    }
}


export { fetchAllGroup }