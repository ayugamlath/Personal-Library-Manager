import { useState } from "react";
import { saveBook, allbooks } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import background from "../assets/background.jpg";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [printType, setPrintType] = useState("all");
  const [totalItems, setTotalItems] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e, isNewSearch = true) => {
    if (e) e.preventDefault();
    if (!query) return alert("Please enter a valid search term");

    setLoading(true);
    try {
      const index = isNewSearch ? 0 : startIndex;
      const res = await allbooks(query, index, filter || null, printType);

      const foundBooks = res.data.items || [];

      if (isNewSearch) {
        setBooks(foundBooks);
        setStartIndex(12);
      } else {
        setBooks((prev) => [...prev, ...foundBooks]);
        setStartIndex((prev) => prev + 12);
      }
      setTotalItems(res.data.totalItems || 0);
    } catch (err) {
      console.error(err);
      alert("Error searching books");
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed p-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto p-4 max-w-7xl bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="max-w-4xl mx-auto mb-8">
          <form
            onSubmit={(e) => handleSearch(e, true)}
            className="flex gap-2 mb-4"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books by title, author, or keyword..."
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 font-medium transition text-lg dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-4 items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <label
                htmlFor="printType"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                Print Type:
              </label>
              <select
                id="printType"
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All</option>
                <option value="books">Books</option>
                <option value="magazines">Magazines</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="freeEbooks"
                checked={filter === "free-ebooks"}
                onChange={(e) =>
                  setFilter(e.target.checked ? "free-ebooks" : "")
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="freeEbooks"
                className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Free E-books
              </label>
            </div>
          </div>
        </div>

        {loading && books.length === 0 ? (
          <p className="text-center text-gray-500 text-xl dark:text-gray-400">
            Loading...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {books.map((book) => (
                <Card key={book.id} book={book} handleSave={handleSave} />
              ))}
            </div>

            {books.length > 0 && books.length < totalItems && (
              <div className="text-center pb-8">
                <button
                  onClick={() => handleSearch(null, false)}
                  disabled={loading}
                  className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg shadow hover:bg-gray-200 font-medium transition text-lg disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  {loading ? "Loading more..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default SearchBooks;
