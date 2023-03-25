import type { ApplicationCommandData } from 'discord.js';

export const SlashCommands: ApplicationCommandData[] = [
    {
        name: 'panel',
        description: 'コマンドを管理するパネルを管理するコマンド群です。これは管理者しか実行できません。',
        options: [
            {
                type: 'SUB_COMMAND',
                name: 'setup',
                description: 'コマンドを管理するパネルをセットアップします。',
            },
            {
                type: 'SUB_COMMAND',
                name: 'remove',
                description: 'パネルを削除します。',
            },
            {
                type: 'SUB_COMMAND',
                name: 'reload',
                description: 'パネルと現在のコマンドを同期します。',
            },
        ],
    },
];

export const SlashCommandNames = {
    commands: {
        panel: 'panel',
    },
    subCommands: {
        panel: {
            setup: 'setup',
            remove: 'remove',
            reload: 'reload',
        },
    },
};
