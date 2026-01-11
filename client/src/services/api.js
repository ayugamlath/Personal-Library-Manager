import api, { book_api } from "../api/axios";

export const saveBook = (bookData) => api.post("/books", bookData);
export const getMyLibrary = () => api.get("/books");
export const removeBook = (id) => api.delete(`/books/${id}`);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const allbooks = (query) => book_api.get(`/volumes?q=${query}`);
