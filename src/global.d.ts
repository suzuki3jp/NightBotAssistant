declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                readonly DISCORD_TOKEN: string;
                readonly NIGHTBOT_TOKEN: string;
                readonly NIGHTBOT_REFRESH_TOKEN: string;
                readonly NIGHTBOT_CLIENT_ID: string;
                readonly NIGHTBOT_CLIENT_SECRET: string;
                readonly NIGHTBOT_REDIRECT_URI: string;
            }
        }
    }
}
