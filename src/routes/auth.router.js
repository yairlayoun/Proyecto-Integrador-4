// auth.router.js
import express from "express";
import * as authController from "../dao/fileSystem/controllers/auth/authController.js";

const authRouter = express.Router(); 

authRouter.post("/register", async (req, res) => {
  await authController.registerUser(req, res);
});

authRouter.post("/login", async (req, res) => {
  await authController.loginUser(req, res);
});

authRouter.get("/logout", async (req, res) => {
  await authController.logOutUser(req, res);
});

authRouter.post("/recovery", async (req, res) => {
  await authController.recoveryPassword(req, res);
});

authRouter.post('/reset-password', authController.requestPasswordReset);


authRouter.post('/reset-password/:resetToken', authController.resetPassword);


authRouter.get("/reset-password/:resetToken", authController.renderResetPasswordPage);

export default authRouter;
