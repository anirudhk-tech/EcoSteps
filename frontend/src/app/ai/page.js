'use client';
import { useEffect, useState } from 'react';
import AIBackground from '../public/background/searchEngineBackground.jpeg';
import styled from 'styled-components';
import GlobePixelSearch from '../public/web assets/globeBlackPixel.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [resultsCount, setResultsCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    setSummary('');

    try {
      const response = await fetch('http://10.1.119.206:5500/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,
          results: resultsCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setResults(data.results || []);
      
      await handleSummarize(data.results);
      setSearched(true);
    } catch (error) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (articles) => {
    const titles = articles.map(article => article.title).join(', ');

    try {
      const response = await fetch('http://10.1.119.206:5500/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results: results,
        }),
      });

      if (!response.ok) {
        throw new Error('Error summarizing articles');
      }

      const data = await response.json();
      setSummary(data.summary || 'No summary available.');
    } catch (error) {
      setError('Failed to summarize articles. Please try again.');
    }
  };

  return (
    <SearchContainer>
      <Container>
        <GlobalLogoContainer onClick={handleSearch}>
          <Image 
            src={GlobePixelSearch}
            style={{
              width: '8vw',
              height: '10vh',
              scale: 3,
            }}
          />
          <SearchText>SEARCH</SearchText>
        </GlobalLogoContainer>
        <SearchBarAndOptions>
          <SearchBar 
            placeholder='Would you like to know about GLOBE?'
            onChange={(e) => setQuery(e.target.value)}
          />
          <CountBar
            type="number"
            placeholder="0"
            onChange={(e) => setResultsCount(parseInt(e.target.value, 10) || 5)}
            min={1}
          />
        </SearchBarAndOptions>
      </Container>
      <ResultsColumn>
        <SearchTitle>Search Results</SearchTitle>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          results.length > 0 ? (
            results.map((result, index) => (
              <ResultBar key={index}>
                <h1>{result.title || 'Untitled'}</h1>
                <h1>{result.description || 'No description available'}</h1>
                {result.url && (
                  <h1 className='text-blue-500'>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      {result.url}
                    </a>
                  </h1>
                )}
              </ResultBar>
            ))
          ) : (
            <p>No results found.</p>
          )
        )}
      </ResultsColumn>
      <SummaryColumn>
        <SearchTitle>Summary</SearchTitle>
        <SummaryBox>{summary || 'No summary available yet.'}</SummaryBox>
      </SummaryColumn>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  background-image: url(${AIBackground?.src});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 50px;
`;

const Container = styled.div`
  height: 100vh;
  width: 40vw; /* Increased width */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
`;

const GlobalLogoContainer = styled.div`
  background-color: silver;
  height: 30vh; /* Reduced height for better fit */
  width: 30vw; /* Increased width */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  flex-direction: column;
  gap: 10px;
`;

const SearchText = styled.span`
  font-size: 40px;
  font-family: var(--font-pixel);
  color: #000;
`;

const SearchTitle = styled.span`
  font-family: var(--font-pixel);
  font-size: 50px;
  text-align: center;
  color: black;
`;

const SearchBar = styled.textarea`
  white-space: pre-line;
  overflow: hidden;
  height: 10vh;
  width: 30vw;
  border-radius: 10px;
  border: 2px solid black;
  background-color: silver;
  color: black;
  font-size: 25px;
  font-family: var(--font-pixel);
  &::placeholder {
    color: #000; 
    opacity: 1; 
  }
  padding: 4px;
`;

const CountBar = styled.input`
  height: 10vh;
  width: 5vw;
  border-radius: 10px;
  border: 2px solid black;
  background-color: silver;
  color: black;
  font-size: 25px;
  font-family: var(--font-pixel);
  text-align: center;
  &::placeholder {
    color: #000; 
    opacity: 1; 
  }
  padding-left: 2px;
`;

const SearchBarAndOptions = styled.div`
  height: 10vh;
  width: 60vw; /* Increased width for better alignment */
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center; /* Center the fields */
`;

const ResultsColumn = styled.div`
  height: 100vh;
  width: 60vw; /* Increased width */
  background-color: silver;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
`;

const SummaryColumn = styled.div`
  height: 100vh;
  width: 60vw; /* Increased width */
  background-color: silver;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ResultBar = styled.div`
  border-radius: 5px;
  border: 2px solid black;
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  overflow: hidden; /* Prevent overflow */
  word-wrap: break-word; /* Allow long words or URLs to wrap */
`;

const SummaryBox = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 4px; /* Adjusted padding */
  border: 1px solid black;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden; /* Prevent horizontal overflow */
  max-width: 100%; /* Prevent the box from exceeding the width of its container */
  word-wrap: break-word; /* Allow long words or URLs to wrap to the next line */
`;
