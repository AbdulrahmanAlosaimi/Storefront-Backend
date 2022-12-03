import client from "../database";

export type Order = {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
  status: string;
};
