import pool from "../config/db";

export const createRole = async (
  role_name: string
) => {
  const result = await pool.query(
    `
    INSERT INTO roles(role_name)
    VALUES($1)
    RETURNING *;
    `,
    [role_name]
  );

  return result.rows[0];
};

export const getRoles = async () => {
  const result = await pool.query(
    `SELECT * FROM roles`
  );

  return result.rows;
};