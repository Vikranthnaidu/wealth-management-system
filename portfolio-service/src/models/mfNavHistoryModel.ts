import pool from "../config/db";

export const createNavHistory = async (data:any)=>{
    const query = `
    INSERT INTO mf_nav_history
    (
        scheme_code,
        nav_value,
        nav_date
    )
    VALUES ($1,$2,$3)
    RETURNING *;
    `;
    const values = [
        data.scheme_code,
        data.nav_value,
        data.nav_date,
    ]
    const result = await pool.query(query,values)
    return result.rows[0];
}
export const getAllNavHistory = async()=>{
    const query =`
    SELECT * FROM mf_nav_history
    ORDER BY nav_date DESC;
    `;
    const result = await pool.query(query)
    return result.rows;
}

