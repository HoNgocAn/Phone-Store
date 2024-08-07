import express from "express";
import { testAPI, handleRegister, handleLogin, handleLogout } from "../controller/apiController";
import { handleGetListUser, handleCreateUser, handleUpdateUser, handleDeleteUser, getUserAccount, handleGetUserById, handleChangePassword } from "../controller/userController";
import { handleGetListProduct, handleGetAllProduct } from "../controller/productController";
import { handleGetListGroup } from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import { handleGetListRole, handleCreateRole, handleDeleteRole, handleFetchRolesByGroup, handleAssignRoleToGroup } from "../controller/roleController";
import { handleCreateOrder } from "../controller/orderController";
const router = express.Router();

// function checkUser(req, res, next) {
//     const nonSecurePaths = ["/ , /register", "/login"];
//     if (nonSecurePaths.includes(req.path))
//         return next()
//     next();
// }

const initAPIbRoutes = (app) => {

    router.get("/test", testAPI);
    router.post("/register", handleRegister);
    router.post("/logout", handleLogout);
    router.post("/login", handleLogin);
    router.get("/product/list", handleGetListProduct);
    router.get("/product/all", handleGetAllProduct);
    router.get("/user/detail/:id", handleGetUserById);


    router.use(checkUserJWT);
    router.get("/account", getUserAccount);
    router.use(checkUserPermission);


    router.get("/user/list", handleGetListUser);
    router.get("/user/detail/:id", handleGetUserById);
    router.put("/user/changePassword", handleChangePassword);
    router.post("/user/create", handleCreateUser);
    router.put("/user/update", handleUpdateUser);
    router.delete("/user/delete/:id", handleDeleteUser);
    router.get("/group/list", handleGetListGroup);

    router.get("/role/by-group/:groupId", handleFetchRolesByGroup);
    router.post("/role/assign-to-group", handleAssignRoleToGroup);
    router.post("/order/create", handleCreateOrder);

    router.get("/role/list", handleGetListRole);
    router.post("/role/create", handleCreateRole);
    router.delete("/role/delete/:id", handleDeleteRole);


    return app.use("/api", router);
}

export default initAPIbRoutes;