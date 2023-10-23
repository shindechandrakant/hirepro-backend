import { Sequelize, DataTypes } from "sequelize";
import { Company } from "./Company.js";
import { sequelize } from "../utils/databaseConnection.js";

// Define the Jobs model
export const Job = sequelize.define(
  "job",
  {
    job_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
    },
    company_id: {
      type: DataTypes.STRING(100),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

Job.belongsTo(Company, { foreignKey: "company_id" });
