import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Order, OrderStore } from "../models/order";
import { OrderProductssStore } from "../models/order_products";
import { verifyAuthTokenUser } from "./user";

import dotenv from "dotenv";
dotenv.config();

const store = new OrderStore();
const orderProductsStore = new OrderProductssStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id));
  res.json(order);
};

const showUserOrders = async (req: Request, res: Response) => {
  const orders = await store.showUserOrders(parseInt(req.params.id));
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  const order: any = {
    productId: parseInt(req.body.productId),
    orderId: parseInt(req.body.orderId),
    quantity: parseInt(req.body.quantity),
    userId: parseInt(req.body.userId),
    status: req.body.status,
  };
  try {
    try {
      const token = req.headers.authorization as string;
      /* any is used in the following line because jwt does not know the correct type,
        so there is no way to reach the values inside the object without using any */
      const decoded: any = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      );

      if (decoded.user.id != req.body.userId) {
        throw new Error("User id does not match.");
      }
    } catch (err) {
      console.log(`Invalid authentication: ${err}`);

      res.status(401);
      res.json(`Invalid token: ${err}`);
    }

    const orderRecord = await orderProductsStore.create(order);
    console.log(`Created order.`);
    res.json(orderRecord);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  await store.update({
    id: req.params.id,
    productId: req.body.productId,
    quantity: req.body.quantity,
    userId: req.params.userId,
    status: req.body.status,
  });
  console.log(`Order with id ${req.params.id} has been updated`);
  res.json(`Order with id ${req.params.id} has been updated`);
};

const destroy = async (req: Request, res: Response) => {
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
    console.log(`Invalid authentication: ${err}`);

    res.status(401);
    res.json(`Invalid token: ${err}`);
  }
};

const verifyAuthTokenOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;
    /* any is used in the following line because jwt does not know the correct type,
      so there is no way to reach the values inside the object without using any */
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET as string);

    if (decoded.user.id != req.params.id) {
      throw new Error("User id does not match.");
    }
    next();
  } catch (err) {
    console.log(`Invalid authentication: ${err}`);

    res.status(401);
    res.json(`Invalid token: ${err}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.get("/orders/users/:id", verifyAuthTokenOrder, showUserOrders);
  app.post("/orders", create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, destroy);
};

export default orderRoutes;
