import axios from "axios";
import { NextFunction, Request, Response } from "express";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3000";

export interface AuthenticatedRequest extends Request {
  user?: {
    investor_code: string;
    email: string;
    pan_number: string;
    roles: string[];
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/verify`, {
      headers: { authorization: req.headers.authorization },
    });

    req.user = response.data.data;
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const roles = req.user?.roles ?? [];
    const normalized = roles.map((role) => role.toUpperCase());
    const isAllowed = allowedRoles.some((role) => normalized.includes(role.toUpperCase()));

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action",
      });
    }

    return next();
  };
};
