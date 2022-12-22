// Packages
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Database related
import { User, UserStore } from "../models/user";

// Environment variables
import dotenv from "dotenv";
dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: req.body.password_digest,
    };
    if (!user.firstName || !user.lastName || !user.password_digest) {
      res.json("Please make sure you have enter all the required information.");
      return;
    }
    const userRecord = await store.create(user);
    const token = jwt.sign(
      { user: userRecord },
      process.env.TOKEN_SECRET as string
    );
    console.log("User has been created");
    res.json(token);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  await store.update({
    id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password_digest: req.body.password_digest,
  });
  console.log(`User with id ${req.params.id} has been updated`);
  res.json(`User with id ${req.params.id} has been updated`);
};

const destroy = async (req: Request, res: Response) => {
  await store.delete(parseInt(req.params.id));
  console.log(`User with id ${req.params.id} has been deleted`);
  res.send(`User with id ${req.params.id} has been deleted`);
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(
      req.body.firstName,
      req.body.lastName,
      req.body.password_digest
    );
    var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    console.log(`Failed authenticating user: ${error}`);
    res.json({ error });
  }
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

export const verifyAuthTokenUser = (
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

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users/register", create);
  app.post("/users", verifyAuthToken, create);
  app.put("/users/:id", verifyAuthTokenUser, update);
  app.post("/users/authenticate", authenticate);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default userRoutes;
