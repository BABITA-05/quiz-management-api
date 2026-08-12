import express from "express";

import {
  registerPlayerController,
  loginPlayerController,
  loginAdminController,
} from "../controllers/authController.js";

const router = express.Router();

// Player registration
router.post("/register", registerPlayerController);

// Player login
router.post("/login", loginPlayerController);

// Admin login
router.post("/admin/login", loginAdminController);

export default router;