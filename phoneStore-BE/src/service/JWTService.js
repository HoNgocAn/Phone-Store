import { where } from "sequelize";
import db from "../models/index";

const getGroupWithRoles = async (user) => {
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name"],
        include: {
            model: db.Role,
            attributes: ["id", "url"],
            through: { attributes: [] }
        },

    })
    return roles ? roles : "nothing"
}

module.exports = {
    getGroupWithRoles
}