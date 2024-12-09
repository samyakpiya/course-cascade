import express from "express";
import { getCourse, listCourses } from "../controllers/courseController";

const router = express.Router();

router.get("/", listCourses);
router.get("/:courseId", getCourse);

export default router;
