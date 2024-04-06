import { Router } from "express";
import * as authController from './auth.controller.js';
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signUpSchema } from "./auth.validation.js";
const UserRouter = Router();

// Route for user sign-up
UserRouter.post('/signUp', validationMiddleware(signUpSchema), expressAsyncHandler(authController.signUp));

// Route for user login
UserRouter.post('/login', expressAsyncHandler(authController.signIn));

export default UserRouter;
