
import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT;
    let token = null
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPRIES_IN });
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

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return null
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req)
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "Not authenticated the user"
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "Not authenticated the user"
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.group.Roles;
        let currentUrl = req.path;
        let staticUrl = currentUrl.replace(/\/\d+$/, '');
        if (!roles && roles.length > 0) {
            return res.status(403).json({
                EC: -1,
                DT: "",
                EM: "You don't have permission"
            })
        }

        let canAccess = roles.some(item => item.url === staticUrl)
        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EC: -1,
                DT: "",
                EM: "You don't have permission"
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "Not authenticated the user"
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}