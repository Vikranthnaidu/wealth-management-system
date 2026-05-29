import { Request, Response } from "express";
import pool from "../config/db"

import * as transactionModel from "../models/mfTransactionModel";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionModel.createTransaction(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionModel.getAllTransactions();

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getNetInvestment = async(req:Request,res:Response)=>{
  try{
    const {pan} = req.params;
    const query = 
    `SELECT
    SUM(amount) AS total_invested
    FROM mf_transactions
    WHERE investor_pan = $1;`;
    const result = await pool.query(query,[pan]);
    res.status(200).json({
      success:true,
      data:result.rows[0],
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
};
