import express from "express"
import { addCategory,removeCategory,listCategory } from "../controllers/categoryController.js"

const categoryRouter = express.Router();

categoryRouter.post("/cat-add",addCategory);
categoryRouter.post("/cat-delete",removeCategory);
categoryRouter.get("/cat-list",listCategory)


export default categoryRouter;