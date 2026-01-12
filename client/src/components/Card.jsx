import React from "react";

const Card = ({ book, handleSave }) => {
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg dark:hover:shadow-gray-700 transition duration-200">
        <div className="h-56 overflow-hidden bg-gray-100 dark:bg-gray-700 flex justify-center items-center">
          {book.volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-1 leading-tight text-gray-800 dark:text-white">
            {book.volumeInfo.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 italic">
            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
            {book.volumeInfo.description}
          </p>
          <div className="flex gap-2 mt-auto">
            <a
              href={book.volumeInfo.previewLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition text-sm"
            >
              Preview
            </a>
            <button
              onClick={() => handleSave(book)}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 dark:hover:bg-green-500 transition text-sm font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
