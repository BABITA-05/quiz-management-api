import express from "express";
import { startQuizController,
    submitQuizController,
    getQuizResultController,

 } from "../controllers/quizController.js";

const router = express.Router();

router.post("/start", startQuizController);
router.post("/submit", submitQuizController);
router.get("/result", getQuizResultController);

export default router;