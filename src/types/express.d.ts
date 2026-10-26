import type { AuthenticatedUser } from "../middleware/authenticateToken.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export {};
