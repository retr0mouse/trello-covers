const cache = {};

export class Cache{
    static put(key, data){
        cache[key] = data;
    }

    static get(key){
        return cache[key];
    }
}
