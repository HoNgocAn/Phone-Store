import express from "express";
import { homePage, handleCreateUser, handleDeleteUser, handleUpdatePage, handleUpdateUser } from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homePage);
    router.post("/create-user", handleCreateUser);
    router.post("/delete-user/:id", handleDeleteUser);
    router.get("/update-user-page/:id", handleUpdatePage);
    router.post("/update-user/:id", handleUpdateUser);

    return app.use("/", router);
}

export default initWebRoutes;