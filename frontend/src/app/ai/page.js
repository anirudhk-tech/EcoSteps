'use client';
import { useState } from 'react';
import styles from '../styles/SearchPage.module.css';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [resultsCount, setResultsCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState(''); // To store the summarized text

  // Function to handle search request
  const handleSearch = async (e) => {
    e.preventDefault();
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

  // Function to handle summary request
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
      console.log(data);
      setSummary(data.summary || 'No summary available.');
    } catch (error) {
      setError('Failed to summarize articles. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
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
                <h3>{result.title || 'Untitled'}</h3>
                <p>{result.description || 'No description available'}</p>
                <p><strong>Document Type:</strong> {result.doc_type || 'Unknown'}</p>
                {result.url && (
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>

      <div className={styles.rightPanel}>
        <h2>Summarized Text</h2>
        <div className={styles.summaryBox}>
          {summary ? <p>{summary}</p> : <p>No summary available yet.</p>}
        </div>
      </div>
    </div>
  );
}
