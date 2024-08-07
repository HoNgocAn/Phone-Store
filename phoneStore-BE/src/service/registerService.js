import db from "../models/index";
import bcrypt from "bcrypt";
import { Op, where } from "sequelize";
import { getGroupWithRoles } from "../service/JWTService";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const checkEmail = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}

const checkPhone = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const registerNewUser = async (rawUserData) => {

    let isEmailExist = await checkEmail(rawUserData.email);


    if (isEmailExist === true) {
        return {
            EM: "The email is already exist",
            EC: 1
        }
    }
    let isPhoneExist = await checkPhone(rawUserData.phone);
    if (isPhoneExist === true) {
        return {
            EM: "The phone is already exist",
            EC: 1
        }
    }

    let hashPassword = hashUserPassword(rawUserData.password)

    await db.User.create({
        email: rawUserData.email,
        username: rawUserData.username,
        password: hashPassword,
        phone: rawUserData.phone,
        groupId: rawUserData.groupId
    })

    return {
        EM: "A user is create successfully",
        EC: 0
    }
}

const loginUser = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        });

        if (!user) {
            return {
                EM: "Invalid login information",
                EC: 1
            };
        }


        // Kiểm tra mật khẩu
        let isCorrectPassword = checkPassword(rawData.password, user.password);
        if (isCorrectPassword) {

            let group = await getGroupWithRoles(user);
            let payload = {
                id: user.id,
                email: user.email,
                group,
                username: user.username,
            }

            let token = createJWT(payload)
            return {
                EM: "Login successfully",
                EC: 0,
                DT: {
                    access_token: token,
                    group,
                    email: user.email,
                    username: user.username,
                    id: user.id
                }
            };
        } else {
            return {
                EM: "Invalid login information",
                EC: 1
            };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return {
            EM: "Server error",
            EC: -1
        };
    }
};

module.exports = {
    registerNewUser, loginUser
}