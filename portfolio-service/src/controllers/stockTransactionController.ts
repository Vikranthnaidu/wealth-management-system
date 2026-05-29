import { Request, Response } from "express";

import * as stockTransactionModel
from "../models/stockTransactionModel";

// export const createStockTransaction = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     console.log(req.body);

//     const transaction =
//       await stockTransactionModel.createStockTransaction(
//         req.body
//       );

//     res.status(201).json({
//       success: true,
//       data: transaction,
//     });

//   } catch (error: any) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const BuyStock = async(req:Request,res:Response)=>{
  try{
    const stock = await stockTransactionModel.buyStock(req.body);
    res.status(200).json({
      success:true,
      data:stock,
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:"error.message",
    })
  }
}
export const sellStock = async(req:Request,res:Response)=>{
  try{
    const stock = await stockTransactionModel.sellStock(req.body);
    res.status(200).json({
      success:true,
      data:stock,
    })

  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
export const getAllStockTransactions = async (
  req: Request,
  res: Response
) => {
  try {

    const transactions =
      await stockTransactionModel.getAllStockTransactions();

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