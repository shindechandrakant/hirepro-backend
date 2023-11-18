import { Sequelize } from "sequelize";

console.log(process.env.DATABASE_NAME);
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE,
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

export { sequelize };
