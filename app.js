import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { PORT, DATABASE, JWT_KEY, JWT_EXPIRE_TIME } from "./config/config.js";
import { WEB_CACHE, MAX_JSON_SIZE, URL_ENCODE } from "./config/config.js";
import { router } from "./routes/studentRoutes.js";
import fileUpload from "express-fileupload";

const app = express();

// Middleware
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ limit: MAX_JSON_SIZE, extended: URL_ENCODE }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(fileUpload());

// Routes
app.use("/api", router);
// Cache
app.set("etag", WEB_CACHE);

//Database Connect
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB Not Connected");
  });

app.listen(PORT, () => {
  console.log("Server Connected on " + PORT);
});
