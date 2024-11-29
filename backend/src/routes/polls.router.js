import { Router } from "express";
import {
    createPoll,
    getPolls,
    getPollById,
    votePoll,
} from "../controllers/poll.controllers.js";

const router = Router();

router.post("/polls", createPoll);
router.get("/polls", getPolls);
router.get("/polls/:id", getPollById);
router.post("/polls/:id/vote", votePoll);

export default router;
