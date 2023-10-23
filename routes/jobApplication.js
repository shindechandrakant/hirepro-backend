import express from "express";
const router = express.Router();
import { jobApplication } from "../controllers/jobApplication.js";

router.post("/apply", jobApplication);

export { router as applyRouter };
