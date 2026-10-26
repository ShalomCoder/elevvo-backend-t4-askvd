import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { getJwtSecret } from "../config/auth.js";

export type UserRole = "USER" | "ADMIN";

export type AuthenticatedUser = {
    userId: number;
    role: UserRole;
};

function isAuthenticatedUser(
    payload: string | JwtPayload
): payload is JwtPayload & AuthenticatedUser {
    return (
        typeof payload !== "string" &&
        typeof payload.userId === "number" &&
        Number.isInteger(payload.userId) &&
        (payload.role === "USER" || payload.role === "ADMIN")
    );
}

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authorization = req.header("Authorization");
    const match = authorization?.match(/^Bearer ([^\s]+)$/);

    if (!match) {
        res.status(401).json({ message: "Authentication token required" });
        return;
    }

    const token = match[1];

    if (!token) {
        res.status(401).json({ message: "Authentication token required" });
        return;
    }

    try {
        const payload = jwt.verify(token, getJwtSecret());

        if (!isAuthenticatedUser(payload)) {
            res.status(401).json({ message: "Invalid authentication token" });
            return;
        }

        req.user = {
            userId: payload.userId,
            role: payload.role
        };
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired authentication token" });
    }
}

export function authorizeRole(requiredRole: UserRole) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.user?.role !== requiredRole) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }

        next();
    };
}
