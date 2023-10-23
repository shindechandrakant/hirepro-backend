import { sequelize } from "../utils/databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";
import { Job } from "./job.js";

export const JobApplication = sequelize.define("job_application", {
  first_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  headline: {
    type: DataTypes.STRING(30),
  },
  coverletter: {
    type: DataTypes.STRING(2024),
  },
  resume: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
  },
  job_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

JobApplication.belongsTo(Job, { foreignKey: "job_id" });
