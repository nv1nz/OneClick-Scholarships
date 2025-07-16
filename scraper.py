import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def scrape_nsp():
    url = "https://scholarships.gov.in/"
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    items = []
    for card in soup.select('.scholarship-card')[:10]:
        title = card.select_one('.title').get_text(strip=True)
        link = card.select_one('a')['href']
        items.append({
            "name": title,
            "amount": "N/A",
            "deadline": card.select_one('.deadline').get_text(strip=True),
            "class": "UG",
            "category": "General",
            "link": link
        })
    return items

def run():
    data = scrape_nsp()
    with open('scholarships.json', 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Scraped {len(data)} items on {datetime.utcnow()}")

if __name__ == "__main__":
    run()
