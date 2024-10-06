'use client';
import { useState } from 'react';
import styles from '../styles/SearchPage.module.css'

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
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>Search Articles</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query..."
          className={styles.searchInput}
          required
        />

        <input
          type="number"
          value={resultsCount}
          onChange={(e) => setResultsCount(parseInt(e.target.value))}
          className={styles.resultsInput}
          placeholder="Number of results"
          min={1}
          required
        />

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
