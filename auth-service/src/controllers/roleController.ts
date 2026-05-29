import { Request, Response } from "express";
import * as roleModel from "../models/roleModel";

export const createRole = async (
  req: Request,
  res: Response
) => {
  try {
    const { role_name } = req.body;

    const role = await roleModel.createRole(role_name);

    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoles = async (
  req: Request,
  res: Response
) => {
  try {
    const roles = await roleModel.getRoles();

    res.json({
      success: true,
      data: roles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};