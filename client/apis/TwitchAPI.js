export class TwitchAPI{
    static async getCovers(game){
        const response = await fetch(`http://localhost:3000/games/`+ game);
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        return await response.json();
    }
}
