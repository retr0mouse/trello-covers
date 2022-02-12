import React, { useState, useEffect } from "react" //"React" is a default export
import { GoogleAPI } from "./apis/GoogleAPI";
import { MovieAPI } from "./apis/MovieDatabaseAPI";
import { TrelloAPI } from "./apis/TrelloAPI";
import { TwitchAPI } from "./apis/TwitchAPI";
import { Covers } from "./components/Covers";
import { Message } from "./components/Message";
import { SearchInput } from "./components/SearchInput";
import { TrelloBoards } from "./components/TrelloBoards";
import { TrelloCards } from "./components/TrelloCards";
import { TrelloCredentials } from "./components/TrelloCredentials";

export default function App() {
    const [query, setQuery] = useState("kekw");
    const [trelloToken, setTrelloToken] = useState(window.localStorage.getItem("trelloToken") || "");
    const [trelloKey, setTrelloKey] = useState(window.localStorage.getItem("trelloKey") || "");
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);
    const [games, setGames] = useState([]);
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState("");
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [booksChecked, setBooksChecked] = useState(false);
    const [moviesChecked, setMoviesChecked] = useState(false);
    const [gamesChecked, setGamesChecked] = useState(false);

    useEffect(() => {
        if (selectedBoardId) {
            fetchTrelloCards().catch(console.log);
        }
        setSelectedCardIndex(0);
    }, [selectedBoardId])

    useEffect(() => {
        const title = cards[selectedCardIndex]?.name ?? "";
        setQuery(title);
        if (selectedBoardId && title) {
            if (booksChecked) {
                fetchBooks(title);
            }
            else {
                setBooks([]);
            }
            if (moviesChecked) {
                fetchMovie(title);
            }
            else {
                setMovies([]);
            }
            if (gamesChecked) {
                fetchGame(title);
            }
            else {
                setGames([]);
            }
        }
        else {
            setBooks([]);
            setMovies([]);
            setGames([]);
        }
    }, [selectedCardIndex, cards])

    useEffect(() => {
        if (!message) {
            return;
        }
        const timeout = setTimeout(() => setMessage(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [message])

    return (
        <div>
            <h1> Hello, WorldqwerW! </h1>
            <TrelloCredentials
                trelloKey={trelloKey}
                trelloToken={trelloToken}
                onKeyChanged={(key) => {
                    setTrelloKey(key);
                    window.localStorage.setItem("trelloKey", key);
                }}
                onTokenChanged={(token) => {
                    setTrelloToken(token);
                    window.localStorage.setItem("trelloToken", token);
                }}
                onValidate={() => fetchTrelloBoards()}
            />

            <br />
            <TrelloBoards
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelected={(boardId) => setSelectedBoardId(boardId)}
            />
            <br />
            <label>Books
                <input type="checkbox" onChange={() => setBooksChecked(!booksChecked)}></input>
            </label>
            <label>Movies
                <input type="checkbox" onChange={() => setMoviesChecked(!moviesChecked)}></input>
            </label>
            <label>Games
                <input type="checkbox" onChange={() => setGamesChecked(!gamesChecked)}></input>
            </label>
            <br />
            <TrelloCards
                cards={cards}
                selectedCardIndex={selectedCardIndex}
                disabled={selectedBoardId === "" || cards.length === 0}
                onSelected={(index) => setSelectedCardIndex(index)}
            />
            <br />
            <SearchInput
                query={query}
                onTyped={(query) => setQuery(query)}
                onBooksNotChecked={(book) => setBooks(book)}
                onMoviesNotChecked={(movie) => setMovies(movie)}
                onGamesNotChecked={(game) => setGames(game)}
                onBooksChecked={(book) => fetchBooks(book)}
                onMoviesChecked={(movie) => fetchMovie(movie)}
                onGamesChecked={(game) => fetchGame(game)}
                booksChecked={booksChecked}
                moviesChecked={moviesChecked}
                gamesChecked={gamesChecked}
            />
            <Covers
                items={[
                    ...books.map(book => book.volumeInfo.imageLinks?.thumbnail).filter(thumbnail => thumbnail),
                    ...movies.map(movie => movie.poster_path).filter(poster_path => poster_path),
                    ...games,
                ]}
                selectedThumbnail={cards[selectedCardIndex]?.thumbnail}
                onSelected={(item) => uploadCover(item)}
            />
            <Message
                message={message}
            />
        </div>
    );

    async function fetchBooks(name) {
        const data = await GoogleAPI.getBooks(name);
        const filteredBooks = data.items.filter((book) => book.volumeInfo.imageLinks);
        if (!filteredBooks.length) {
            setMessage("No covers for this book found");
        }
        setBooks(filteredBooks);
    }

    async function fetchMovie(name) {
        const data = await MovieAPI.getMovie(name);
        const filteredMovies = data.results.filter((movie) => movie.poster_path);
        if (!filteredMovies.length) {
            setMessage("No covers for this movie found");
        }
        else {
            filteredMovies.forEach((movie) => movie.poster_path = "https://image.tmdb.org/t/p/w154/" + movie.poster_path);
        }
        setMovies(filteredMovies);
    }

    async function fetchGame(name) {
        const data = await TwitchAPI.getCovers(name);
        if (!data.length) {
            setMessage("No covers for this game found");
        }
        setGames(data);
    }

    async function fetchTrelloBoards() {
        let member;
        try {
            member = await TrelloAPI.getMember(trelloKey, trelloToken);
        } catch (error) {
            setMessage("Inserted credentials are not correct");
            return;
        }
        setMessage("Inserted credentials are correct");
        const boards = await TrelloAPI.getBoards(member.id, trelloKey, trelloToken);
        setBoards(boards);
    }

    async function fetchTrelloCards() {
        const cards = await TrelloAPI.getCards(selectedBoardId, trelloKey, trelloToken);
        const filteredCards = cards.filter((card) => !card.cover.idAttachment);
        if (!filteredCards.length) {
            setMessage("No cards without covers");
        }
        setCards(filteredCards);
    }

    async function uploadCover(thumbnail) {
        const selectedCard = cards[selectedCardIndex];
        try {
            await TrelloAPI.addAttachment(selectedCard.id, trelloKey, trelloToken, thumbnail);
        } catch (error) {
            setMessage("👎");
            return;
        }
        selectedCard.thumbnail = thumbnail;
        setMessage("👍");
        if (selectedCardIndex != cards.length - 1) {
            setSelectedCardIndex(selectedCardIndex + 1);
        }
    }
};
