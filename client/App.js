import React, { useState, useEffect } from "react"
import { GoogleAPI } from "./GoogleAPI";
import { TrelloAPI } from "./TrelloAPI";

export default function App() {
    const [query, setQuery] = useState("kekw");
    const [trelloToken, setTrelloToken] = useState(window.localStorage.getItem("trelloToken") || "");
    const [trelloKey, setTrelloKey] = useState(window.localStorage.getItem("trelloKey") || "");
    const [books, setBooks] = useState([]);
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState("");
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedBoardId) {
            fetchTrelloCards().catch(console.log);
        }
        setSelectedCardIndex(0);
    }, [selectedBoardId])

    useEffect(() => {
        const bookName = cards[selectedCardIndex]?.name ?? "";
        setQuery(bookName);
        if (selectedBoardId) {
            fetchBooks(bookName);
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
            <label>
                Trello key:
                <input value={trelloKey} type="text" onChange={(event) => {
                    setTrelloKey(event.target.value);
                    window.localStorage.setItem("trelloKey", event.target.value);
                }}></input>
                <br />
            </label>
            <label>
                Trello token:
                <input value={trelloToken} type="text" onChange={(event) => {
                    setTrelloToken(event.target.value);
                    window.localStorage.setItem("trelloToken", event.target.value)
                }}></input>
                <br />
            </label>
            <button onClick={() => fetchTrelloBoards()}>🚗</button>
            <br />
            <label>
                board:
                <select value={selectedBoardId} onChange={(event) => {
                    setSelectedBoardId(event.target.value);
                }}>
                    <option value="" disabled>Choose board</option>
                    {boards.map((board) => {
                        return (<option key={board.id} value={board.id}>{board.name}</option>);
                    })}
                </select>
            </label>
            <br />
            <button onClick={() => setSelectedCardIndex(selectedCardIndex - 1)} disabled={selectedCardIndex === 0 || selectedBoardId === ""}>⬅️</button>
            <span>{cards[selectedCardIndex]?.name}</span>
            <button onClick={() => setSelectedCardIndex(selectedCardIndex + 1)} disabled={selectedCardIndex === cards.length - 1 || selectedBoardId === ""}>➡️</button>
            <br />
            <input value={query} onChange={(event) => setQuery(event.target.value)}></input>
            <button onClick={() => fetchBooks(query)} >🔎</button>
            <div className="cover-container">
                {books?.map((book) => {
                    return (<div className={cards[selectedCardIndex]?.thumbnail === book.volumeInfo.imageLinks?.thumbnail ? "selected-cover" : ""} key={book.id}><img src={book.volumeInfo.imageLinks?.thumbnail}></img><br /><button onClick={() => uploadCover(book.volumeInfo.imageLinks?.thumbnail)}>✅</button></div>);
                })}
            </div>
            {message &&
                <div id="message_box">
                    <h4>{message}</h4>
                </div>
            }
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
            await TrelloAPI.addAttachment(thumbnail, selectedCard.id, trelloKey, trelloToken); 
        } catch(error){
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
