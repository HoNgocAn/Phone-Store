import axios from "axios";

const fetchAllGroup = () => {
    try {
        return axios.get("http://localhost:8080/api/group/list");
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during get list group. Please try again later.");
    }
}


export { fetchAllGroup }