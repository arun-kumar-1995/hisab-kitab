import { Router } from "express";
import authRoutes from "./auth.routes.js";

const appRoutes = Router();
appRoutes.use("/auth", authRoutes);

export default appRoutes;
