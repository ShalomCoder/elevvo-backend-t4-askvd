import bcryptjs from "bcryptjs";
import { createUser } from "../db/database.js";

export default async function register(
    username: string,
    password: string
): Promise<boolean> {
    const passwordHash = await bcryptjs.hash(password, 10);

    return createUser(username, passwordHash);
}
