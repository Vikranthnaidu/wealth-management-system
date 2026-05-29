import { Request, Response } from "express";
import pool from "../config/db";

import * as customerFundsModel from "../models/mfCustomerFundsModel";

export const createCustomerFund = async (
  req: Request,
  res: Response
) => {
  try {

    const fund = await customerFundsModel.createCustomerFund(
      req.body
    );

    res.status(201).json({
      success: true,
      data: fund,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCustomerFunds = async (
  req: Request,
  res: Response
) => {
  try {

    const funds = await customerFundsModel.getAllCustomerFunds();

    res.status(200).json({
      success: true,
      data: funds,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerFundsByPan = async(req:Request,res:Response) =>{
  try{
    const {pan} = req.params;
    const query=`
    SELECT * FROM mf_customer_funds
    WHERE investor_pan =$1
    ORDER BY investment_date DESC;
    `;
    const result = await pool.query(query,[pan])
    res.status(200).json({
      success:true,
      data:result.rows,
    })
  }catch(error:any){
    res.status(500).json({
      success:false,
      message: error.message,
    })
  }
};
export const deleteCustomerFunds = async(req:Request,res:Response) => {
  try{
    const {id} = req.params;
    const query= `
    DELETE FROM mf_customer_funds
    WHERE id = $1
    RETURNING *;
    `;
    const result = await pool.query(query,[id]);
    res.status(200).json({
      success:true,
      message:"Customer fund deleted Successfully",
      data:result.rows[0],
    })

  }catch(error:any)
  {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
