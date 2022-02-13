import React, { ReactElement } from "react";

interface Props {
    query: string,
    onTyped(text: string): void,
    onBooksChecked(books: any): void,
    onMoviesChecked(movies: any): void,
    onGamesChecked(games: any): void,
    onBooksNotChecked(books: any): void,
    onMoviesNotChecked(movies: any): void,
    onGamesNotChecked(games: any): void,
    booksChecked: boolean,
    moviesChecked: boolean,
    gamesChecked: boolean,
}

export function SearchInput(props: Props): ReactElement {
    return (
        <>
            <input value={props.query} onChange={(event) => props.onTyped(event.target.value)}></input>
            <button onClick={() => {
                if (props.query) {
                    if (props.booksChecked) {
                        props.onBooksChecked(props.query);
                    }
                    else {
                        props.onBooksNotChecked([]);
                    }
                    if (props.moviesChecked) {
                        props.onMoviesChecked(props.query);
                    }
                    else {
                        props.onMoviesNotChecked([]);
                    }
                    if (props.gamesChecked) {
                        props.onGamesChecked(props.query);
                    }
                    else {
                        props.onGamesNotChecked([]);
                    }
                }
            }} >🔎
            </button>
        </>
    );
} 
