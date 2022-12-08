import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../database";

const pepper: string = process.env.PEPPER as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

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

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE first_name=$1 AND last_name=$2";
    const result = await conn.query(sql, [firstName, lastName]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }

  async create(record: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(record.password_digest + pepper, saltRounds);
      const result = await conn.query(sql, [
        record.firstName,
        record.lastName,
        hash,
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
