export const isValidEnv = (): boolean => {
    if (typeof process.env.DISCORD_TOKEN !== 'string') return false;
    if (typeof process.env.NIGHTBOT_CLIENT_ID !== 'string') return false;
    if (typeof process.env.NIGHTBOT_CLIENT_SECRET !== 'string') return false;
    if (typeof process.env.NIGHTBOT_REDIRECT_URI !== 'string') return false;
    if (typeof process.env.NIGHTBOT_REFRESH_TOKEN !== 'string') return false;
    if (typeof process.env.NIGHTBOT_TOKEN !== 'string') return false;
    return true;
};

export const typeGuardDiscordToken = (token: string | undefined): token is string => {
    if (typeof token === 'string') return true;
    return false;
};

export const typeGuardClientId = (id: string | undefined): id is string => {
    if (typeof id === 'string') return true;
    return false;
};

export const typeGuardClientSecret = (secret: string | undefined): secret is string => {
    if (typeof secret === 'string') return true;
    return false;
};

export const typeGuardRedirectUri = (uri: string | undefined): uri is string => {
    if (typeof uri === 'string') return true;
    return false;
};

export const typeGuardNightBotToken = (token: string | undefined): token is string => {
    if (typeof token === 'string') return true;
    return false;
};

export const typeGuardNightBotRefreshToken = (refreshToken: string | undefined): refreshToken is string => {
    if (typeof refreshToken === 'string') return true;
    return false;
};
