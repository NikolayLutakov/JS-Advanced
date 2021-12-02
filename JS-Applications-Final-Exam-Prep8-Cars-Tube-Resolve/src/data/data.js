import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/cars?sortBy=_createdOn%20desc`,
    byId: `/data/cars/`,
    add: `/data/cars`,
    edit: `/data/cars/`,
    delete: `/data/cars/`,
    search: `/data/cars?where=year%3D`,
    my: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function search(query) {
    return api.get(endpoints.search + query);
}

export async function getMy(userId) {
    return api.get(endpoints.my(userId));
}

export async function getById(itemId) {
    return api.get(endpoints.byId + itemId);
}

export async function addItem(brand,
    model,
    description,
    year,
    imageUrl,
    price
) {
    return api.post(endpoints.add, {
        brand,
        model,
        description,
        year,
        imageUrl,
        price
    });
}

export async function editItem(itemId, brand,
    model,
    description,
    year,
    imageUrl,
    price
) {
    return api.put(endpoints.edit + itemId, {
        brand,
        model,
        description,
        year,
        imageUrl,
        price
    });
}

export async function deleteItem(itemId) {
    return api.del(endpoints.delete + itemId);
}