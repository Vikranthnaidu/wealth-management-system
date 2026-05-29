import pool from "../config/db"

export const createMfScheme = async(data:any)=>{
    const query =
    `INSERT INTO mf_schemes(
     scheme_code,
     scheme_name,
     amc_name,
     fund_category,
     risk_category,
     min_sip_amount
    )
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *;
    `;
    const values=[
        data.scheme_code,
        data.scheme_name,
        data.amc_name,
        data.fund_category,
        data.risk_category,
        data.min_sip_amount,
    ]
    const result = await pool.query(query,values);
    return result.rows[0];
};

export const getAllMfSchemes = async () => {
  const result = await pool.query(`
    SELECT * FROM mf_schemes
    ORDER BY scheme_name ASC;
  `);

  return result.rows;
};

export const getMfSchemeByCode = async (scheme_code: string) => {
  const result = await pool.query(
    `
      SELECT * FROM mf_schemes
      WHERE scheme_code = $1;
    `,
    [scheme_code]
  );

  return result.rows[0];
};

export const updateMfScheme = async (scheme_code: string, data: any) => {
  const result = await pool.query(
    `
      UPDATE mf_schemes
      SET
        scheme_name = COALESCE($1, scheme_name),
        amc_name = COALESCE($2, amc_name),
        fund_category = COALESCE($3, fund_category),
        risk_category = COALESCE($4, risk_category),
        min_sip_amount = COALESCE($5, min_sip_amount)
      WHERE scheme_code = $6
      RETURNING *;
    `,
    [
      data.scheme_name,
      data.amc_name,
      data.fund_category,
      data.risk_category,
      data.min_sip_amount,
      scheme_code,
    ]
  );

  return result.rows[0];
};

export const deleteMfScheme = async (scheme_code: string) => {
  const result = await pool.query(
    `
      DELETE FROM mf_schemes
      WHERE scheme_code = $1
      RETURNING *;
    `,
    [scheme_code]
  );

  return result.rows[0];
};
