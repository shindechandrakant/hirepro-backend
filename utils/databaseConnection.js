import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["../entity/*.js"],
});

// myDataSource
//   .initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });

import { Sequelize } from "sequelize";
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

export { myDataSource, sequelize };
