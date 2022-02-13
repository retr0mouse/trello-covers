export class MovieAPI {
  static async getMovie(movieTitle: string): Promise<MoviesResponse> {
    const response = await fetch(`http://localhost:3000/movies?title=${movieTitle}`);
    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }
    const result = await response.json() as MoviesResponse;
    return result;
  }
}

interface MoviesResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
