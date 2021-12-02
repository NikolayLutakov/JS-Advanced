import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/books?sortBy=_createdOn%20desc`,
    my: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    byId: `/data/books/`,
    add: `/data/books`,
    delete: `/data/books/`,
    edit: `/data/books/`,
    isLiked: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    likes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    addLike: `/data/likes`
}


export async function getAll() {
    return api.get(endpoints.all);
}

export async function getMy(userId) {
    return api.get(endpoints.my(userId));
}

export async function getById(bookId) {
    return api.get(endpoints.byId + bookId);
}

export async function createBook(title, description, imageUrl, type) {
    return api.post(endpoints.add, { title, description, imageUrl, type })
}

export async function editBook(bookId, title, description, imageUrl, type) {
    return api.put(endpoints.edit + bookId, { title, description, imageUrl, type })
}

export async function deleteBook(bookId) {
    return api.del(endpoints.delete + bookId)
}

export async function getLikesCount(bookId) {
    return api.get(endpoints.likes(bookId));
}

export async function getIsLiked(bookId, userId) {
    return api.get(endpoints.isLiked(bookId, userId));
}

export async function addLike(bookId) {
    return api.post(endpoints.addLike, { bookId });
}