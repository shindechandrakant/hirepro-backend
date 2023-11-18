import { sequelize } from "../utils/databaseConnection.js";
import { Job } from "./jobs.js";
import { DataTypes } from "sequelize";

export const JobField = sequelize.define(
  "job_field",
  {
    field_name: {
      type: DataTypes.STRING(50),
    },
    field_description: {
      type: DataTypes.STRING(1024),
    },
    job_id: {
      type: DataTypes.STRING(10),
    },
  },
  {
    timestamps: false,
  }
);

JobField.belongsTo(Job, { foreignKey: "job_id" });
