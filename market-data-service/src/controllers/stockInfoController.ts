import { Request, Response } from "express";
import * as stockInfoModel from "../models/stockInfoModel";

export const createStockInfo = async (req: Request, res: Response) => {
  try {
    const stock = await stockInfoModel.createStockInfo(req.body);
    res.status(201).json({
      success: true,
      data: stock,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStockInfo = async (_req: Request, res: Response) => {
  try {
    const stocks = await stockInfoModel.getAllStockInfo();
    res.status(200).json({
      success: true,
      data: stocks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStockInfoByCode = async (req: Request, res: Response) => {
  try {
    const stock = await stockInfoModel.getStockInfoByCode(String(req.params.stock_code));
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStockInfo = async (req: Request, res: Response) => {
  try {
    const stock = await stockInfoModel.updateStockInfo(String(req.params.stock_code), req.body);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStockInfo = async (req: Request, res: Response) => {
  try {
    const stock = await stockInfoModel.deleteStockInfo(String(req.params.stock_code));
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
