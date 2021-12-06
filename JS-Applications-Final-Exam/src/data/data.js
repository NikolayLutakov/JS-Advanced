import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: `/data/albums?sortBy=_createdOn%20desc&distinct=name`,
    byId: `/data/albums/`,
    add: `/data/albums`,
    edit: `/data/albums/`,
    delete: `/data/albums/`,
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getById(itemId) {
    return api.get(endpoints.byId + itemId);
}

export async function addItem(name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description
  ) {
    return api.post(endpoints.add, {name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
      });
}

export async function editItem(itemId,
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description
  ) {
    return api.put(endpoints.edit + itemId, {name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
      });
}

export async function deleteItem(itemId) {
    return api.del(endpoints.delete + itemId);
}

export async function search(query) {
    return api.get(endpoints.search(query));
}