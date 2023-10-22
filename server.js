import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.BACKEND_PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is up & running on PORT ${PORT}`);
});

export { app };
