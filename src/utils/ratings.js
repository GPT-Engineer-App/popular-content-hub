import axios from 'axios';

const rottenTomatoesApiKey = process.env.REACT_APP_ROTTEN_TOMATOES_API_KEY;
const imdbApiKey = process.env.REACT_APP_IMDB_API_KEY;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const fetchRottenTomatoesRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://new-api.example.com/rotten-tomatoes?apikey=${rottenTomatoesApiKey}&q=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Rotten Tomatoes ratings:', error);
    return null;
  }
};

export const fetchImdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://new-api.example.com/imdb?apikey=${imdbApiKey}&q=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IMDb ratings:', error);
    return null;
  }
};

export const fetchOmdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://new-api.example.com/omdb?apikey=${omdbApiKey}&q=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OMDb ratings:', error);
    return null;
  }
};

export const fetchTmdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://new-api.example.com/tmdb?apikey=${tmdbApiKey}&q=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TMDb ratings:', error);
    return null;
  }
};