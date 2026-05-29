import { Request, Response } from "express";
import * as mfSipModel from "../models/mfSipModel";
import pool from "../config/db";

export const createSip = async (req: Request, res: Response) => {
  try {
    const sip = await mfSipModel.createSip(req.body);
    res.status(201).json({
      success: true,
      data: sip,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllSips = async (req: Request, res: Response) => {
  try {
    const sips = await mfSipModel.getAllSips();
    res.status(200).json({
      success: true,
      data: sips,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getSipByPan = async (req: Request, res: Response) => {
  try {
    const { pan } = req.params;
    const result = await pool.query(
      `SELECT * FROM mf_sips
            WHERE investor_pan =$1
            ORDER BY id DESC`,
      [pan],
    );
    return res.status(200).json({
      success: true,
      message: "SIPs fetched Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteSip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM mf_sips
            WHERE id =$1
            RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "SIP not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "SIP deleted Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export const updateSipStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { sip_status } = req.body;
    const allowedStatues = ["ACTIVE", "PAUSED", "CANCELLED"];
    if (!allowedStatues.includes(sip_status)) {
      return res.status(400).json({
        message: "Invalid SIP Status",
        allowed: allowedStatues,
      });
    }
    const result = await pool.query(
      `UPDATE mf_sips
            SET sip_status =$1
            WHERE id = $2
            RETURNING * `,
      [sip_status, id],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "SIP NOT FOUND",
      });
    }
    return res.status(200).json({
      message: `SIP status updated to ${sip_status}`,
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getInvestedSips = async (req: Request, res: Response) => {
  try {
    const { pan } = req.params;
    const query = `SELECT * FROM mf_sips
            WHERE investor_pan=$1
            AND sip_status = 'ACTIVE'
            ORDER BY start_date DESC;`;
    const result = await pool.query(query, [pan]);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
