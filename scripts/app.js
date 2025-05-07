
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


function toggleUploadForm() {
    const uploadForm = document.getElementById('uploadForm'); 
    
    if (uploadForm) {
        if (uploadForm.style.display === 'none' || uploadForm.style.display === '') {
            
            uploadForm.style.display = 'block';
        } else {
            
            clearFormFields();
           
            uploadForm.style.display = 'none';
        }
    }
}


function fetchArticles() {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '<p>Loading...</p>';

    callApi('php/backend.php?action=getArticles')
        .then(data => updateArticlesUI(data))
        .catch(error => {
            console.error('Error fetching articles:', error);

            
            articlesDiv.innerHTML = '<p>Failed to load articles. Please try again later.</p>';

            const errorImage = document.createElement('img');
            errorImage.src = 'http://localhost:8080/ui/php/uploads/404.jpg';
            errorImage.alt = 'Error Image';
            errorImage.style.maxWidth = '100%';
            errorImage.style.height = '100%';
            errorImage.style.width = '100%';
            errorImage.style.borderRadius = '8px';

            
            articlesDiv.appendChild(errorImage);
        });
}


function insertArticle() {
    const form = document.getElementById('articleForm');
    const formData = new FormData(form);
    
    const imageInput = document.getElementById('imageInput');
    const image = imageInput ? imageInput.files[0] : null;

    if (!image) {
        const confirmContinue = confirm("No image uploaded. Do you want to continue without an image?");
        if (!confirmContinue) return; 
    } else {
        formData.append('image', image); 
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/backend.php?action=insertArticle', true);

    xhr.onload = function () {
        try {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.message) {
                alert("Article submitted successfully!");

                
                if (response.imageUrl) {
                    const imgPreview = document.getElementById("imagePreview");
                    imgPreview.src = 'uploads/' + response.imageUrl;  
                    imgPreview.style.display = "block";  
                }

               
                clearFormFields();
                document.getElementById("submitButton").disabled = false;
                
                
                fetchArticles();

                
                document.getElementById("uploadForm").style.display = 'none';
            } else {
                alert("Failed to upload article: " + (response.error || 'Unknown error'));
            }
        } catch (e) {
            alert("Unexpected error during article submission.");
        }
    };

    xhr.onerror = function () {
        alert("Network error while submitting article.");
    };

    xhr.send(formData);
}

function clearFormFields(fieldIds = ['articleTitle', 'articleContent', 'articleAuthor', 'imageInput']) {
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            if (field.type === 'file') {
                field.value = null; 
            } else {
                field.value = '';
            }
        }
    });

    
    const uploadBtn = document.getElementById("uploadBtn");
    if (uploadBtn) {
        uploadBtn.style.display = "inline-block"; 
        uploadBtn.disabled = false;
    }

   
    const preview = document.getElementById("imagePreview");
    if (preview) {
        preview.src = '';
        preview.style.display = "none";
    }

   
    const imageInput = document.getElementById("imageInput");
    if (imageInput) imageInput.disabled = false;
}

function updateArticlesUI(articles) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '';

    const articlesTitle = document.createElement('h2');
    articlesTitle.innerText = 'Articles';
    articlesDiv.appendChild(articlesTitle);

    if (Array.isArray(articles) && articles.length > 0) {
        articles.forEach((article, index) => {
            const articleElement = document.createElement('div');
            articleElement.style.display = 'flex';
            articleElement.style.alignItems = 'flex-start';
            articleElement.style.gap = '20px';
            articleElement.style.marginBottom = '30px';
            articleElement.style.flexWrap = 'wrap'; 
            
           
            const imageDiv = document.createElement('div');
            imageDiv.style.flex = '1';
            imageDiv.style.order = '1';  
            imageDiv.style.marginRight = '150px';  

            if (article.imageUrl) {
                const imagePath = `http://localhost:8080/ui/php/${sanitizeHtml(article.imageUrl)}`;
                imageDiv.innerHTML = `
                    <img src="${imagePath}" alt="Article Image"
                         style="max-width: 100%; height: auto; border-radius: 8px;"
                         onerror="this.onerror=null; this.src='http://localhost:8080/ui/php/uploads/404.jpg';">
                `;
            } else {
                imageDiv.innerHTML = `<p><em>No image uploaded for this article.</em></p>`;
            }

           
            const textDiv = document.createElement('div');
            textDiv.style.flex = '2';
            textDiv.style.order = '2';  

            textDiv.innerHTML = `
                <h3>${sanitizeHtml(article.title)}</h3>
                <p>${sanitizeHtml(article.content)}</p>
                <p><strong>Author:</strong> ${sanitizeHtml(article.author)}</p>
                <p><strong>Date:</strong> ${new Date(article.date).toLocaleString()}</p>
            `;
            
            
            articleElement.appendChild(imageDiv);
            articleElement.appendChild(textDiv);
            articlesDiv.appendChild(articleElement);

            if (index < articles.length - 1) {
                const separator = document.createElement('hr');
                articlesDiv.appendChild(separator);
            }
        });

        const lastArticle = articles[articles.length - 1];
        if (lastArticle && lastArticle.imageUrl) {
            const imgPreview = document.getElementById("imagePreview");
            imgPreview.src = 'http://localhost:8080/ui/php/uploads/' + lastArticle.imageUrl;
            imgPreview.style.display = "block";
        }

    } else {
        articlesDiv.innerHTML += '<p>No articles found.</p>';
    }
}




function sanitizeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

function toggleSearchBox() {
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.style.display = (searchBox.style.display === 'block' ? 'none' : 'block');
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        alert(`Searching for: ${searchInput}`);
    } else {
        alert('Please enter a search term.');
    }
}

function openNav() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.style.width = '250px';
    document.body.classList.add('sidebar-open');
}

function closeNav() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.style.width = '0';
    document.body.classList.remove('sidebar-open');
}

document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('mySidebar');
    const searchBox = document.getElementById('searchBox');
    const sidebarIsOpen = document.body.classList.contains('sidebar-open');

    if (sidebarIsOpen && !sidebar.contains(event.target) && !event.target.closest('.openbtn')) {
        closeNav();
    }

    if (searchBox && searchBox.style.display === 'block' &&
        !searchBox.contains(event.target) && !event.target.closest('.search-icon')) {
        searchBox.style.display = 'none';
    }
});

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
document.addEventListener('click', (event) => {
    const uploadForm = document.getElementById('uploadForm');
    const toggleLink = document.getElementById('uploadToggleLink');

    if (
        uploadForm &&
        uploadForm.style.display === 'block' &&
        !uploadForm.contains(event.target) &&
        event.target !== toggleLink
    ) {
        uploadForm.style.display = 'none';
    }
});




document.addEventListener('DOMContentLoaded', function () {
    fetchArticles();  
    initializeDropdowns(); 
});
