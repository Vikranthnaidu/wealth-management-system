import pool from "../config/db";

export const createStockInfo = async (data: any) => {
  const result = await pool.query(
    `
      INSERT INTO stock_info
      (stock_code, company_name, exchange, sector, current_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [
      data.stock_code,
      data.company_name,
      data.exchange,
      data.sector,
      data.current_price,
    ]
  );

  return result.rows[0];
};

export const getAllStockInfo = async () => {
  const result = await pool.query(`
    SELECT * FROM stock_info
    ORDER BY company_name ASC;
  `);

  return result.rows;
};

export const getStockInfoByCode = async (stock_code: string) => {
  const result = await pool.query(
    `
      SELECT * FROM stock_info
      WHERE stock_code = $1;
    `,
    [stock_code]
  );

  return result.rows[0];
};

export const updateStockInfo = async (stock_code: string, data: any) => {
  const result = await pool.query(
    `
      UPDATE stock_info
      SET
        company_name = COALESCE($1, company_name),
        exchange = COALESCE($2, exchange),
        sector = COALESCE($3, sector),
        current_price = COALESCE($4, current_price),
        updated_at = CURRENT_TIMESTAMP
      WHERE stock_code = $5
      RETURNING *;
    `,
    [
      data.company_name,
      data.exchange,
      data.sector,
      data.current_price,
      stock_code,
    ]
  );

  return result.rows[0];
};

export const deleteStockInfo = async (stock_code: string) => {
  const result = await pool.query(
    `
      DELETE FROM stock_info
      WHERE stock_code = $1
      RETURNING *;
    `,
    [stock_code]
  );

  return result.rows[0];
};
