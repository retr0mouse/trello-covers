import React, { useState, useEffect } from "react"

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
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY`);
        const data = await response.json();
        const filteredBooks = data.items.filter((book) => book.volumeInfo.imageLinks);
        if (!filteredBooks.length) {
            setMessage("No covers for this book found");
        }
        setBooks(filteredBooks);
    }

    async function getTrelloMember() {
        const response = await fetch(`https://api.trello.com/1/tokens/${trelloToken}/member?key=${trelloKey}`);
        console.log(response);
        if (response.ok) {
            setMessage("Inserted credentials are correct");
            return await response.json();
        }
        else {
            setMessage("Inserted credentials are not correct");
            return;
        }
    }

    async function fetchTrelloBoards() {
        const member = await getTrelloMember();
        if (!member) {
            return;
        }
        const response = await fetch(`https://api.trello.com/1/members/${member.id}/boards?key=${trelloKey}&token=${trelloToken}`);
        const data = await response.json();
        setBoards(data);
    }

    async function fetchTrelloCards() {
        const response = await fetch(`https://api.trello.com/1/boards/${selectedBoardId}/cards?key=${trelloKey}&token=${trelloToken}`);
        const cards = await response.json();
        const filteredCards = cards.filter((card) => !card.cover.idAttachment);
        if (!filteredCards.length) {
            setMessage("No cards without covers");
        }
        setCards(filteredCards);
    }

    async function uploadCover(thumbnail) {
        const selectedCard = cards[selectedCardIndex];
        const response = await fetch(`https://api.trello.com/1/cards/${selectedCard.id}/attachments?key=${trelloKey}&token=${trelloToken}&setCover=${true}&url=${encodeURIComponent(thumbnail)}`, {
            method: 'POST',
        });
        if (response.ok) {
            selectedCard.thumbnail = thumbnail;
            setMessage("👍");
            if (selectedCardIndex != cards.length - 1) {
                setSelectedCardIndex(selectedCardIndex + 1);
            }
        }
        else {
            setMessage("👎");
        }
    }
};
