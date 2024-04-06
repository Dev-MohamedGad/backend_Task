// phone_number.model.js
import { sql_Config } from "../connection.js";
import { DataTypes } from "sequelize";

const PhoneNumber = sql_Config.define("PhoneNumber", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.STRING, allowNull: false },
});

export default PhoneNumber;
