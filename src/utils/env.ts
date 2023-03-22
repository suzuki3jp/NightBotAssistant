export const isValidEnv = (): boolean => {
    if (typeof process.env.DISCORD_TOKEN !== 'string') return false;
    if (typeof process.env.NIGHTBOT_CLIENT_ID !== 'string') return false;
    if (typeof process.env.NIGHTBOT_CLIENT_SECRET !== 'string') return false;
    if (typeof process.env.NIGHTBOT_REDIRECT_URI !== 'string') return false;
    if (typeof process.env.NIGHTBOT_REFRESH_TOKEN !== 'string') return false;
    if (typeof process.env.NIGHTBOT_TOKEN !== 'string') return false;
    return true;
};
