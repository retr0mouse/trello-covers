import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'

export class Cache {
    static db: Database;
    static async init(): Promise<void> {
        Cache.db = await open({
            filename: 'cache.db',
            driver: sqlite3.Database
        });
        await Cache.db.exec('CREATE TABLE IF NOT EXISTS cache (key VARCHAR(1000) NOT NULL PRIMARY KEY , data text)');
    }

    static async put(key: string, data: any): Promise<void> {
        const stringData = JSON.stringify(data);
        await Cache.db.run(
            'INSERT INTO cache (key, data) VALUES(?, ?)',
            key,
            stringData
        );
    }

    static async get(key: string): Promise<any> {
        const result = await Cache.db.get('SELECT data FROM cache WHERE (key = ?)', key);
        if (result) {
            return result.data;
        }
    }
}
