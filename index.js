import { app } from "./server.js";
import cors from "cors";
import "./utils/databaseConnection.js";
// routes imports
import { jobsRouter } from "./routes/jobs.js";

// Middlewares
app.use(cors());

// routes
app.use("/api/v1/jobs", jobsRouter);
