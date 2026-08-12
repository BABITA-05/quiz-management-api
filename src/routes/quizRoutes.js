import express from "express";
import { startQuizController,
    submitQuizController,
    getQuizResultController,

 } from "../controllers/quizController.js";
 import {
  authenticate,
  playerOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", startQuizController);
router.post(
  "/submit",
  authenticate,
  playerOnly,
  submitQuizController
);
router.get("/result/:playerId", getQuizResultController);

export default router;