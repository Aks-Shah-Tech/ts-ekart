import express, { Request, Response } from "express"
import { sampleProducts } from "../data"
import { ProductModel } from "../models/productModel"
import asyncHandler from 'express-async-handler'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)
    res.json({ createdProducts })
  })
)