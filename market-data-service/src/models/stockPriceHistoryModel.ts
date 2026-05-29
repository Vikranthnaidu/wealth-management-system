import pool from "../config/db";

export const createStockPriceHistory = async (data: any) => {
  const result = await pool.query(
    `
      INSERT INTO stock_price_history
      (stock_code, price, recorded_at)
      VALUES ($1, $2, COALESCE($3, CURRENT_TIMESTAMP))
      RETURNING *;
    `,
    [data.stock_code, data.price, data.recorded_at]
  );

  return result.rows[0];
};

export const getAllStockPriceHistory = async () => {
  const result = await pool.query(`
    SELECT sph.*, si.company_name, si.exchange
    FROM stock_price_history sph
    JOIN stock_info si ON si.stock_code = sph.stock_code
    ORDER BY sph.recorded_at DESC;
  `);

  return result.rows;
};

export const getStockPriceHistoryByCode = async (stock_code: string) => {
  const result = await pool.query(
    `
      SELECT sph.*, si.company_name, si.exchange
      FROM stock_price_history sph
      JOIN stock_info si ON si.stock_code = sph.stock_code
      WHERE sph.stock_code = $1
      ORDER BY sph.recorded_at DESC;
    `,
    [stock_code]
  );

  return result.rows;
};

export const deleteStockPriceHistory = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM stock_price_history
      WHERE id = $1
      RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};
