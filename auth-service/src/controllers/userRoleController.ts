import { Request, Response } from "express";
import * as userRoleModel from "../models/userRoleModel";

export const assignRole = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      investor_code,
      role_id,
    } = req.body;

    const role = await userRoleModel.assignRole(
      investor_code,
      role_id
    );

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