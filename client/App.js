import React, { useState, useEffect } from "react"

const trelloKey = "88ebf07f6ece8dac34b02985cf2dc5f5";
const trelloToken = "7c589843f748dbf819004648d12c345e3f7919e8ebd548829ce890f0748705f7";

export default function App(){
    const [query, setQuery] = useState("kekw");
    const [books, setBooks] = useState([]);
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState();
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    useEffect(() => {
        fetchTrelloBoards().catch(console.log);
    }, []);

    useEffect(() => {
        fetchTrelloCards().catch(console.log);
    }, [selectedBoardId])

    useEffect(() => {
        setQuery(cards[selectedCardIndex]?.name ?? "");
    }, [selectedCardIndex])

    return(
        <div>
            <h1> Hello, WorldqwerW! </h1>
            <label>
                board:
                <select value={selectedBoardId} onChange={(event) => {
                        setSelectedBoardId(event.target.value);
                    }}>
                    {boards.map((board) => {
                        return (<option key={board.id} value={board.id}>{board.name}</option>);
                    })}
                </select>
            </label>
            <br/>
            <button onClick={() => setSelectedCardIndex(selectedCardIndex - 1)}>⬅️</button>
            <span>{cards[selectedCardIndex]?.name}</span>
            <button onClick={() => setSelectedCardIndex(selectedCardIndex + 1)}>➡️</button>
            <br/>
            <input value={ query } onChange={ (event) => setQuery(event.target.value)}></input>
            <button onClick={() => fetchBooks(query)} >🔎</button>
            <div className="cover-container">
                {books.map((book) => {
                    return (<div key={book.id}><img src={book.volumeInfo.imageLinks?.thumbnail}></img><br/><button onClick={() => uploadCover(book.volumeInfo.imageLinks?.thumbnail)}>✅</button></div>);
                })}
            </div>
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
        const data = await response.json();
        setCards(data);
        console.log(data);
    }
    
    function uploadCover(thumbnail){
        
    }

};

//https://www.googleapis.com/books/v1/volumes?q=navalny&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY
//AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY
//https://www.googleapis.com/books/v1/volumes?q=search+terms

//const fetch = require('node-fetch');

// fetch('https://api.trello.com/1/tokens/{token}/member', {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json'
//     }
//   })
//     .then(response => {
//       console.log(
//         `Response: ${response.status} ${response.statusText}`
//       );
//       return response.text();
//     })
//     .then(text => console.log(text))
//     .catch(err => console.error(err));

//BUG TRACKER
// решиь проблему: selected board id undefined
// setSelectedCardIndex < len()