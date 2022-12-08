import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.body.id));
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: req.body.password_digest,
    };
    const userRecord = await store.create(user);
    console.log("User has been created");
    res.json(userRecord);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  await store.delete(parseInt(req.params.id));
  console.log(`User with id ${req.params.id} has been deleted`);
  res.send(`User with id ${req.params.id} has been deleted`);
};

const authenticate = async (req: Request, res: Response) => {
  const user = await store.authenticate(
    req.body.firstName,
    req.body.lastName,
    req.body.password_digest
  );
  if (user) {
    res.json(user);
  } else {
    res.send(`Failed to authenticate, check information supplied`);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
  app.delete("/users/:id", destroy);
};

export default userRoutes;
