import { Request, Response } from "express";
import * as mfNavHistoryModel from "../models/mfNavHistoryModel";

export const createNavHistory = async (req: Request, res: Response) => {
  try {
    const navHistory = await mfNavHistoryModel.createNavHistory(req.body);
    res.status(201).json({
      success: true,
      data: navHistory,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllNavHistory = async (req:Request,res:Response)=>{
    try{
        const navHistory = await mfNavHistoryModel.getAllNavHistory();
        res.status(200).json({
            success:true,
            data:navHistory,
        })
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
