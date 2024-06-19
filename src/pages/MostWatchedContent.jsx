import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, VStack, Spinner, Select, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const MostWatchedContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ type: 'all', genre: 'all' });
  const [sorting, setSorting] = useState('views');
  const [genres, setGenres] = useState(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWeeklySummary = async () => {
    try {
      const cachedSummary = localStorage.getItem('weeklySummary');
      if (cachedSummary) {
        setWeeklySummary(JSON.parse(cachedSummary));
      } else {
        const response = await fetch('https://new-api.example.com/weekly-summary'); // Replace with actual new API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.summary) {
          localStorage.setItem('weeklySummary', JSON.stringify(data.summary));
          setWeeklySummary(data.summary);
        } else {
          throw new Error('Weekly summary not available');
        }
      }
    } catch (error) {
      console.error('Error fetching weekly summary:', error);
      setError('Failed to fetch weekly summary. Weekly summary not available.');
    }
  };

  const fetchData = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://new-api.example.com/content?page=${page}&type=${filters.type}&genre=${filters.genre}&sort=${sorting}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContent((prevContent) => [...prevContent, ...data]);
      setHasMore(data.length > 0); // Example condition, replace with actual logic
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch content data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
    fetchWeeklySummary();
  }, [filters, sorting, page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

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
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <Text>No summary available</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default MostWatchedContent;