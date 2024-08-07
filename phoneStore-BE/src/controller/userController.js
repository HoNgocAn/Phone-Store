import { getListUsers, deleteUser, createNewUser, updateUser, getUserById, changePassword } from "../service/userApiService";


const handleGetListUser = async (req, res) => {
    try {

        let page = req.query.page;
        let nameSearch = req.query.nameSearch || '';
        let groupId = req.query.groupId || '';
        let data = await getListUsers(+page, 3, nameSearch, groupId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const handleCreateUser = async (req, res) => {
    try {
        let data = await createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        let data = await updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const handleDeleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await deleteUser(id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: "get user account successfully",
        EC: 0,
        DT: {
            id: req.user.id,
            access_token: req.token,
            group: req.user.group,
            email: req.user.email,
            username: req.user.username
        }
    })
}

const handleGetUserById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await getUserById(id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const handleChangePassword = async (req, res) => {
    try {
        let password = req.body.password;
        let id = req.body.id
        console.log("Check id, password", id, password);

        let data = await changePassword(password, id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}



module.exports = {
    handleGetListUser, handleCreateUser, handleUpdateUser, handleDeleteUser, handleGetUserById, getUserAccount, handleChangePassword
};