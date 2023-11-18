import express from "express";
import { check } from "express-validator";
const router = express.Router();
import { jobApplication } from "../controllers/jobApplication.js";

router.post(
  "/apply",
  [
    check("first_name", "First Name is required").isLength({ min: 1, max: 20 }),
    check("last_name", "Last Name is required")
      .trim()
      .isLength({ min: 1, max: 20 }),
    check("email", "Email is required").trim().isEmail(),
    check("phone", "Phone is required").trim().isLength({ min: 10, max: 15 }),
    check("job_id", "Job Id is required").trim().isLength({ min: 1, max: 15 }),
  ],
  jobApplication
);

export { router as applyRouter };
