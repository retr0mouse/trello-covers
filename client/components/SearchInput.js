export function SearchInput({query, onTyped, onBooksChecked, onMoviesChecked, onBooksNotChecked, onMoviesNotChecked, booksChecked, moviesChecked}) {
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
                }
            }} >🔎
            </button>
        </>
    );
} 
