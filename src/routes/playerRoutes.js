import express from "express";

import {
  createPlayerController,
  getAllPlayersController,
  getPlayerByIdController,
  updatePlayerController,
  deletePlayerController,
  getPlayerResultsController,
} from "../controllers/playerController.js";

const router = express.Router();

router.post("/", createPlayerController);
router.get("/", getAllPlayersController);
router.get("/:id", getPlayerByIdController);
router.put("/:id", updatePlayerController);
router.delete("/:id", deletePlayerController);
router.get("/:id/results", getPlayerResultsController);

export default router;