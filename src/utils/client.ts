import { Client as NightBotAPI, AuthManager, ClientInfo, TokenInfo } from 'nightbot.js';
import { Client as Discord, ClientOptions as DiscordOptions, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import { isValidEnv } from './index';

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
    if (!isValidEnv()) {
        throw new Error('Invalid .env');
    }
    return {
        discordOptions: {
            intents: Object.values(Intents.FLAGS),
            partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
        },
        nightbotOptions: {
            clientInfo: {
                clientId: process.env.NIGHTBOT_CLIENT_ID,
                clientSecret: process.env.NIGHTBOT_CLIENT_SECRET,
                redirectUri: process.env.NIGHTBOT_REDIRECT_URI,
            },
            tokenInfo: {
                accessToken: process.env.NIGHTBOT_TOKEN,
                refreshToken: process.env.NIGHTBOT_REFRESH_TOKEN,
            },
        },
    };
};
