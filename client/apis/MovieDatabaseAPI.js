export class MovieAPI{
    static async getMovie(movieTitle){
        const response = await fetch(`http://localhost:3000/movies/`+ movieTitle);
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        return await response.json();
    }
}