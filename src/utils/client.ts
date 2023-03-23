import { Client as NightBotAPI, AuthManager, ClientInfo, TokenInfo } from 'nightbot.js';
import { Client as Discord, ClientOptions as DiscordOptions, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import {
    typeGuardClientId,
    typeGuardClientSecret,
    typeGuardNightBotRefreshToken,
    typeGuardNightBotToken,
    typeGuardRedirectUri,
} from './index';

const { NIGHTBOT_CLIENT_ID, NIGHTBOT_CLIENT_SECRET, NIGHTBOT_REDIRECT_URI, NIGHTBOT_TOKEN, NIGHTBOT_REFRESH_TOKEN } =
    process.env;

export const generateClients = (): { discord: Discord; nightbot: NightBotAPI } => {
    const options = generateOptions();
    return {
        discord: new Discord(options.discordOptions),
        nightbot: new NightBotAPI(
            new AuthManager({
                clientInfo: options.nightbotOptions.clientInfo,
                tokenInfo: options.nightbotOptions.tokenInfo,
            })
        ),
    };
};

const generateOptions = (): {
    discordOptions: DiscordOptions;
    nightbotOptions: { clientInfo: ClientInfo; tokenInfo: TokenInfo };
} => {
    if (!typeGuardClientId(NIGHTBOT_CLIENT_ID)) throw new Error('Invalid .env');
    if (!typeGuardClientSecret(NIGHTBOT_CLIENT_SECRET)) throw new Error('Invalid .env');
    if (!typeGuardRedirectUri(NIGHTBOT_REDIRECT_URI)) throw new Error('Invalid .env');
    if (!typeGuardNightBotToken(NIGHTBOT_TOKEN)) throw new Error('Invalid .env');
    if (!typeGuardNightBotRefreshToken(NIGHTBOT_REFRESH_TOKEN)) throw new Error('Invalid .env');

    return {
        discordOptions: {
            intents: Object.values(Intents.FLAGS),
            partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
        },
        nightbotOptions: {
            clientInfo: {
                clientId: NIGHTBOT_CLIENT_ID,
                clientSecret: NIGHTBOT_CLIENT_SECRET,
                redirectUri: NIGHTBOT_REDIRECT_URI,
            },
            tokenInfo: {
                accessToken: NIGHTBOT_TOKEN,
                refreshToken: NIGHTBOT_REFRESH_TOKEN,
            },
        },
    };
};
