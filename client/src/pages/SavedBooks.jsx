import { useState, useEffect } from "react";
import { getMyLibrary, removeBook, updateBook } from "../services/api";

const SavedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getMyLibrary();
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await removeBook(id);
      setBooks(books.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await updateBook(id, { status });
      setBooks(books.map((b) => (b.id === id ? res.data : b)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Library</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {books.length === 0 ? (
            <p className="text-gray-500">No books saved yet.</p>
          ) : null}
          {books.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BookItem = ({ book, onDelete, onUpdateStatus }) => {
  const [review, setReview] = useState(book.personalReview);
  const [isEditing, setIsEditing] = useState(false);

  const saveReview = async () => {
    try {
      await updateBook(book._id, { personalReview: review });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex md:flex-row flex-col gap-6 items-start hover:shadow-lg transition">
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-32 h-48 object-cover rounded shadow-sm"
      />
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-2xl text-gray-800 mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              {book.authors.join(", ")}
            </p>
          </div>
          <select
            value={book.status}
            onChange={(e) => onUpdateStatus(book._id, e.target.value)}
            className={`border px-3 py-1 rounded text-sm font-medium ${
              book.status === "Completed"
                ? "text-green-600 border-green-200 bg-green-50"
                : book.status === "Reading"
                ? "text-blue-600 border-blue-200 bg-blue-50"
                : "text-gray-600 border-gray-200 bg-gray-50"
            }`}
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="font-semibold text-sm text-gray-700 mb-2 uppercase tracking-wide">
            Personal Review
          </p>
          {isEditing ? (
            <div className="flex gap-2 flex-col sm:flex-row">
              <textarea
                className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="2"
              />
              <div className="flex flex-col gap-2 justify-start">
                <button
                  onClick={saveReview}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 text-sm hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer group"
              onClick={() => setIsEditing(true)}
            >
              <p className="text-gray-700 italic">
                {review || (
                  <span className="text-gray-400 not-italic">
                    Click to add a personal review...
                  </span>
                )}
              </p>
              <div className="mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition">
                Click to edit
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <a
            href={`https://books.google.com/books?id=${book.googleBookId}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            View on Google Books
          </a>
          <button
            onClick={() => onDelete(book._id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove from Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedBooks;
