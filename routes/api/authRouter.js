import express from "express";

import { validateBody, authenticate } from "../../middlewares/index.js";
import { schemas } from "../../models/user.js";
import ctrl from "../../controllers/authController.js";

const authRouter = express.Router();

//sign up
authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

//sign in
authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

export default authRouter;
