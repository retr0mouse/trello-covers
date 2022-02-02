import Koa from 'koa';
import fetch from 'node-fetch';
import Router from 'koa-router';
import cors from '@koa/cors';
import { Cache } from './Cache.js';

const app = new Koa();
const router = new Router();
Cache.init().catch((error) => console.log(error));

router.get('/', (ctx, next) => {
    ctx.body = "I AM GROOT!";
});

router.get('/games/:title', async (ctx, next) => {
    const title = ctx.params.title;
    const cacheKey = "games_" + title;
    const data = await Cache.get(cacheKey);
    if(data){
        ctx.body = data;
        return;
    }
    // fetch game ids
    const response = await fetch(`https://api.igdb.com/v4/games`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'cra49olkfi5j0nypqtyrxnj1m0l0by',
                'Authorization': 'Bearer 7wkmndivy03urpuydhnld6tgm03tc8',
            },
            body:  `fields id; limit 4;
                    where release_dates.platform = (6);
                    where name ~ *"` + title + `"*;`,
        });
    const gameIds = await response.json();

    // fetch covers for 4 game ids
    const covers = [];
    for(let i = 0; i < Math.min(4, gameIds.length); i++){
        const response = await fetch(`https://api.igdb.com/v4/covers`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'cra49olkfi5j0nypqtyrxnj1m0l0by',
                'Authorization': 'Bearer 7wkmndivy03urpuydhnld6tgm03tc8',
            },
            body:  `fields url; limit 1;
                    where game = ` + gameIds[i].id + `;`,
        });
        const cover = (await response.json())[0];
        if(cover){
            covers.push(cover);
        }
    }

    // construct a url for each cover
    const urls = [];
    if(covers.length > 0){
        for (const cover of covers) {
            urls.push("https:" + cover.url.replace("t_thumb", "t_cover_big"));
        }
    }

    // respond with urls 
    ctx.body = urls;
    await Cache.put(cacheKey, urls);
});

router.get("/movies/:title", async (ctx, next) => {
    const title = ctx.params.title;
    const cacheKey = "movies_" + title; 
    let data = await Cache.get(cacheKey);
    if(data){
        ctx.body = data;
        return;
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=d0256790589a55b455aab52402dfc7bd&query=${title}&token=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDI1Njc5MDU4OWE1NWI0NTVhYWI1MjQwMmRmYzdiZCIsInN1YiI6IjYxZjI1OTU2NTU5ZDIyMDEwNWNhMDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._asLbJ7VJLrX69lbtJ0xfX7G8zLhyf1TzEy3Jhi_vW4`);
    data = await response.json();
    ctx.body = data;
    await Cache.put(cacheKey, data);
});

router.get("/books/:title", async (ctx, next) => {
    const title = ctx.params.title;
    const cacheKey = "books_" + title;
    let data = await Cache.get(cacheKey);
    if(data){
        ctx.body = data;
        return;
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY`);
    data = await response.json();
    ctx.body = data;
    await Cache.put(cacheKey, data);
});

router.get("/members/:token/:key", async(ctx, next) => {
    const token = ctx.params.token;
    const key = ctx.params.key;
    const response = await fetch(`https://api.trello.com/1/tokens/${token}/member?key=${key}`);
    const data = await response.json();
    ctx.body = data;
})

router.get("/boards/:id/:key/:token", async(ctx, next) => {
    const id = ctx.params.id;
    const key = ctx.params.key;
    const token = ctx.params.token;
    const response = await fetch(`https://api.trello.com/1/members/${id}/boards?key=${key}&token=${token}`);
    const data = await response.json();
    ctx.body = data;
})

router.get("/cards/:selectedId/:key/:token", async(ctx, next) => {
    const selectedId = ctx.params.selectedId;
    const key = ctx.params.key;
    const token = ctx.params.token;
    const response = await fetch(`https://api.trello.com/1/boards/${selectedId}/cards?key=${key}&token=${token}`);
    const data = await response.json();
    ctx.body = data;
})

router.get("/attachment/:selectedId/:key/:token/:url", async(ctx, next) => {
    const selectedId = ctx.params.selectedId;
    const key = ctx.params.key;
    const token = ctx.params.token;
    const url = ctx.params.url;
    const response = await fetch(`https://api.trello.com/1/cards/${selectedId}/attachments?key=${key}&token=${token}&setCover=${true}&url=${encodeURIComponent(url)}`, {
        method: "POST",
    });
})

app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log("listening on http://localhost:3000");
