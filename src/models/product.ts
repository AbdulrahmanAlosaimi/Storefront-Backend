import client from "../database";

export type Product = {
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get products: ${error}`);
    }
  }

  async create(record: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        record.name,
        record.price,
        record.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't insert product: ${error}`);
    }
  }

  /* any is used in the following line because jwt does not know the correct type,
    so there is no way to reach the values inside the object without using any */
  async update(product: any): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete product: ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't show product: ${error}`);
    }
  }
}
