import React, { useState, useEffect } from "react"

const trelloKey = "88ebf07f6ece8dac34b02985cf2dc5f5";
const trelloToken = "7c589843f748dbf819004648d12c345e3f7919e8ebd548829ce890f0748705f7";

export default function App(){
    const [query, setQuery] = useState("kekw");
    const [books, setBooks] = useState([]);
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState("");
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTrelloBoards().catch(console.log);
    }, []);

    useEffect(() => {
        if(selectedBoardId){
            fetchTrelloCards().catch(console.log);
        }
        setSelectedCardIndex(0);
    }, [selectedBoardId])

    useEffect(() => {
        const bookName = cards[selectedCardIndex]?.name ?? "";
        setQuery(bookName);
        if(selectedBoardId){
            fetchBooks(bookName);
        }
    }, [selectedCardIndex, cards])

    useEffect(() => {
        if(!message){
            return;
        }
        const timeout = setTimeout(() => setMessage(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [message])

    return(
        <div>
            <h1> Hello, WorldqwerW! </h1>
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
            <br/>
            <button onClick={() => setSelectedCardIndex(selectedCardIndex - 1)} disabled = {selectedCardIndex === 0 || selectedBoardId === "" }>⬅️</button>
            <span>{cards[selectedCardIndex]?.name}</span>
            <button onClick={() => setSelectedCardIndex(selectedCardIndex + 1)} disabled = {selectedCardIndex === cards.length - 1 || selectedBoardId === ""}>➡️</button>
            <br/>
            <input value={ query } onChange={ (event) => setQuery(event.target.value)}></input>
            <button onClick={() => fetchBooks(query)} >🔎</button>
            <div className="cover-container">
                {books?.map((book) => {
                    return (<div key={book.id}><img src={book.volumeInfo.imageLinks?.thumbnail}></img><br/><button onClick={() => uploadCover(book.volumeInfo.imageLinks?.thumbnail)}>✅</button></div>);
                })}
            </div>
            {message && 
                <div id="message_box">
                    <h4>{message}</h4>
                </div>
            }
        </div>
    );

    async function fetchBooks(name){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY`);
        const data = await response.json();
        setBooks(data.items);
    }

    async function getTrelloMember(){
        const response = await fetch(`https://api.trello.com/1/tokens/${trelloToken}/member?key=${trelloKey}`);
        const data = await response.json();
        return data;
    }

    async function fetchTrelloBoards(){
        const member = await getTrelloMember();
        const response = await fetch(`https://api.trello.com/1/members/${member.id}/boards?key=${trelloKey}&token=${trelloToken}`);
        const data = await response.json();
        setBoards(data);
    }

    async function fetchTrelloCards(){
        const response = await fetch(`https://api.trello.com/1/boards/${selectedBoardId}/cards?key=${trelloKey}&token=${trelloToken}`);
        const cards = await response.json();
        const filteredCards = cards.filter((card) => !card.cover.idAttachment);
        if(!filteredCards.length){
            setMessage("No cards without covers");
        }
        setCards(filteredCards);
    }
    
    async function uploadCover(thumbnail){
        const selectedCard = cards[selectedCardIndex];
        const response = await fetch(`https://api.trello.com/1/cards/${selectedCard.id}/attachments?key=${trelloKey}&token=${trelloToken}&setCover=${true}&url=${encodeURIComponent(thumbnail)}`,{
            method: 'POST',
        });
        if(response.ok){
            setMessage("👍");
            if(selectedCardIndex != cards.length - 1){
                setSelectedCardIndex(selectedCardIndex + 1);
            }
        }
        else{
            setMessage("👎");
        }
    }

};
