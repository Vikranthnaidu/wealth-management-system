import pool from "../config/db";

export const createSip = async(data:any)=>{
    const query = `
    INSERT INTO mf_sips
    (
        scheme_code,
        sip_amount,
        sip_status,
        start_date,
        next_due_date,
        investor_pan
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `;
    const values = [
        data.scheme_code,
        data.sip_amount,
        data.sip_status,
        data.start_date,
        data.next_due_date,
        data.investor_pan,
    ];
    const result = await pool.query(query,values);
    return result.rows[0];
};
export const getAllSips = async()=>{
    const query =`
    SELECT * FROM mf_sips
    ORDER BY id DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}
