import { Request, Response } from "express";
import pool from "../config/db";


import * as stockHoldingModel from "../models/stockHoldingModel";

export const createStockHolding = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const holding = await stockHoldingModel.createStockHolding(req.body);

    res.status(201).json({
      success: true,
      data: holding,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStockHoldings = async (req: Request, res: Response) => {
  try {
    const holdings = await stockHoldingModel.getAllStockHoldings();

    res.status(200).json({
      success: true,
      data: holdings,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStockHoldingsByPan = async(req:Request,res:Response) =>{
  try{
    const {pan} = req.params;
    const query = `
    SELECT * FROM stock_holdings
    WHERE investor_pan = $1
    ORDER BY id DESC;
    `;
    const result = await pool.query(query,[pan]);
    res.status(200).json({
      success:true,
      data:result.rows,
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
};

export const deleteStockHolding = async(req:Request,res:Response) =>{
  try{
    const {id} = req.params;
    const query = `
    DELETE FROM stock_holdings
    WHERE id = $1
    RETURNING *;
    `;
    const result = await pool.query(query,[id]);
    res.status(200).json({
      success:true,
      message: "Stock holding deleted successfully",
      data:result.rows[0],
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}


