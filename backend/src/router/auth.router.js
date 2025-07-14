import { Router } from "express";

const authRouter = Router();

authRouter.route("/signin").get((req, res) => {
    res.send("signin");
});

export default authRouter;