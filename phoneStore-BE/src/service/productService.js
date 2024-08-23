
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

const createNewProduct = async (data) => {
    try {
        await db.Product.create(data);
        return {
            EM: "Create new product successful",
            EC: 0,
        };
    } catch (error) {
        console.error("Error creating new product:", error);
        return {
            EM: "Failed to create new product",
            EC: 1,
        };
    }
};

const getProductById = async (id) => {
    let data = {};

    try {
        data = await db.Product.findOne({ where: { id: id } });
        if (data) {
            return {
                EM: "get product by id successful",
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: "get product by id successful",
                EC: 0,
                DT: data
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getListProducts, getAllProducts, createNewProduct, getProductById
}

