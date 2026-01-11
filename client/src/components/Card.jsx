import React from "react";

const Card = ({ book, handleSave }) => {
  return (
  <div>
      <div
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition duration-200"
            >
              <div className="h-56 overflow-hidden bg-gray-100 flex justify-center items-center">
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1 leading-tight text-gray-800">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 italic">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                  {book.volumeInfo.description}
                </p>
                <div className="flex gap-2 mt-auto">
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => handleSave(book)}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm font-medium"
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
