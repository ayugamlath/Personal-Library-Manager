import { useState } from "react";
import { saveBook } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { allbooks } from "../services/api";
import Card from "../components/Card";
import axios from "axios";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return alert("Please enter a valid search term");
    setLoading(true);
    try {
      const res = await allbooks(query);
      setBooks(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async (book) => {
    if (!user) return navigate("/login");
    const bookData = {
      googleBookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      description: book.volumeInfo.description,
    };
    try {
      await saveBook(bookData);
      alert("Book saved!");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving book");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <form
        onSubmit={searchBooks}
        className="mb-8 flex gap-2 max-w-2xl mx-auto"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books by title, author, or keyword..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 font-medium transition text-lg"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500 text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
          <Card key={book.id} book={book} handleSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBooks;
