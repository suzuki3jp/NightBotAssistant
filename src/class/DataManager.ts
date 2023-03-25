import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { JsonTypes, ConfigJson } from './JsonTypes';

export class DataManager {
    public paths: {
        config: string;
        env: string;
    };

    constructor() {
        this.paths = {
            config: resolve(__dirname, '../../data/config.json'),
            env: resolve(__dirname, '../../.env'),
        };
    }

    getConfig(): ConfigJson {
        return this._readFile(this.paths.config);
    }

    setEnv(data: string) {
        this._writeFile(this.paths.env, data);
    }

    _readFile(path: string) {
        return JSON.parse(readFileSync(path, 'utf-8'));
    }

    _writeFile(path: string, data: string | Object) {
        if (typeof data !== 'string') {
            writeFileSync(path, this._jsonToString(data), 'utf-8');
        } else {
            writeFileSync(path, data, 'utf-8');
        }
    }

    _jsonToString(data: any): string {
        return JSON.stringify(data, null, '\t');
    }
}
