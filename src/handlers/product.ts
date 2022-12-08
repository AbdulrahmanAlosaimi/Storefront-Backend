import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

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
  try {
    const product: Product = {
      name: req.body.name,
      price: parseInt(req.body.price),
      category: req.body.category,
    };
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

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
};

export default productRoutes;
