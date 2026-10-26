import cors from "cors";

const allowedOrigins = new Set(
    (process.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0)
);

export default cors({
    origin(origin, callback) {
        if (origin === undefined || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Origin is not allowed by CORS"));
    }
});
