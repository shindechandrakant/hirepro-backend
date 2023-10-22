import express from "express";
const router = express.Router();
import { getJobById } from "../controllers/jobs.js";

router.get("/:jobId", getJobById);
export { router as jobsRouter };
