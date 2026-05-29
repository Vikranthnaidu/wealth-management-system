import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "wealth-management-secret";

export interface AuthenticatedRequest extends Request {
  user?: {
    investor_code: string;
    email: string;
    pan_number: string;
    roles: string[];
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as AuthenticatedRequest["user"];
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
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
