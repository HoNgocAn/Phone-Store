import express from "express";
import { testAPI, handleRegister, handleLogin, handleLogout } from "../controller/apiController";
import { handleGetListUser, handleCreateUser, handleUpdateUser, handleDeleteUser, getUserAccount, handleGetUserById, handleChangePassword } from "../controller/userController";
import { handleGetListProduct, handleGetAllProduct, handleCreateProduct, handleGetProductById } from "../controller/productController";
import { handleGetListGroup } from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import { handleGetListRole, handleCreateRole, handleDeleteRole, handleFetchRolesByGroup, handleAssignRoleToGroup } from "../controller/roleController";
import { handleCreateOrder } from "../controller/orderController";
import { handlePayPal, handleCaptureOrder } from "../controller/paypalController";
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images'));// Đường dẫn thư mục lưu trữ file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file
    }
});

const upload = multer({ storage: storage });

const initAPIbRoutes = (app) => {

    router.get("/test", testAPI);
    router.post("/register", handleRegister);
    router.post("/logout", handleLogout);
    router.post("/login", handleLogin);
    router.get("/product/list", handleGetListProduct);
    router.get("/product/all", handleGetAllProduct);
    router.get("/product/detail/:id", handleGetProductById);
    router.post("/product/create", upload.single('image'), handleCreateProduct);
    router.get("/user/detail/:id", handleGetUserById);


    router.use(checkUserJWT);
    router.get("/account", getUserAccount);
    router.use(checkUserPermission);



    router.get("/user/list", handleGetListUser);

    router.put("/user/changePassword", handleChangePassword);
    router.post("/user/create", handleCreateUser);
    router.put("/user/update", handleUpdateUser);
    router.delete("/user/delete/:id", handleDeleteUser);
    router.get("/group/list", handleGetListGroup);

    router.get("/role/by-group/:groupId", handleFetchRolesByGroup);
    router.post("/role/assign-to-group", handleAssignRoleToGroup);
    router.post("/order/create", handleCreateOrder);
    router.post("/paypal/create-order", handlePayPal);
    router.post("/paypal/capture-order", handleCaptureOrder);

    router.get("/role/list", handleGetListRole);
    router.post("/role/create", handleCreateRole);
    router.delete("/role/delete/:id", handleDeleteRole);

    app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

    return app.use("/api", router);
}

export default initAPIbRoutes;