import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  //   const users = await store.index();
  //   res.json(users);
  res.send("index");
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      password_digest: req.params.password_digest,
    };
    const userRecord = await store.create(user);
    res.json(userRecord);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(parseInt(req.params.id));
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("/users/:id", destroy);
};

export default userRoutes;