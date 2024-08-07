
import bcrypt from "bcrypt";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
        console.log("Create New User Successful!");
    } catch (error) {
        console.log(error);
    }
}

const getListUsers = async () => {

    try {
        let users = await db.User.findAll();
        return users;
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
        console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
}

const getUserById = async (id) => {
    let result = {};
    try {
        result = await db.User.findOne({ where: { id: id } });
        return result;
    } catch (error) {
        console.log(error);
    }

}

const updateUser = async (email, username, id) => {

    try {
        await db.User.update({
            email: email,
            username: username
        },
            {
                where: {
                    id: id,
                },
            },
        );
        console.log("Update User Successful!");
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createNewUser, getListUsers, deleteUser, getUserById, updateUser
}