import api, { book_api } from "../api/axios";

export const saveBook = (bookData) => api.post("/books", bookData);
export const getMyLibrary = () => api.get("/books");
export const removeBook = (id) => api.delete(`/books/${id}`);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const allbooks = (
  query,
  startIndex = 0,
  filter = null,
  printType = "all"
) => {
  const params = {
    q: query,
    startIndex,
    maxResults: 12,
    printType,
  };
  if (filter) params.filter = filter;
  return book_api.get("/volumes", { params });
};
