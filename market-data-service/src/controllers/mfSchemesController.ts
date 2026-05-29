import { Request, Response } from "express";
import * as mfSchemesModel from "../models/mfSchemesModel";

export const createMfScheme = async (req: Request, res: Response) => {
  try {
    const scheme = await mfSchemesModel.createMfScheme(req.body);
    res.status(201).json({
      message: "MF Scheme created successfully",
      data: scheme,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMfSchemes = async (_req: Request, res: Response) => {
  try {
    const schemes = await mfSchemesModel.getAllMfSchemes();
    res.status(200).json({
      success: true,
      data: schemes,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMfSchemeByCode = async (req: Request, res: Response) => {
  try {
    const scheme = await mfSchemesModel.getMfSchemeByCode(String(req.params.scheme_code));
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "MF scheme not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMfScheme = async (req: Request, res: Response) => {
  try {
    const scheme = await mfSchemesModel.updateMfScheme(String(req.params.scheme_code), req.body);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "MF scheme not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMfScheme = async (req: Request, res: Response) => {
  try {
    const scheme = await mfSchemesModel.deleteMfScheme(String(req.params.scheme_code));
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "MF scheme not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
