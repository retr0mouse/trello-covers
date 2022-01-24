import React, { useState } from "react"
import { Menu } from "./Menu";
import { Home } from "./Home";
import { About } from "./About";

export default function App(){
    const [query, setQuery] = useState("kekw");
    const [books, setBooks] = useState([]);
    return(
        <div>
            <h1> Hello, WorldqwerW! </h1>
            <input value={ query } onChange={ (event) => setQuery(event.target.value)}></input>
            <button onClick={() => fetchBooks(query)} ></button>
            <ul>
                {books.map((book) => {
                    return (<li key={book.id}>{book.volumeInfo.title}<img src={book.volumeInfo.imageLinks?.thumbnail}></img></li>);
                })}
            </ul>
        </div>
    );

    async function fetchBooks(name){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY`);
        const data = await response.json();
        setBooks(data.items);
    }
};

//https://www.googleapis.com/books/v1/volumes?q=navalny&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY
//AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY
//https://www.googleapis.com/books/v1/volumes?q=search+terms
