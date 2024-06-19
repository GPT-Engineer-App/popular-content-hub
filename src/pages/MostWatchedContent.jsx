import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Spinner, Select, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import axios from 'axios';
import { fetchRottenTomatoesRatings, fetchImdbRatings, fetchOmdbRatings, fetchTmdbRatings } from '../utils/ratings';

const MostWatchedContent = () => {
  // State variables
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ type: 'all', genre: 'all' });
  const [sorting, setSorting] = useState('views');
  const [genres, setGenres] = useState(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeeklySummary = async () => {
    try {
      const cachedSummary = localStorage.getItem('weeklySummary');
      if (cachedSummary) {
        setWeeklySummary(JSON.parse(cachedSummary));
      } else {
        const response = await axios.get('https://api.example.com/weekly-summary'); // Replace with actual API endpoint
        localStorage.setItem('weeklySummary', JSON.stringify(response.data));
        setWeeklySummary(response.data);
      }
    } catch (error) {
      console.error('Error fetching weekly summary:', error);
      setError('Failed to fetch weekly summary.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const title = 'Inception'; // Example title, replace with dynamic title
        const rottenTomatoesData = await fetchRottenTomatoesRatings(title, filters, sorting);
        const imdbData = await fetchImdbRatings(title, filters, sorting);
        const omdbData = await fetchOmdbRatings(title, filters, sorting);
        const tmdbData = await fetchTmdbRatings(title, filters, sorting);

        // Combine data from all sources
        const combinedData = {
          title,
          rottenTomatoes: rottenTomatoesData,
          imdb: imdbData,
          omdb: omdbData,
          tmdb: tmdbData,
        };

        setContent([combinedData]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch content data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchWeeklySummary();
  }, [filters, sorting]);

  return (
    <Box p={4}>
      <Heading mb={4}>Most Watched Content</Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text>Filter by Type:</Text>
          <Select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="all">All</option>
            <option value="movies">Movies</option>
            <option value="shows">TV Shows</option>
          </Select>
        </Box>
        <Box>
          <Text>Filter by Genre:</Text>
          <Select value={filters.genre} onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
            <option value="all">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>Sort by:</Text>
          <Select value={sorting} onChange={(e) => setSorting(e.target.value)}>
            <option value="views">Views</option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </Select>
        </Box>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Box>
            {/* Content will be displayed here */}
            {content.length === 0 ? (
              <Text>No content available</Text>
            ) : (
              content.map((item, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
                  <Text>{item.title}</Text>
                  <Text>Rotten Tomatoes: {item.rottenTomatoes ? item.rottenTomatoes.total : 'N/A'}</Text>
                  <Text>IMDb: {item.imdb ? item.imdb.total : 'N/A'}</Text>
                  <Text>OMDb: {item.omdb ? item.omdb.total : 'N/A'}</Text>
                  <Text>TMDb: {item.tmdb ? item.tmdb.total : 'N/A'}</Text>
                </Box>
              ))
            )}
          </Box>
        )}
        <Box>
          <Heading size="md">Weekly Summary</Heading>
          {weeklySummary ? (
            <Text>{weeklySummary}</Text>
          ) : (
            <Text>No summary available</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default MostWatchedContent;