//#region import package
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http, { get } from "http";

//#region initialize server
dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
//#end region

//#region setup middleware
app.use(cors({ credentials: true, origin: true, exposedHeaders: "*" }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));

//#end region
import userRouter from "./routers/UserRouter.js";
import authRouter from "./routers/AuthRouter.js";
import categoryRouter from "./routers/CategoryRouter.js";
import courseRouter from "./routers/CourseRouter.js";
import commentRouter from "./routers/CommentRouter.js";
import videoRouter from "./routers/VideoRouter.js";
import otpRouter from "./routers/OtpRouter.js";
import reviewRouter from "./routers/ReviewRouter.js";
import likeRouter from "./routers/LikeRouter.js";
//#region import router

//#end region

//#region setup router
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/courses", courseRouter);
app.use("/api/comments", commentRouter);
app.use("/api/videos", videoRouter);
app.use("/api/otps", otpRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/likes", likeRouter);
//#end region

//#region background tasks
import "./services/agenda.js";
//#end region

//#region connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB");
    console.log(e.message);
  });

//#end region

//#region start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
//#end region

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World!",
  });
});
export default app;
