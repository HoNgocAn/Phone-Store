import { getListUsers, deleteUser, createNewUser, updateUser } from "../service/userApiService";


const handleGetListUser = async (req, res) => {
    try {

        let page = req.query.page;
        let data = await getListUsers(+page, 3);
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

module.exports = {
    handleGetListUser, handleCreateUser, handleUpdateUser, handleDeleteUser
};