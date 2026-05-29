import pool from "../config/db";

export const assignRole = async (
  investor_code: string,
  role_id: number
) => {
  const result = await pool.query(
    `
    INSERT INTO user_roles
    (investor_code, role_id)
    VALUES($1,$2)
    RETURNING *;
    `,
    [investor_code, role_id]
  );

  return result.rows[0];
};