import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config();
import bodyParser from "body-parser";

const app = express();

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});