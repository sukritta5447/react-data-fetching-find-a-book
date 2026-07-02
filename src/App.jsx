import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(search)}`,
    );

    const data = await response.json();
    setBooks(data.docs || []);
  };

  useEffect(() => {
    if (search === "") {
      setBooks([]);
      return;
    }
    fetchBooks();
  }, [search]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Enter book title"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <ul>
        {books.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
