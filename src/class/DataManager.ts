import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export class DataManager {
    public paths: {
        env: string;
    };

    constructor() {
        this.paths = {
            env: resolve(__dirname, '../../.env'),
        };
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
