// skill.model.js
import { sql_Config } from "../connection.js";
import { DataTypes } from "sequelize";

const Skill = sql_Config.define("Skill", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export default Skill;
