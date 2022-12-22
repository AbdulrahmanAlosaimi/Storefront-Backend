import client from "../database";
import { OrderStore } from "./order";

const store = new OrderStore();

export type OrderProducts = {
  userId: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export class OrderProductssStore {
  async index(): Promise<OrderProducts[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM order_products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get order products: ${error}`);
    }
  }

  async create(record: any): Promise<Object> {
    try {
      await store.create(record);

      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (user_id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *";

      const result = await conn.query(sql, [
        record.userId,
        record.orderId,
        record.productId,
        record.quantity,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't insert order products: ${error}`);
    }
  }

  /* any is used in the following line because jwt does not know the correct type,
    so there is no way to reach the values inside the object without using any */
  async update(orderProducts: any) {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE order_products SET user_id = $1, product_id = $2, order_id = $3, quantity = $4 WHERE id = $5";
      const result = await conn.query(sql, [
        orderProducts.userId,
        orderProducts.orderId,
        orderProducts.productId,
        orderProducts.quantity,
        orderProducts.id,
      ]);
      conn.release();
      console.log(result);

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM order_products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      console.log(result);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete order products: ${error}`);
    }
  }

  async show(id: number): Promise<OrderProducts> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM order_products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't show order products: ${error}`);
    }
  }
}
