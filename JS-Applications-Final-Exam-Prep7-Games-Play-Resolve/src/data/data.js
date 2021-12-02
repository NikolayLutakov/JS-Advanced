import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/games?sortBy=_createdOn%20desc`,
    recent: `/data/games?sortBy=_createdOn%20desc&distinct=category`,
    byId: `/data/games/`,
    add: `/data/games`,
    edit: `/data/games/`,
    delete: `/data/games/`,
    allComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    addComment: `/data/comments`
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(itemId) {
    return api.get(endpoints.byId + itemId);
}

export async function addItem(title, category, maxLevel, imageUrl, summary) {
    return api.post(endpoints.add, { title, category, maxLevel, imageUrl, summary });
}

export async function editItem(itemId, title, category, maxLevel, imageUrl, summary) {
    return api.put(endpoints.edit + itemId, { title, category, maxLevel, imageUrl, summary });
}

export async function deleteItem(itemId) {
    return api.del(endpoints.delete + itemId);
}

export async function getAllComments(gameId) {
    return api.get(endpoints.allComments(gameId));
}

export async function addComment(gameId, comment) {
    return api.post(endpoints.addComment, { gameId, comment });
}