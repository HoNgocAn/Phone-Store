import { Sequelize } from "sequelize";

const sequelize = new Sequelize('exam', 'root', '123456', {
    host: 'localhost',
    dialect: "mysql",
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connection;