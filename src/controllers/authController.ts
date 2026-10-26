import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/auth.js";
import { listUsers } from "../db/database.js";
import login from "../services/login.js";
import register from "../services/register.js";

function hasCredentials(
    username: unknown,
    password: unknown
): username is string {
    return (
        typeof username === "string" &&
        username.trim().length > 0 &&
        typeof password === "string" &&
        password.length > 0
    );
}

export async function loginController(
    req: Request,
    res: Response
): Promise<void> {
    const { username, password } = req.body;

    if (!hasCredentials(username, password)) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }

    const user = await login(username.trim(), password);

    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        getJwtSecret(),
        { expiresIn: "1h" }
    );

    res.status(200).json({ token });
}

export async function registerController(
    req: Request,
    res: Response
): Promise<void> {
    const { username, password } = req.body;

    if (!hasCredentials(username, password)) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }

    const created = await register(username.trim(), password);

    if (!created) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    res.status(201).json({ message: "User created" });
}

export function currentUserController(req: Request, res: Response): void {
    res.status(200).json({ user: req.user });
}

export function adminUsersController(req: Request, res: Response): void {
    res.status(200).json({ users: listUsers() });
}