import Koa from 'koa';
import fetch from 'node-fetch'; 
import Router from 'koa-router';
import cors from '@koa/cors';
import nodemon from 'nodemon';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = "i am groot";
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
    // console.log(gameIds[1].cover);

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
        // console.log(covers);
        for (const cover of covers) {
            urls.push("https:" + cover.url.replace("t_thumb", "t_cover_big"));
        }
    }
    
    // console.log(urls);
    // respond with urls 
    ctx.body = urls;
});

app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log("listening on http://localhost:3000");
