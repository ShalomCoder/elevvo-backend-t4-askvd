import Database from "better-sqlite3";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const db: Database.Database = new Database(resolve(projectRoot, "database.sqlite"));

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'USER'
            CHECK (role IN ('USER', 'ADMIN'))
    )
`);

export type User = {
    id: number;
    username: string;
    passwordHash: string;
    role: "USER" | "ADMIN";
};

export function findUserByUsername(username: string): User | undefined {
    return db
        .prepare(
            "SELECT id, username, passwordHash, role FROM users WHERE username = ?"
        )
        .get(username) as User | undefined;
}

export function createUser(username: string, passwordHash: string): boolean {
    const result = db
        .prepare(
            "INSERT OR IGNORE INTO users (username, passwordHash) VALUES (?, ?)"
        )
        .run(username, passwordHash);

    return result.changes === 1;
}

export function listUsers(): Array<Pick<User, "id" | "username" | "role">> {
    return db
        .prepare("SELECT id, username, role FROM users ORDER BY id")
        .all() as Array<Pick<User, "id" | "username" | "role">>;
}

export default db;