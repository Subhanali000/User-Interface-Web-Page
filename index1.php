<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Showcase UI</title>
  <link rel="stylesheet" href="styles/style.css" />
</head>

<body style="background-image: url('/img.jpg');">

  <header>
    <nav>
      <ul>
        <li>
          <button class="openbtn" onclick="openNav()">☰</button>
        </li>
        <li>
          <a href="#" class="logo" aria-label="Logo">
            <img class="logo" src="./logo.png" alt="Logo"
              style="width: 120px; height: auto; display: inline-block; vertical-align: middle; margin-left: 5rem; margin-right: 3rem; cursor: pointer; z-index: 1000; user-select: none;" />
          </a>
        </li>

        <li>
        <a href="javascript:void(0);" id="uploadToggleLink" onclick="toggleUploadForm()">Upload An Article</a>
          <div id="uploadForm" class="container" style="display: none;">
            <form method="POST" enctype="multipart/form-data" class="article_box" id="articleForm"
              onsubmit="event.preventDefault(); insertArticle();">
              <h2 style="display: flex; justify-content: center;">Fill The Details</h2>
              <input type="text" id="articleAuthor" name="articleAuthor" placeholder="Enter Your Name" required>
              <input type="text" id="articleTitle" name="articleTitle" placeholder="Enter Title" required>
              <input type="file" name="image" id="imageInput"><br>
              <textarea id="articleContent" name="articleContent" placeholder="Enter Content" required></textarea>
              <button id="submitButton" type="submit">Submit Article</button>
            </form>
            <img id="imagePreview" style="display:none; max-width: 100%; margin-top: 10px; visibility: hidden;">
          </div>
        </li>
        <li class="dropdown">
          <a href="#Events" class="dropbtn">Events</a>
          <div class="dropdown-content">
            <a href="#Upcoming">Upcoming Events</a>
            <a href="#Past">Past Events</a>
            <a href="#Webinars">Webinars</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#Career" class="dropbtn">Career</a>
          <div class="dropdown-content">
            <a href="#JobOpenings">Job Openings</a>
            <a href="#Internships">Internships</a>
            <a href="#CareerGuides">Career Guides</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#AppAssessor" class="dropbtn">AppAssessor</a>
          <div class="dropdown-content">
            <a href="#TopApps">Top Apps</a>
            <a href="#Reviews">Reviews</a>
            <a href="#Integration">Integration Tips</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#SalesForceNews" class="dropbtn">SalesForce News</a>
          <div class="dropdown-content">
            <a href="#Updates">Latest Updates</a>
            <a href="#CaseStudies">Case Studies</a>
            <a href="#Trends">Market Trends</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#ArticlesByRole" class="dropbtn">Articles By Role</a>
          <div class="dropdown-content">
            <a href="#Consultants">Consultants</a>
            <a href="#Managers">Managers</a>
            <a href="#Executives">Executives</a>
          </div>
        </li>
        <li>
          <a href="javascript:void(0);" class="search-icon" onclick="toggleSearchBox()">
            <img src="./search_bar.png" alt="search icon"
              style="width: 30px; position: relative; right: 10px; cursor: pointer;" />
          </a>
        </li>
      </ul>
      <div id="searchBox" class="search-box">
        <input type="text" id="searchInput" placeholder="Search..." />
        <button onclick="performSearch()">Search</button>
      </div>
      <hr />
      <hr />
    </nav>
  </header>

  <div id="mySidebar" class="sidebar">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
    <a href="index1.php">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </div>
  <nav class="latest">
    <ul>
      <li>Latest</li>
      <li>Most Popular</li>
      <li>Editor's Picks</li>
    </ul>
  </nav>

  <div class="article-container">
    <div id="articles">
      <!-- Articles will be dynamically inserted here -->
    </div>
  </div>
  </div>

  <div id="main">
    <section id="home">
      <button id="learnMoreBtn"></button>

    </section>
    <footer>
      <p>© 2025 Showcase</p>
    </footer>
  </div>

  <script src="scripts/app.js"></script>
</body>

</html>
