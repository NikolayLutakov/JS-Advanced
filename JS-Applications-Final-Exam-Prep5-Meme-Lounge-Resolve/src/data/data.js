import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/memes?sortBy=_createdOn%20desc`,
    my: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    byId: `/data/memes/`,
    edit: `/data/memes/`,
    add: `/data/memes`,
    remove: `/data/memes/`,
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getMy(userId) {
    return api.get(endpoints.my(userId));
}

export async function getById(memeId) {
    return api.get(endpoints.byId + memeId);
}

export async function createMeme(title, description, imageUrl) {
    return api.post(endpoints.add, { title, description, imageUrl });
}

export async function editMeme(memeId, title, description, imageUrl) {
    return api.put(endpoints.edit + memeId, { title, description, imageUrl });
}

export async function deleteMeme(memeId) {
    return api.del(endpoints.remove + memeId);
}