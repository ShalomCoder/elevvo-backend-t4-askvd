import type { Request, Response } from "express";
import login from "../services/login.js";

export async function loginController(
    req: Request,
    res: Response
): Promise<void> {
    const { username, password } = req.body;

    if (
        typeof username !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }

    const authenticated = await login(username, password);

    if (!authenticated) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    res.status(200).json({ message: "Login successful" });
}