import pool from "../config/db";

export const createInvestor = async (
  investor_code: string,
  full_name: string,
  pan_number: string,
  mobile: string,
  email: string
) => {
  const query = `
    INSERT INTO investors
    (investor_code, full_name, pan_number, mobile, email)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    investor_code,
    full_name,
    pan_number,
    mobile,
    email,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllInvestors = async () => {
  const result = await pool.query(
    `SELECT * FROM investors ORDER BY created_at DESC`
  );

  return result.rows;
};