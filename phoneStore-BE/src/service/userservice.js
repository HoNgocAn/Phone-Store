
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import Bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'exam',
        Promise: Bluebird
    });
    let hashPass = hashPassword(password);

    try {
        await connection.execute(
            "INSERT INTO users (email, password, username) VALUES (?, ?, ?)", [email, hashPass, username]);
        console.log("Create New User Successful!");
    } catch (error) {
        console.log(error);
    }
}

const getListUsers = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'exam',
        Promise: Bluebird
    });

    try {
        let [results, fields] = await connection.query("Select * from Users");
        return results;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'exam',
        Promise: Bluebird
    });

    try {
        await connection.execute(
            "DELETE FROM users WHERE id = ?", [id]
        );
        console.log("Delete User Successful!");
    } catch (error) {
        console.log(error);
    }

}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'exam',
        Promise: Bluebird
    });
    try {
        const [result] = await connection.execute(
            "SELECT * FROM users WHERE id = ?", [id]
        );
        return result;
    } catch (error) {
        console.log(error);
    }

}

const updateUser = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'exam',
        Promise: Bluebird
    });
    try {
        await connection.execute(
            "UPDATE users SET email=?, username=? WHERE id = ?", [email, username, id]
        );
        console.log("Update User Successful!");
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createNewUser, getListUsers, deleteUser, getUserById, updateUser
}