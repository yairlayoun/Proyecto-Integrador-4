// sessionsRouter.js
import express from "express";
import * as sessionsController from "../controllers/sessions/sessionsController.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  await sessionsController.loginUser(req, res);
});

export default router;
