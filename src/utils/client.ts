import { Env } from '@suzuki3jp/utils';
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
    typeGuardDiscordToken,
} from './index';
import { DataManager } from '../class/DataManager';

const DM = new DataManager();
const {
    DISCORD_TOKEN,
    NIGHTBOT_CLIENT_ID,
    NIGHTBOT_CLIENT_SECRET,
    NIGHTBOT_REDIRECT_URI,
    NIGHTBOT_TOKEN,
    NIGHTBOT_REFRESH_TOKEN,
} = process.env;

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
    if (!typeGuardDiscordToken(DISCORD_TOKEN)) throw new Error('Invalid .env');
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
                onRefresh: (tokenInfo) => {
                    const newEnv = {
                        DISCORD_TOKEN: DISCORD_TOKEN,
                        NIGHTBOT_CLIENT_ID: NIGHTBOT_CLIENT_ID,
                        NIGHTBOT_CLIENT_SECRET: NIGHTBOT_CLIENT_SECRET,
                        NIGHTBOT_REDIRECT_URI: NIGHTBOT_REDIRECT_URI,
                        NIGHTBOT_TOKEN: tokenInfo.accessToken,
                        NIGHTBOT_REFRESH_TOKEN: tokenInfo.refreshToken,
                    };
                    DM.setEnv(Env.parseToEnv(newEnv));
                    console.log('token refreshed!');
                    return;
                },
            },
        },
    };
};
