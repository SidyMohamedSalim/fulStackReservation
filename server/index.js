import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";
import { tourRouter } from "./routes/tourRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/tour", tourRouter);

app.listen(PORT, () => {
  console.log(`Port: ${PORT}  server are running... `);
});
