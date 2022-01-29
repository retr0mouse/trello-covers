export class TwitchAPI{
    static async getCovers(token, clientId, game){
        const request = await fetch(`https://api.igdb.com/v4/games`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Client-ID': clientId,
                'Authorization': 'Bearer ' + token,
            },
            data:  `fields name; limit 500;
                    where release_dates.platform = (6);
                    where name ~ *"` + game + `"*;`,
        });
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        return await request.json();
    }
}

// Authorisation: Bearer 7wkmndivy03urpuydhnld6tgm03tc8
// Client-ID: cra49olkfi5j0nypqtyrxnj1m0l0by