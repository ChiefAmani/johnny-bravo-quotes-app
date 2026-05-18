document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote-display');
    const randomQuoteBtn = document.getElementById('random-quote-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    let quotes = [];

    // Fetch quotes from quotes.json
    fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            quotes = data;
            displayRandomQuote(); // Display a random quote on load
        })
        .catch(error => console.error('Error fetching quotes:', error));

    // Function to display a random quote
    function displayRandomQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteDisplay.textContent = quotes[randomIndex];
            searchResults.innerHTML = ''; // Clear search results when displaying random quote
        }
    }

    // Function to search quotes
    function searchQuotes() {
        const searchTerm = searchInput.value.toLowerCase();
        searchResults.innerHTML = ''; // Clear previous search results

        if (searchTerm.length > 0) {
            const filteredQuotes = quotes.filter(quote =>
                quote.toLowerCase().includes(searchTerm)
            );

            if (filteredQuotes.length > 0) {
                filteredQuotes.forEach(quote => {
                    const p = document.createElement('p');
                    p.textContent = quote;
                    searchResults.appendChild(p);
                });
            } else {
                searchResults.innerHTML = '<p>No quotes found matching your search.</p>';
            }
        } else {
            searchResults.innerHTML = '';
        }
    }

    // Event listeners
    randomQuoteBtn.addEventListener('click', displayRandomQuote);
    searchBtn.addEventListener('click', searchQuotes);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchQuotes();
        }
    });
});
