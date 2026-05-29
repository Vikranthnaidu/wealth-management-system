import pool from "../config/db";
interface StockTransactionData {
  stock_code: string;
  quantity: number;
  price: number;
  realized_gain?: number;
  investor_pan: string;
}

// export const createStockTransaction = async (
//   data: any
// ) => {

//   const query = `
//     INSERT INTO stock_transactions
//     (
//       stock_code,
//       transaction_type,
//       quantity,
//       price,
//       realized_gain,
//       investor_pan
//     )
//     VALUES ($1, $2, $3, $4, $5, $6)
//     RETURNING *;
//   `;

//   const values = [
//     data.stock_code,
//     data.transaction_type,
//     data.quantity,
//     data.price,
//     data.realized_gain,
//     data.investor_pan,
//   ];

//   const result = await pool.query(query, values);

//   return result.rows[0];
// };
export const buyStock = async (data: StockTransactionData) => {
  const query = `INSERT INTO stock_transactions
  (
    stock_code,
    transaction_type,
    quantity,
    price,
    realized_gain,
    investor_pan
  )
    VALUES($1,'BUY',$2,$3,0,$4)
    RETURNING *;
  `;
  const values = [
    data.stock_code,
    data.quantity,
    data.price,
    data.investor_pan,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const sellStock = async (data: StockTransactionData) => {
  const query = `INSERT INTO stock_transactions
(
  stock_code,
  transaction_type,
  quantity,
  price,
  realized_gain,
  investor_pan
  )
  VALUES($1,'SELL',$2,$3,$4,$5)
  RETURNING *;`;
  const values = [
    data.stock_code,
    data.quantity,
    data.price,
    data.realized_gain,
    data.investor_pan,
  ];
  const result = await pool.query(query,values);
  return result.rows[0];
};
export const getAllStockTransactions = async () => {
  const query = `
    SELECT * FROM stock_transactions
    ORDER BY id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};
