import { Sequelize } from "sequelize";

export const sql_Config = new Sequelize("db_form", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const db_connection = async () => {
  await sql_Config
    .sync({ alter: true, force: false })
    .then((res) => console.log("Connection Success"))
    .catch((err) => console.log("Connection Fail" +err));
};