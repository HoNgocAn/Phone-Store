
import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT;
    let token = null
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error);
    }
    return token
}

const verifyToken = (token) => {

    let key = process.env.JWT;
    let data = null

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log("Error verify");
    }

    return data;
}

module.exports = {
    createJWT, verifyToken
}