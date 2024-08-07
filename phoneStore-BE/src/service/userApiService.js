import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);


const getListUsers = async (page, limit, nameSearch, groupId) => {
    try {
        let offset = (page - 1) * limit

        const whereConditions = {
            username: {
                [Op.like]: `%${nameSearch}%`
            }
        };

        // Chỉ thêm điều kiện groupId nếu groupId có giá trị
        if (groupId) {
            whereConditions.groupId = {
                [Op.eq]: groupId
            };
        }

        const { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "username", "email", "phone", "sex", "address", "groupId"],
            include: {
                model: db.Group, attributes: ["id", "name"],
            },
            where: whereConditions,
            offset: offset,
            limit: limit
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        if (data) {
            return ({
                EM: "Get list user successful",
                EC: 0,
                DT: data
            });
        } else {
            return ({
                EM: "Get list user successful",
                EC: 0,
                DT: []
            });
        }

    } catch (error) {
        console.log(error);
    }
}


const hashPassword = (userPassword) => {
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

const createNewUser = async (data) => {

    let isEmailExist = await checkEmail(data.email);


    if (isEmailExist === true) {
        return {
            EM: "The email is already exist",
            EC: 1
        }
    }
    let isPhoneExist = await checkPhone(data.phone);
    if (isPhoneExist === true) {
        return {
            EM: "The phone is already exist",
            EC: 1
        }
    }


    const password = data.password;

    // Hash mật khẩu
    let hashPass = hashPassword(password);

    // Cập nhật data với mật khẩu đã được hash
    data.password = hashPass;

    try {
        await db.User.create(data)
        return {
            EM: "Create new user successful",
            EC: 0,
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id,
            },
        });
        return {
            EM: "Delete user successful",
            EC: 0,
            DT: ""
        }
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
}

const getUserById = async (id) => {
    let data = {};

    try {
        data = await db.User.findOne({ where: { id: id } });
        if (data) {
            return {
                EM: "get user by id successful",
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: "get user by id successful",
                EC: 0,
                DT: data
            }
        }
    } catch (error) {
        console.log(error);
    }

}

const updateUser = async (data) => {

    if (!data || !data.id) {
        return {
            EM: "Missing user ID",
            EC: 1,
        };
    }

    try {
        await db.User.update(data,
            {
                where: {
                    id: data.id,
                },
            },
        );
        return {
            EM: "update user successful",
            EC: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "update user failed",
            EC: -1,
        };
    }

}

const changePassword = async (password, id) => {
    try {
        // Hash mật khẩu trước khi cập nhật
        const hashPass = bcrypt.hashSync(password, salt);
        // Cập nhật thông tin người dùng trong cơ sở dữ liệu

        await db.User.update(
            { password: hashPass },
            {
                where: {
                    id: id,
                },
            },
        );

        return {
            EM: "Change password successful",
            EC: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Change password failed",
            EC: -1,
        };
    }
}

module.exports = {
    createNewUser, getListUsers, deleteUser, getUserById, updateUser, changePassword
}