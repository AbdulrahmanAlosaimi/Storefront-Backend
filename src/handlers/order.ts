import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.body.id));
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      productId: parseInt(req.body.productId),
      quantity: parseInt(req.body.quantity),
      userId: parseInt(req.body.userId),
      status: req.body.status,
    };
    const orderRecord = await store.create(order);
    res.json(orderRecord);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  await store.delete(parseInt(req.params.id));
  console.log(`Order with id ${req.params.id} has been deleted`);
  res.send(`Order with id ${req.params.id} has been deleted`);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.delete("/orders/:id", destroy);
};

export default orderRoutes;
