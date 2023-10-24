import { sequelize } from "../utils/databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";
// Define the Company model
export const Company = sequelize.define(
  `companies`,
  {
    company_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
    },
    tagline: {
      type: DataTypes.STRING(50),
    },
    about: {
      type: DataTypes.STRING(1000),
    },
    logo: {
      type: DataTypes.STRING(100),
    },
    website: {
      type: DataTypes.STRING(100),
    },
    banner: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);
