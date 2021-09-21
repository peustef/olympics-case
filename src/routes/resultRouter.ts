import express from "express"
import { ResultController } from "../controller/ResultController"

export const resultRouter = express.Router()
const resultController = new ResultController()

resultRouter.get("/rank", resultController.findRank)

resultRouter.post("/register", resultController.register)