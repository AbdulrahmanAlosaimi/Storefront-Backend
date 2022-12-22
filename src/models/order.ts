import client from "../database";

export type Order = {
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get orders: ${error}`);
    }
  }

  async create(record: any): Promise<Object> {
    console.log(record);

    try {
      const conn = await client.connect();

      const sql =
        "INSERT INTO orders (id, status) SELECT $1, $2 WHERE NOT EXISTS (SELECT id FROM orders WHERE id = $1) RETURNING *";
      const result = await conn.query(sql, [record.orderId, record.status]);
      conn.release();

      console.log(result);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't insert order: ${error}`);
    }
  }

  /* any is used in the following line because jwt does not know the correct type,
    so there is no way to reach the values inside the object without using any */
  async update(order: any) {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET product_id = $1, quantity = $2, user_id = $3, status = $4 WHERE id = $5";
      const result = await conn.query(sql, [
        order.productId,
        order.quantity,
        order.userId,
        order.status,
        order.id,
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
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      console.log(result);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete order: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't show order: ${error}`);
    }
  }

  async showUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM order_products, orders WHERE orders.id = order_products.order_id AND order_products.user_id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't show order: ${error}`);
    }
  }
}
