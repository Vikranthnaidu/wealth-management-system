import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import * as loginModel from "../models/userLoginModel";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET || "wealth-management-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      investor_code,
      email,
      password,
    } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const user = await loginModel.createUserLogin(
      investor_code,
      email,
      password_hash
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await loginModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isBcryptHash = typeof user.password_hash === "string" && user.password_hash.startsWith("$2");
    const passwordMatches = isBcryptHash
      ? await bcrypt.compare(password, user.password_hash)
      : password === user.password_hash;

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const roles = Array.isArray(user.roles) && user.roles.length > 0 ? user.roles : ["INVESTOR"];
    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };
    const token = jwt.sign(
      {
        investor_code: user.investor_code,
        email: user.email,
        pan_number: user.pan_number,
        roles,
      },
      JWT_SECRET,
      signOptions
    );

    return res.status(200).json({
      success: true,
      token,
      data: {
        investor_code: user.investor_code,
        email: user.email,
        full_name: user.full_name,
        pan_number: user.pan_number,
        roles,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      investor_code: string;
      email: string;
      pan_number: string;
      roles: string[];
    };

    const user = await loginModel.getUserByInvestorCode(decoded.investor_code);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        investor_code: user.investor_code,
        email: user.email,
        full_name: user.full_name,
        pan_number: user.pan_number,
        roles: Array.isArray(user.roles) && user.roles.length > 0 ? user.roles : decoded.roles,
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
