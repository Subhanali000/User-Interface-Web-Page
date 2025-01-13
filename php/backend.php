<?php
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wordpress";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Helper function to send a JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Helper function to validate request methods and parameters
function validateRequest($method, $requiredParams = []) {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        sendResponse(['error' => 'Invalid request method. Expected ' . strtoupper($method)], 405);
    }

    foreach ($requiredParams as $param) {
        if (!isset($_REQUEST[$param]) || empty(trim($_REQUEST[$param]))) {
            sendResponse(['error' => 'Missing or empty required parameter: ' . $param], 400);
        }
    }
}

// Handle requests
$action = isset($_GET['action']) ? $_GET['action'] : null;

switch ($action) {
    case 'getArticles':
        $sql = "SELECT * FROM articles ORDER BY date DESC";
        $result = $conn->query($sql);

        if (!$result) {
            sendResponse(['error' => 'Error fetching articles: ' . $conn->error], 500);
        }

        $articles = [];
        while ($row = $result->fetch_assoc()) {
            $articles[] = [
                'title' => htmlspecialchars($row['title']),
                'content' => htmlspecialchars($row['content']),
                'author' => htmlspecialchars($row['author']),
                'date' => $row['date']
            ];
        }

        sendResponse($articles);
        break;

    case 'insertArticle':
        validateRequest('POST', ['title', 'content', 'author']);

        $title = $conn->real_escape_string(trim($_POST['title']));
        $content = $conn->real_escape_string(trim($_POST['content']));
        $author = $conn->real_escape_string(trim($_POST['author']));

        $sql = "INSERT INTO articles (title, content, author) VALUES ('$title', '$content', '$author')";

        if ($conn->query($sql) === TRUE) {
            sendResponse(['message' => 'New article created successfully']);
        } else {
            sendResponse(['error' => 'Failed to create article: ' . $conn->error], 500);
        }
        break;

    default:
        sendResponse(['error' => 'Invalid action'], 404);
        break;
}

$conn->close();
?>
