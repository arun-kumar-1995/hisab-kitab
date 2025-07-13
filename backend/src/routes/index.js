import { Router } from "express";
import userRoutes from "./user.routes.js";

const appRoutes = Router();
appRoutes.use("/u", userRoutes);

export default appRoutes;
