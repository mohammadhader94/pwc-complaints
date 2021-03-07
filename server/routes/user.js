import express from "express";
const router = express.Router();

import { signin, signup, googleSignIn } from "../controllers/user.js";

router.post("/googleSignIn", googleSignIn);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
