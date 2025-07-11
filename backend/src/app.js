import express from "express";
import morgan from "morgan";
import appRoutes from "./routes/index.js";
import compression from "compression";
import { ErrorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(compression());

// routes
app.use("/app/v1", appRoutes);

// global middleware
app.use(ErrorMiddleware);

export default app;
