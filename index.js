import { app } from "./server.js";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
// const { fileUpload } = pkg;

import "./utils/databaseConnection.js";
// routes imports
import { jobsRouter } from "./routes/jobs.js";
import { applyRouter } from "./routes/jobApplication.js";

const options = {
  origin: "*",
};

// Middlewares
app.use(bodyParser.json());
app.use(cors(options));
app.use(fileUpload());

// routes
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/jobs", applyRouter);
