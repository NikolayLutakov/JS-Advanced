import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    allMemes: `/data/memes?sortBy=_createdOn%20desc`,
    memeById: `/data/memes/`,
    deleteById: `/data/memes/`,
    createMeme: `/data/memes`,
    editMeme: `/data/memes/`,
    myMemes: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAllMemes() {
    return api.get(endpoints.allMemes);
}

export async function getMyMemes(userId) {
    return api.get(endpoints.myMemes(userId));
}

export async function getMemeById(id) {
    return api.get(endpoints.memeById + id);
}

export async function deleteMeme(id) {
    return api.del(endpoints.deleteById + id);
}
export async function createMeme(title, description, imageUrl) {
    return api.post(endpoints.createMeme, { title, description, imageUrl });
}

export async function editMeme(id, title, description, imageUrl) {
    return api.put(endpoints.editMeme + id, { title, description, imageUrl });
}