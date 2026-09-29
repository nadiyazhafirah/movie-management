import API from './api';

export const getFilms = async () => {
    const response = await API.get('/films');
    return response.data;
};

export const getFilmById = async (id) => {
    const response = await API.get(`/films/${id}`);
    return response.data;
};

export const createFilm = async (data) => {
    const response = await API.post('/films', data);
    return response.data;
};

export const updateFilm = async (id, data) => {
    const response = await API.patch(`/films/${id}`, data);
    return response.data;
};

export const deleteFilm = async (id) => {
    const response = await API.delete(`/films/${id}`);
    return response.data;
};