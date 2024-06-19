import axios from 'axios';

const rottenTomatoesApiKey = process.env.REACT_APP_ROTTEN_TOMATOES_API_KEY;
const imdbApiKey = process.env.REACT_APP_IMDB_API_KEY;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const fetchRottenTomatoesRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=${rottenTomatoesApiKey}&q=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Rotten Tomatoes ratings:', error);
    return null;
  }
};

export const fetchImdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${imdbApiKey}/${title}?type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IMDb ratings:', error);
    return null;
  }
};

export const fetchOmdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OMDb ratings:', error);
    return null;
  }
};

export const fetchTmdbRatings = async (title, filters, sorting) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${title}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TMDb ratings:', error);
    return null;
  }
};