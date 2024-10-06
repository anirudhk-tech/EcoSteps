import os
import json
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# URL of the first page of the articles
base_url = 'https://www.globe.gov/do-globe/globe-protocols/search-for-a-protocol?lFilterIds=13326845'

# Create a folder to store downloaded articles
download_folder = 'globe_articles'
os.makedirs(download_folder, exist_ok=True)

# Initialize Selenium WebDriver
options = webdriver.ChromeOptions()
# Remove the headless option to see the browser window
# options.add_argument('--headless')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Open the base URL
driver.get(base_url)

# Container to store all articles metadata
articles_metadata = []
downloaded_urls = set()  # To track downloaded URLs and avoid duplicates
articles_downloaded = 0

def scrape_page():
    global articles_downloaded
    # Get page source and parse it with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    # Find all article containers directly (without portlet-body)
    articles = soup.find_all('div', class_='globe-teachers-guide-document-container')
    print(f"Found {len(articles)} articles on the page.")
    
    for article in articles:
        try:
            # Extract URL, title, description, and document type
            title_element = article.find('div', class_='globe-teachers-guide-title').find('a')
            url = title_element['href']
            title = title_element.get_text(strip=True)

            # Check for the description element and handle cases where it might be missing
            description_element = article.find('div', class_='globe-teachers-guide-description')
            description = description_element.get_text(strip=True) if description_element else 'No description available'
            
            # Extract document type
            doc_type_element = article.find('span', class_='globe-teachers-guide-doc-type')
            doc_type = doc_type_element.get_text(strip=True) if doc_type_element else 'Unknown document type'
            
            # Check for duplicate URLs
            if url in downloaded_urls:
                print(f'Skipping duplicate article: {title}')
                continue
            
            # Download the article
            article_filename = os.path.join(download_folder, url.split('/')[-1] + '.pdf')
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    with open(article_filename, 'wb') as file:
                        file.write(response.content)
                else:
                    print(f"Failed to download {title}. Status code: {response.status_code}")
                    continue
            except Exception as e:
                print(f"Error downloading article: {e}")
                continue
            
            # Store metadata
            articles_metadata.append({
                'title': title,
                'url': url,
                'description': description,
                'doc_type': doc_type,
                'path': article_filename
            })
            
            # Add URL to the set
            downloaded_urls.add(url)
            articles_downloaded += 1
            print(f'Successfully downloaded: {title}')
            print(f'With Description: {description}')
            print(f"{articles_downloaded} Downloaded")
            print("********************************************************************")
        except Exception as e:
            print(f'Error processing article: {e}')

# Scrape a fixed number of pages (25 pages)
for page_num in range(25):
    print(f"Scraping page {page_num + 1}...")
    scrape_page()
    
    # Check for the 'Next' button and click it if it exists
    try:
        next_button = driver.find_element(By.LINK_TEXT, 'Next')
        if 'disabled' in next_button.get_attribute('class'):
            print("Next button is disabled. Ending pagination.")
            break
        next_button.click()
        
        time.sleep(2)  # Wait for the page to load
    except Exception as e:
        print('No more pages to scrape or error occurred:', e)
        break

# Close the browser
driver.quit()

# Save metadata to a JSON file
with open('articles_metadata.json', 'w') as json_file:
    json.dump(articles_metadata, json_file, indent=4)

print('All articles downloaded and metadata saved to articles_metadata.json.')
