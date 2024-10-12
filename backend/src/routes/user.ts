import { Router } from "express";
import {
  getCurrentUser,
  getUserChats,
  getUsers,
  loginUser,
  signupUser,
} from "../controllers/user";
import { checkAuth } from "../middlewares/auth";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/current-user", checkAuth, getCurrentUser);
router.get("/:id/chats", checkAuth, getUserChats);
router.get("/", checkAuth, getUsers);

export default router;
