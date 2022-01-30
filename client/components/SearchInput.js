export function SearchInput({query, onTyped, onBooksChecked, onMoviesChecked, onGamesChecked, onBooksNotChecked, onMoviesNotChecked, onGamesNotChecked, booksChecked, moviesChecked, gamesChecked}) {
    return (
        <>
            <input value={query} onChange={(event) => onTyped(event.target.value)}></input>
            <button onClick={() => {
                if (query) {
                    if (booksChecked) {
                        onBooksChecked(query);
                    }
                    else {
                        onBooksNotChecked([]);
                    }
                    if (moviesChecked) {
                        onMoviesChecked(query);
                    }
                    else {
                        onMoviesNotChecked([]);
                    }
                    if (gamesChecked) {
                        onGamesChecked(query);
                    }
                    else {
                        onGamesNotChecked([]);
                    }
                }
            }} >🔎
            </button>
        </>
    );
} 
