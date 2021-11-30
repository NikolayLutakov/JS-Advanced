import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    createBook: `/data/books`,
    getAllBooks: `/data/books?sortBy=_createdOn%20desc`,
    getById: '/data/books/',
    delById: '/data/books/',
    editBook: '/data/books/',
    myBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    like: '/data/likes',
    getBookLikesCount: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    getBookLikesForUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function addBook(title, description, imageUrl, type) {
    return api.post(endpoints.createBook, { title, description, imageUrl, type });
}

export async function editBook(id, title, description, imageUrl, type) {
    return api.put(endpoints.editBook + id, { title, description, imageUrl, type });
}

export async function getAllBooks() {
    return api.get(endpoints.getAllBooks);
}

export async function getMyBooks(userId) {
    return api.get(endpoints.myBooks(userId));
}

export async function getBookById(id) {
    return api.get(endpoints.getById + id);
}

export async function deleteBook(id) {
    return api.del(endpoints.delById + id);
}

export async function likeBook(bookId) {
    return api.post(endpoints.like, { bookId });
}

export async function getBookLikesCount(bookId) {
    return api.get(endpoints.getBookLikesCount(bookId));
}

export async function getBookLikesForUser(bookId, userId) {
    return api.get(endpoints.getBookLikesForUser(bookId, userId));
}