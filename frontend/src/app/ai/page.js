'use client';
import { useState } from 'react';
import AIBackground from '../public/background/searchEngineBackground.jpeg';
import styled from 'styled-components';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [resultsCount, setResultsCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('http://10.1.119.206:5500/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,  // Your question here
          results: resultsCount,  // Number of results to fetch
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setResults(data.articles || []);
    } catch (error) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>

    </Container>
  );
}

const Container = styled.div`
  background-image: url(${AIBackground?.src});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`
