import fs from 'fs/promises';

export class Cache{
    static async put(key, data){
        const text = await fs.readFile("./cache.json", {encoding: "utf-8"});
        const cache = JSON.parse(text);
        cache[key] = data;
        const json = JSON.stringify(cache);
        await fs.writeFile("./cache.json", json, {encoding: "utf-8"});
    }

    static async get(key){
        const text = await fs.readFile("./cache.json", {encoding: "utf-8"});
        const cache = JSON.parse(text);
        const result = cache[key];
        return result;
    }
}
