export class TwitchAPI {
    static async getCovers(game: string): Promise<string> {
        const response = await fetch(`http://localhost:3000/games?title=${game}`);
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        const result = await response.json() as string;
        return result;
    }
}
