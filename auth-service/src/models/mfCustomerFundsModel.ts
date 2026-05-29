import pool from "../config/db";

export const createCustomerFund = async (data: any) => {

  const query = `
    INSERT INTO mf_customer_funds
    (
      investor_pan,
      scheme_code,
      units,
      invested_amount,
      current_value,
      investment_date
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    data.investor_pan,
    data.scheme_code,
    data.units,
    data.invested_amount,
    data.current_value,
    data.investment_date,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllCustomerFunds = async () => {

  const query = `
    SELECT * FROM mf_customer_funds
    ORDER BY id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};