export class MovieAPI{
    static async getMovie(movieTitle){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=d0256790589a55b455aab52402dfc7bd&query=${movieTitle}&token=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDI1Njc5MDU4OWE1NWI0NTVhYWI1MjQwMmRmYzdiZCIsInN1YiI6IjYxZjI1OTU2NTU5ZDIyMDEwNWNhMDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._asLbJ7VJLrX69lbtJ0xfX7G8zLhyf1TzEy3Jhi_vW4`);
        const data = await response.json();
        return data;
    }
}