import path from 'path';
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIbRoutes from "./routes/api";
require('dotenv').config();
import bodyParser from "body-parser";
import connection from "./config/connectionDB";
import cors from 'cors';
import configCORS from "./config/cors"; // Import configCORS
import cookieParser from "cookie-parser";


const app = express();

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


connection();

// Sử dụng configCORS để lấy corsOptions
const corsOptions = configCORS();

// Sử dụng middleware cors với corsOptions
app.use(cors(corsOptions));

app.use(cookieParser());


initWebRoutes(app);
initAPIbRoutes(app);



const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});