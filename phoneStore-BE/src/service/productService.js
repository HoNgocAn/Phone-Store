
import db from "../models/index"
import { Op } from 'sequelize';

const getListProducts = async (page, limit, nameSearch, minPrice, maxPrice) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Product.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${nameSearch}%`
                },
                price: {
                    [Op.between]: [minPrice, maxPrice]
                }
            },
            offset: offset,
            limit: limit
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows
        }

        if (data) {
            return ({
                EM: "Get list product successful",
                EC: 0,
                DT: data
            });
        } else {
            return ({
                EM: "Get list product successful",
                EC: 0,
                DT: []
            });
        }

    } catch (error) {
        console.log(error);
        return ({
            EM: "Error when getting list of products",
            EC: 1,
            DT: []
        });
    }
}

const getAllProducts = async () => {
    try {

        let data = await db.Product.findAll();

        if (data) {
            return {
                EM: "Get list product successful",
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: "Get list product successful",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getListProducts, getAllProducts
}

