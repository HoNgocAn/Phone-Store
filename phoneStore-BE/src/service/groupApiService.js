import db from "../models/index";

const getListGroup = async () => {
    try {

        let data = await db.Group.findAll({
            order: [["name", "ASC"]]
        })

        if (data) {
            return {
                EM: "Get list group successful",
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: "Get list group successful",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getListGroup
}