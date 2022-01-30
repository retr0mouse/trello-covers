import Koa from 'koa';
import fetch from 'node-fetch'; 
import Router from 'koa-router';
import cors from '@koa/cors';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = "I AM GROOT!";
});

router.get('/games/:title', async (ctx, next) => {
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
                    where name ~ *"` + ctx.params.title + `"*;`,
        });
    if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
    }
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
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
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
});

router.get("/movie/:title", async (ctx, next) => {
    const title = ctx.params.title;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=d0256790589a55b455aab52402dfc7bd&query=${title}&token=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDI1Njc5MDU4OWE1NWI0NTVhYWI1MjQwMmRmYzdiZCIsInN1YiI6IjYxZjI1OTU2NTU5ZDIyMDEwNWNhMDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._asLbJ7VJLrX69lbtJ0xfX7G8zLhyf1TzEy3Jhi_vW4`);
    const data = await response.json();
    ctx.body = data;
});

app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log("listening on http://localhost:3000");
