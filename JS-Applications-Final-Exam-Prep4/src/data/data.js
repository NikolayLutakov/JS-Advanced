import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/cars?sortBy=_createdOn%20desc`,
    byId: `/data/cars/`,
    delete: `/data/cars/`,
    create: `/data/cars`,
    edit: `/data/cars/`,
    my: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    serch: (query) => `/data/cars?where=year%3D${query}`
}


export async function getAll() {
    return api.get(endpoints.all);
}

export async function getMy(userId) {
    return api.get(endpoints.my(userId));
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function deleteListing(id) {
    return api.del(endpoints.delete + id);
}

export async function createListing(brand, model, description, year, imageUrl, price) {
    return api.post(endpoints.create, {brand, model, description, year, imageUrl, price});
}

export async function editListing(listingId, brand, model, description, year, imageUrl, price) {
    return api.put(endpoints.edit + listingId, {brand, model, description, year, imageUrl, price});
}

export async function search(query) {
    return api.get(endpoints.serch(query));
}