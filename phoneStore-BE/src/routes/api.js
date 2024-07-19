import express from "express";
import { testAPI, handleRegister, handleLogin } from "../controller/apiController";
import { handleGetListUser, handleCreateUser, handleUpdateUser, handleDeleteUser } from "../controller/userController";
import { handleGetListGroup } from "../controller/groupController"

const router = express.Router();

const initAPIbRoutes = (app) => {

    router.get("/test", testAPI);
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);

    router.get("/user/list", handleGetListUser);
    router.post("/user/create", handleCreateUser);
    router.put("/user/update", handleUpdateUser);
    router.delete("/user/delete/:id", handleDeleteUser);

    router.get("/group/list", handleGetListGroup);


    return app.use("/api", router);
}

export default initAPIbRoutes;