import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Order, OrderStore } from "../models/order";

import dotenv from "dotenv";
dotenv.config();

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
  const order: Order = {
    productId: parseInt(req.body.productId),
    quantity: parseInt(req.body.quantity),
    userId: parseInt(req.body.userId),
    status: req.body.status,
  };

  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    console.log(`Invalid authentication when creating record.`);
    res.status(401);
    res.json(`Invalid token: ${err}`);
    return;
  }
  try {
    const orderRecord = await store.create(order);
    res.json(orderRecord);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    console.log(`Invalid authentication when deleting record.`);

    res.status(401);
    res.json(`Invalid token: ${err}`);
    return;
  }
  await store.delete(parseInt(req.params.id));
  console.log(`Order with id ${req.params.id} has been deleted`);
  res.send(`Order with id ${req.params.id} has been deleted`);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (err) {
    console.log(`Invalid authentication when deleting record.`);

    res.status(401);
    res.json(`Invalid token: ${err}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", verifyAuthToken, create);
  // app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, destroy);
};

export default orderRoutes;
