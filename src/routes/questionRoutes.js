import express from "express";
import { validateQuestion } from "../middleware/validateQuestion.js";
import { authenticate, adminOnly } from "../middleware/authMiddleware.js";

import {
  createQuestionController,
  getAllQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
  getQuestionsBySubjectController,
  getQuestionsByDifficultyController,
  getRandomQuestionsController,

} from "../controllers/questionController.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  adminOnly,
  validateQuestion,
  createQuestionController
);

router.get("/", getAllQuestionsController);

router.get(
  "/subject/:subject",
  getQuestionsBySubjectController
);

router.get(
  "/difficulty/:difficulty",
  getQuestionsByDifficultyController
);

router.get(
  "/random",
  getRandomQuestionsController
);

router.get("/:id", getQuestionByIdController);

router.put(
  "/:id",
  authenticate,
  adminOnly,
  validateQuestion,
  updateQuestionController
);

router.delete(
  "/:id",
  authenticate,
  adminOnly,
  deleteQuestionController
);


export default router;