import { Router } from "express";
import home from "./routes/home";
import refreshToken from "./routes/refreshToken";

const router = Router();

router.get("/", home);

router.post("/refresh-token", refreshToken);

export default router;
