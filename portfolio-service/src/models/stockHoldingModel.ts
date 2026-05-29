import pool from "../config/db";

export const createStockHolding = async (
  data: any
) => {

  const query = `
    INSERT INTO stock_holdings
    (
      stock_code,
      quantity,
      avg_buy_price,
      current_market_price,
      investor_pan
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    data.stock_code,
    data.quantity,
    data.avg_buy_price,
    data.current_market_price,
    data.investor_pan,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllStockHoldings = async () => {

  const query = `
    SELECT * FROM stock_holdings
    ORDER BY id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};