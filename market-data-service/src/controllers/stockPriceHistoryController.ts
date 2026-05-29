import { Request, Response } from "express";
import * as stockPriceHistoryModel from "../models/stockPriceHistoryModel";

export const createStockPriceHistory = async (req: Request, res: Response) => {
  try {
    const price = await stockPriceHistoryModel.createStockPriceHistory(req.body);
    res.status(201).json({
      success: true,
      data: price,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStockPriceHistory = async (_req: Request, res: Response) => {
  try {
    const prices = await stockPriceHistoryModel.getAllStockPriceHistory();
    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStockPriceHistoryByCode = async (req: Request, res: Response) => {
  try {
    const prices = await stockPriceHistoryModel.getStockPriceHistoryByCode(String(req.params.stock_code));
    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStockPriceHistory = async (req: Request, res: Response) => {
  try {
    const price = await stockPriceHistoryModel.deleteStockPriceHistory(String(req.params.id));
    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Stock price history row not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
