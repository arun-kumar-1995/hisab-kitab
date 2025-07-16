import { Router } from "express";
import { pendingAccounts } from "../controllers/admin.controller.js";
const adminRoutes = Router();

adminRoutes.route("/").get(pendingAccounts);

export default adminRoutes;
