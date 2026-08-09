import express from "express";
import { validateQuestion } from "../middleware/validateQuestion.js";

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

router.post("/",validateQuestion, createQuestionController);
router.get("/", getAllQuestionsController);
router.get("/subject/:subject", getQuestionsBySubjectController);
router.get(
  "/difficulty/:difficulty",
  getQuestionsByDifficultyController
);
router.get("/random", getRandomQuestionsController);
router.get("/:id", getQuestionByIdController);
router.put("/:id",
  validateQuestion, updateQuestionController);
router.delete("/:id", deleteQuestionController);


export default router;