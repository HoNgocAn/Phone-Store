import { getListRole, createNewRole, deleteRole, fetchRoleByGroup, assignRoleToGroup } from "../service/roleApiService";


const handleGetListRole = async (req, res) => {
    try {
        let data = await getListRole();

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


const handleCreateRole = async (req, res) => {

    try {
        let data = await createNewRole(req.body);

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

const handleDeleteRole = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("check id", id);
        let data = await deleteRole(id)
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

const handleFetchRolesByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await fetchRoleByGroup(id)
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

const handleAssignRoleToGroup = async (req, res) => {
    try {

        let data = await assignRoleToGroup(req.body.data);
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
    handleGetListRole, handleCreateRole, handleDeleteRole, handleFetchRolesByGroup, handleAssignRoleToGroup
}
