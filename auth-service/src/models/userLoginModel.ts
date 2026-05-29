import pool from "../config/db";

export const createUserLogin = async (
  investor_code: string,
  email: string,
  password_hash: string
) => {
  const query = `
    INSERT INTO user_logins
    (investor_code, email, password_hash)
    VALUES ($1,$2,$3)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    investor_code,
    email,
    password_hash,
  ]);

  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT
        ul.id,
        ul.investor_code,
        ul.email,
        ul.password_hash,
        i.full_name,
        i.pan_number,
        COALESCE(
          json_agg(r.role_name ORDER BY r.role_name)
            FILTER (WHERE r.role_name IS NOT NULL),
          '[]'
        ) AS roles
      FROM user_logins ul
      JOIN investors i ON i.investor_code = ul.investor_code
      LEFT JOIN user_roles ur ON ur.investor_code = ul.investor_code
      LEFT JOIN roles r ON r.role_id = ur.role_id
      WHERE LOWER(ul.email) = LOWER($1)
      GROUP BY ul.id, i.full_name, i.pan_number
      LIMIT 1;
    `,
    [email]
  );

  return result.rows[0];
};

export const getUserByInvestorCode = async (investor_code: string) => {
  const result = await pool.query(
    `
      SELECT
        ul.id,
        ul.investor_code,
        ul.email,
        i.full_name,
        i.pan_number,
        COALESCE(
          json_agg(r.role_name ORDER BY r.role_name)
            FILTER (WHERE r.role_name IS NOT NULL),
          '[]'
        ) AS roles
      FROM user_logins ul
      JOIN investors i ON i.investor_code = ul.investor_code
      LEFT JOIN user_roles ur ON ur.investor_code = ul.investor_code
      LEFT JOIN roles r ON r.role_id = ur.role_id
      WHERE ul.investor_code = $1
      GROUP BY ul.id, i.full_name, i.pan_number
      LIMIT 1;
    `,
    [investor_code]
  );

  return result.rows[0];
};
