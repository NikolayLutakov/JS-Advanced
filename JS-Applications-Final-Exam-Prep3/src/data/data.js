import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    mostRecentGames: `/data/games?sortBy=_createdOn%20desc&distinct=category`,
    allGames: `/data/games?sortBy=_createdOn%20desc`,
    gameByid: `/data/games/`,
    createGame: `/data/games`,
    deleteGame: `/data/games/`,
    editGame: `/data/games/`,
    getGameComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    postComment: `/data/comments`
}

export async function getMostRecentGames() {
    return api.get(endpoints.mostRecentGames);
}

export async function getAllGames() {
    return api.get(endpoints.allGames);
}

export async function getById(gameId) {
    return api.get(endpoints.gameByid + gameId);
}

export async function createGame(title, category, maxLevel, imageUrl, summary) {
    return api.post(endpoints.mostRecentGames, { title, category, maxLevel, imageUrl, summary });
}

export async function deleteGame(gameId) {
    return api.del(endpoints.deleteGame + gameId);
}

export async function editGame(gameId, title, category, maxLevel, imageUrl, summary) {
    return api.put(endpoints.editGame + gameId, { title, category, maxLevel, imageUrl, summary });
}

export async function getComments(gameId) {
    return api.get(endpoints.getGameComments(gameId));
}

export async function createComment(gameId, comment) {
    return api.post(endpoints.postComment, { gameId, comment });
}

