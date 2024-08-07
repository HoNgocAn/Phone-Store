import { getListProducts, getAllProducts } from "../service/productService";

const handleGetListProduct = async (req, res) => {
    try {


        let page = req.query.page;
        let nameSearch = req.query.nameSearch || '';
        let minPrice = req.query.minPrice || 0;
        let maxPrice = req.query.maxPrice || 10000;
        let data = await getListProducts(+page, 9, nameSearch, minPrice, maxPrice);
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

const handleGetAllProduct = async (req, res) => {
    try {

        let data = await getAllProducts();
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


// const handleCreateUser = async (req, res) => {
//     try {
//         let data = await createNewUser(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         return res.status(500).json({
//             EM: "error from server",
//             EC: "-1",
//             DT: ""
//         })
//     }
// }

// const handleUpdateUser = async (req, res) => {
//     try {
//         let data = await updateUser(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         return res.status(500).json({
//             EM: "error from server",
//             EC: "-1",
//             DT: ""
//         })
//     }
// }

// const handleDeleteUser = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let data = await deleteUser(id)
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         return res.status(500).json({
//             EM: "error from server",
//             EC: "-1",
//             DT: ""
//         })
//     }
// }



module.exports = {
    handleGetListProduct, handleGetAllProduct
};