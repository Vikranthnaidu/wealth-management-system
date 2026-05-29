import pool from "../config/db";

export const createTransaction = async (data: any) => {

  const query = `
    INSERT INTO mf_transactions
    (
      investor_pan,
      scheme_code,
      transaction_type,
      amount,
      units,
      nav_value
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    data.investor_pan,
    data.scheme_code,
    data.transaction_type,
    data.amount,
    data.units,
    data.nav_value,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllTransactions = async () => {

  const query = `
    SELECT * FROM mf_transactions
    ORDER BY id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};