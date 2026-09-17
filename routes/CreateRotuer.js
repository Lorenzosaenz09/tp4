import  router from "express";
import { CreateController } from "../controllers/CreateController.js";

const router = router();

router.post("/createuser", CreateController.PostCreateuser);

export default router;