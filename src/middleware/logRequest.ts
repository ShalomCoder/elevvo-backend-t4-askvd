import type { Request, Response, NextFunction } from "express";

export default function logRequest(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.log(`${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        console.log(`Response: ${res.statusCode}`);
    });

    next();
}