import express from "express";
export const router = express.Router();

import * as StudentsController from "../controller/StudentsController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import * as FileController from "../controller/FileController.js";
// Student Routes
router.post("/Register", StudentsController.Register);
router.post("/Login", StudentsController.Login);
router.get(
  "/ProfileDetails",
  AuthMiddleware,
  StudentsController.ProfileDetails
);
router.post("/ProfileUpdate", AuthMiddleware, StudentsController.ProfileUpdate);

// Upload Routes
router.post("/uploadFile", FileController.uploadFile);
router.get("/readUploadFile/:fileName", FileController.readUploadFile);
router.post("/deleteUploadFile/:fileName", FileController.deleteUploadFile);
