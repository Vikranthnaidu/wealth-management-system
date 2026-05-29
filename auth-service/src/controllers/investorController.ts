import { Request, Response } from "express";
import * as investorModel from "../models/investorModel";
import pool from "../config/db";

export const createInvestor = async (req: Request, res: Response) => {
  try {
    const { investor_code, full_name, pan_number, mobile, email } = req.body;

    const investor = await investorModel.createInvestor(
      investor_code,
      full_name,
      pan_number,
      mobile,
      email,
    );

    res.status(201).json({
      success: true,
      data: investor,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllInvestors = async (req: Request, res: Response) => {
  try {
    const investors = await investorModel.getAllInvestors();

    res.json({
      success: true,
      data: investors,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getInvestorByPan = async (
  req: Request,
  res: Response
) => {
  try {

    const { pan } = req.params;

    const query = `
      SELECT * FROM investors
      WHERE pan_number = $1
    `;

    const result = await pool.query(query, [pan]);

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateInvestor = async(req:Request,res:Response) =>{
  try{
    const {investor_code} = req.params;
    const {mobile,email} = req.body;

    const query = `
    UPDATE investors
    SET 
      mobile = $1,
      email = $2
    WHERE investor_code = $3
    RETURNING *;
    `;
    const values =[
      mobile,
      email,
      investor_code,
    ];
    const result = await pool.query(query,values);
    res.status(200).json({
      success: true,
      data:result.rows[0],
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
};
export const deleteInvestor = async(req:Request,res:Response) =>{
  try{
    const {investor_code} = req.params;
    const query = `
    DELETE FROM investors
    WHERE investor_code = $1
    RETURNING *;
    `;
    const result = await pool.query(query,[investor_code])
    res.status(200).json({
      success: true,
      message:"investor deleted successfully",
      data:result.rows[0],
    });
  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

