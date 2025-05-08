import express from "express"
import { addCategory,removeCategory,listCategory,updateCategory } from "../controllers/categoryController.js"
import multer from "multer"

const categoryRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


categoryRouter.post("/cat-add",upload.single("image"),addCategory);
categoryRouter.post("/cat-edit",updateCategory);
categoryRouter.post("/cat-delete",removeCategory);
categoryRouter.get("/cat-list",listCategory)


export default categoryRouter;