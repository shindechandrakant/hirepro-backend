import express from "express";
const router = express.Router();
import { getJobById, getAllActiveJobs } from "../controllers/jobs.js";

router.get("/list", getAllActiveJobs);
router.get("/detail/:jobId", getJobById);

export { router as jobsRouter };
