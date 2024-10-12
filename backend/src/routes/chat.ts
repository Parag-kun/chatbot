import { Router } from "express";
import { getChatResponse, getChatResponses, saveChatResponse } from "../controllers/chat";
import { checkAuth } from "../middlewares/auth";

const router = Router();

router.post("/", getChatResponse);
router.put("/", checkAuth, saveChatResponse);
router.get("/:id", checkAuth, getChatResponses)

export default router;
