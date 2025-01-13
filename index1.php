<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Showcase UI</title>
  <link rel="stylesheet" href="styles/style.css" />
</head>

<body>
  <header>
    <nav>
      <ul>
        <li>
          <button class="openbtn" onclick="openNav()">☰</button>
        </li>
        <li><a href="#" class="logo" alt="logo"></a></li>
        <li>
          <a href="javascript:void(0);" onclick="toggleUploadForm()">Upload An Article</a>
          <div id="uploadForm" class="container" style="display: none;">
            <form class="article_box" id="articleForm" onsubmit="event.preventDefault(); insertArticle();">
              <input type="text" id="articleAuthor" placeholder="Enter Your Name" required>
              <input type="text" id="articleTitle" placeholder="Enter title" required>
              <textarea id="articleContent" placeholder="Enter content" required></textarea>
              <button id="submitButton" onclick="insertArticle()">Submit</button>
            </form>
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
          <a href="javascript:void(0);" class="search-icon" onclick="toggleSearchBox()"></a>
        </li>
      </ul>
      <div id="searchBox" class="search-box">
        <input type="text" id="searchInput" placeholder="Search..." />
        <button onclick="performSearch()">Search</button>
      </div>
      <hr />
      <hr/>
    </nav>
  </header>

  <div id="mySidebar" class="sidebar">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
    <a href="#">Home</a>
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
      <p>Loading...</p>
      <hr>
    </div>
  </div>

  <div id="main">
    <section id="home">
      <button id="learnMoreBtn">Message</button>
    </section>
    <footer>
      <p>© 2025 Showcase</p>
    </footer>
  </div>

  <script src="scripts/app.js"></script>
</body>

</html>
