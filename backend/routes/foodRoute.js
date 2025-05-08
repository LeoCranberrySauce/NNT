import express from "express"
import { addFood,updatingFood,removeFood,listFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.post("/update",upload.single("image"),updatingFood);
foodRouter.post("/remove",removeFood);
foodRouter.get("/list",listFood);




export default foodRouter;
