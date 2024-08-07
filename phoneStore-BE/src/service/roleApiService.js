
import db from "../models/index";

const getListRole = async () => {
    try {

        let data = await db.Role.findAll({
            attributes: ["id", "url", "description"],
        })

        if (data) {
            return {
                EM: "Get list role successful",
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: "Get list role successful",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const createNewRole = async (roles) => {
    try {

        let currentRole = await db.Role.findAll({
            attributes: ["url", "description"],
        })

        const persists = roles.filter(({ url: url1 }) =>
            !currentRole.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: "Nothing to create...",
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create roles succeeds: ${persists.length}`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);
    }
}


const deleteRole = async (id) => {
    try {
        const role = await db.Role.findOne({ where: { id: id } });
        if (role && role.url === '/role/create' || role.url === '/role/delete' || role.url === '/role/list') {
            return {
                EM: "Cannot delete role with this name",
                EC: 1,
                DT: ""
            }
        }

        await db.Role.destroy({
            where: {
                id: id,
            },
        });
        return {
            EM: "Delete role successful",
            EC: 0,
            DT: ""
        }
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
}


const fetchRoleByGroup = async (groupId) => {

    try {
        let roles = await db.Group.findOne({
            where: { id: groupId },
            attributes: ["id", "name"],
            include: {
                model: db.Role,
                attributes: ["id", "url"],
                through: { attributes: [] }
            },

        })
        if (roles) {
            return {
                EM: "Get group with role successful",
                EC: 0,
                DT: roles
            }
        } else {
            return {
                EM: "Get group with role successful",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const assignRoleToGroup = async (data) => {
    try {

        await db.GroupRole.destroy({
            where: { groupId: +data.groupId }
        })

        await db.GroupRole.bulkCreate(data.groupRoles)

        return {
            EM: "Assign Role to Group successful",
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getListRole, createNewRole, deleteRole, fetchRoleByGroup, assignRoleToGroup
}