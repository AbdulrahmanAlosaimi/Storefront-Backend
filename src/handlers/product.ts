import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

import dotenv from "dotenv";
dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.body.id));
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
  };

  try {
    const productRecord = await store.create(product);
    res.json(productRecord);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  await store.delete(parseInt(req.params.id));
  console.log(`Product with id ${req.params.id} has been deleted`);
  res.send(`Product with id ${req.params.id} has been deleted`);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    console.log(jwt.verify(token, process.env.TOKEN_SECRET as string));
    next();
  } catch (err) {
    console.log(`Invalid authentication when deleting record.`);

    res.status(401);
    res.json(`Invalid token: ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  // app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/:id", verifyAuthToken, destroy);
};

export default productRoutes;
