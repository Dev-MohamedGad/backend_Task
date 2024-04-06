import { sql_Config } from "../connection.js";
import { DataTypes } from "sequelize";
import PhoneNumber from "./phone_number.model.js";
import Skill from "./skill.model.js";

const User = sql_Config.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  age: { type: DataTypes.INTEGER },
  password: { type: DataTypes.STRING, allowNull: false },
});

// Define associations
User.hasMany(PhoneNumber, { as: "phoneNumbers", foreignKey: 'userId' }); // One User has many PhoneNumbers
User.hasMany(Skill, { as: "skills", foreignKey: 'userId' }); // One User has many Skills


export default User;
