// Utility function for API calls
function callApi(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || `HTTP Error: ${response.status}`);
                });
            }
            return response.json();
        });
}

// Fetch Articles (GET request)
function fetchArticles() {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '<p>Loading...</p>'; // Show loading indicator

    callApi('php/backend.php?action=getArticles')
        .then(data => updateArticlesUI(data))
        .catch(error => {
            console.error('Error fetching articles:', error);
            articlesDiv.innerHTML = '<p>Failed to load articles. Please try again later.</p>';
        });
}

// Toggle the visibility of the upload article form
function toggleUploadForm() {
    const formContainer = document.getElementById('uploadForm');
    formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (event) => {
    const formContainer = document.getElementById('uploadForm');
    if (formContainer.style.display === 'block' && !formContainer.contains(event.target) && !event.target.closest('a[href="javascript:void(0);"]')) {
        formContainer.style.display = 'none';
    }
});

function insertArticle() {
    const title = document.getElementById('articleTitle').value.trim();
    const content = document.getElementById('articleContent').value.trim();
    const author = document.getElementById('articleAuthor').value.trim();

    if (!title || !content || !author) {
        alert('All fields are required!');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);

    fetch('php/backend.php?action=insertArticle', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert(data.message);
                fetchArticles(); // Refresh the articles list
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });

    // Clear the form fields
    clearFormFields(['articleTitle', 'articleContent', 'articleAuthor']);
    toggleUploadForm();
    alert('Article submitted successfully!');
}

function updateArticlesUI(articles) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = ''; // Clear previous content

    // Add the "Articles" title at the top
    const articlesTitle = document.createElement('h2');
    articlesTitle.innerText = 'Articles';
    articlesDiv.appendChild(articlesTitle); // Add the title to the container

    if (articles && Array.isArray(articles) && articles.length > 0) {
        articles.forEach((article, index) => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
                <h3>${sanitizeHtml(article.title)}</h3>
                <p>${sanitizeHtml(article.content)}</p>
                <p><strong>Author:</strong> ${sanitizeHtml(article.author)}</p>
                <p><strong>Date:</strong> ${new Date(article.date).toLocaleString()}</p>
            `;

            // Append the article to the container
            articlesDiv.appendChild(articleElement);

            // Add a separator (line) between articles, except after the last one
            if (index < articles.length - 1) {
                const separator = document.createElement('hr');
                articlesDiv.appendChild(separator);
            }
        });
    } else {
        articlesDiv.innerHTML = '<p>No articles found.</p>';
    }
}

// Clear form fields by their IDs
function clearFormFields(fieldIds) {
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = '';
    });
}

// Sanitize HTML to prevent XSS attacks
function sanitizeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

// Toggle the visibility of the search box
function toggleSearchBox() {
    const searchBox = document.getElementById('searchBox');
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
}

// Perform search based on user input
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        alert(`Searching for: ${searchInput}`);
    } else {
        alert('Please enter a search term.');
    }
}

// Open the sidebar
function openNav() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.style.width = '250px';
    document.body.classList.add('sidebar-open'); // Add a class to detect clicks outside
}

// Close the sidebar
function closeNav() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.style.width = '0';
    document.body.classList.remove('sidebar-open');
}

// Hide sidebar and search when clicking outside
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('mySidebar');
    const searchBox = document.getElementById('searchBox');
    const sidebarIsOpen = document.body.classList.contains('sidebar-open');

    if (sidebarIsOpen && !sidebar.contains(event.target) && !event.target.closest('.openbtn')) {
        closeNav();
    }

    if (searchBox.style.display === 'block' && !searchBox.contains(event.target) && !event.target.closest('.search-icon')) {
        searchBox.style.display = 'none';
    }
});

// Initialize dropdown functionality
function initializeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');

        button.addEventListener('mouseover', () => {
            content.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            content.style.display = 'none';
        });
    });
}

// Initialize the page after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    // Event listener for the "Learn More" button
    learnMoreBtn.addEventListener('click', () => {
        alert('Thank you for exploring this UI!');
    });

    // Initialize dropdowns
    initializeDropdowns();

    // Fetch and display articles
    fetchArticles();
});
