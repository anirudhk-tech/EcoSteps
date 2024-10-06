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
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    setSummary('');  // Reset summary when a new search is made

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

      // Automatically summarize articles after search
      await handleSummarize(data.results);
    } catch (error) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(results)
  }, [results]);

  if (results) {
    return (
      <SearchContainer>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          flex: 1,
        }}
        >
          <ResultsColumn>
            <SearchTitle>Search Results</SearchTitle>
            {
              results.map((result) => {
                return (
                  <ResultBar>

                  </ResultBar>
                )
              })
            }
          </ResultsColumn>
        </div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          flex: 1,
        }}
        >
          <ResultsColumn>
            <SearchTitle>Summary</SearchTitle>
          </ResultsColumn>
        </div>
      </SearchContainer>
    )
  } else {
    return (
      <Container>
        <motion.div>
          <Column>
            <GlobalLogoContainer onClick={handleSearch}>
              <Image 
              src={GlobePixelSearch}
              style={{
              width: '8vw',
              height: '10vh',
              scale: 3,
              }}/>
              <SearchText>SEARCH</SearchText>
            </GlobalLogoContainer>
            <SearchBarAndOptions>
              <SearchBar 
              placeholder='Would you like to know about GLOBE?Number of articles ---->'
              onChange={(e) => setQuery(e.target.value)}
              />
              <CountBar
              onChange={(e) => setResultsCount(parseInt(e.target.value))}
              />
            </SearchBarAndOptions>
          </Column>
        </motion.div>
      </Container>
    );
  }
}

const Container = styled.div`
  background-image: url(${AIBackground?.src});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
`

const Column = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
`

const SearchText = styled.text`
  font-size: 40px;
  font-family: var(--font-pixel);
  color: #0000000;
`
const GlobalLogoContainer = styled.div`
  background-color: silver;
  height: 40vh;
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  flex-direction: column;
  gap: 10px;
`
const SearchTitle = styled.text`
font-family: var(--font-pixel);
font-size: 50px;
text-align: center;
color: black;
`
const SearchBar = styled.textarea`
  white-space: pre-line;
  overflow: hidden;
  height: 10vh;
  width: 30vw;
  border-radius: 10px;
  border-width: 2px;
  border-color: black;
  background-color: silver;
  color: black;
  font-family: var(--font-pixel);
  text-align: 'center';
  &::placeholder {
    color: #000000; 
    opacity: 1; 
  }
  padding-left: 2px;
`

const CountBar = styled.input`
  height: 10vh;
  width: 5vw;
  border-radius: 10px;
  border-width: 2px;
  border-color: black;
  background-color: silver;
  color: black;
  font-family: var(--font-pixel);
  text-align: center;
  &::placeholder {
    color: #000000; 
    opacity: 1; 
  }
  padding-left: 2px;
`
const SearchBarAndOptions = styled.div`
  height: 10vh;
  width: 50vw;
  margin-left: 10vw;
  gap: 10px;
  flex: 1;
  display: flex;
  flex-direction: row;
`

const SearchContainer = styled.div`
background-image: url(${AIBackground?.src});
background-size: cover;
background-position: center;
height: 100vh;
width: 100vw;
display: flex;
flex: 1;
align-items: center;
flex-direction: row;
gap: 50px;
padding: 50px;
`


const ResultsColumn = styled.div`
  height: 100vh;
  flex: 1;
  background-color: silver;
  border-color: black;
  border-width: 2px;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflowY: scroll;
`

const ResultBar = styled.div`
  border-radius: 5px;
  border-width: 2px;
  border-color: black;
  height: 100px;
`
