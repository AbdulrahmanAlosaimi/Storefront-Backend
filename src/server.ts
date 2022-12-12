import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import orderRoutes from "./handlers/order";
import userRoutes from "./handlers/user";
import productRoutes from "./handlers/product";

const app: express.Application = express();
const address: string = "localhost:3000";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cross origin resource sharing
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

orderRoutes(app);
userRoutes(app);
productRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
