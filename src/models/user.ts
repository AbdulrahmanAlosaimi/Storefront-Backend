import client from "../database";

export type User = {
  firstName: string;
  lastName: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get users: ${error}`);
    }
  }

  async create(record: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        record.firstName,
        record.lastName,
        record.password_digest,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't insert user: ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete user: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't show user: ${error}`);
    }
  }
}
