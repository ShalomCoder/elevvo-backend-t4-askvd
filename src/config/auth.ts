export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.trim().length === 0) {
        throw new Error(
            "JWT_SECRET is required to sign and verify authentication tokens."
        );
    }

    return secret;
}
