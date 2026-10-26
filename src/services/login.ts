import bcryptjs from "bcryptjs";
import { findUserByUsername, type User } from "../db/database.js";

export default async function login(
    username: string,
    password: string
): Promise<User | undefined> {
    const user = findUserByUsername(username);

    if (!user) {
        return undefined;
    }

    const passwordMatches = await bcryptjs.compare(password, user.passwordHash);

    return passwordMatches ? user : undefined;
}