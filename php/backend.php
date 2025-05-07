
<?php
header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wordpress";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}


function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function validateRequest($method, $requiredParams = []) {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        sendResponse(['error' => 'Invalid request method. Expected ' . strtoupper($method)], 405);
    }
    foreach ($requiredParams as $param) {
        if (!isset($_POST[$param]) || trim($_POST[$param]) === '') {
            sendResponse(['error' => 'Missing or empty required parameter: ' . $param], 400);
        }
    }
}

function sanitize($conn, $str) {
    return htmlspecialchars($conn->real_escape_string(trim($str)));
}

$action = $_GET['action'] ?? null;

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
                'imageUrl' => $row['image_url'] ? 'uploads/' . $row['image_url'] : null,
                'content' => htmlspecialchars($row['content']),
                'author' => htmlspecialchars($row['author']),
                'date' => $row['date']
            ];
        }

        sendResponse($articles);
        break;

    case 'insertArticle':
        validateRequest('POST', ['articleTitle', 'articleContent', 'articleAuthor']);
        
        $title = sanitize($conn, $_POST['articleTitle']);
        $content = sanitize($conn, $_POST['articleContent']);
        $author = sanitize($conn, $_POST['articleAuthor']);
        
        
        $imageFileName = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);  
            }

            $tmpName = $_FILES['image']['tmp_name'];
            $originalName = basename($_FILES['image']['name']);
            $imageFileName = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);

            
            if (!move_uploaded_file($tmpName, $uploadDir . $imageFileName)) {
                sendResponse(['error' => 'Image upload failed.'], 500);
            }
        }
        
       
        $stmt = $conn->prepare("INSERT INTO articles (title, content, author, date, image_url) VALUES (?, ?, ?, NOW(), ?)");
        $stmt->bind_param("ssss", $title, $content, $author, $imageFileName);
        
        if ($stmt->execute()) {
            sendResponse([
                'message' => 'Article uploaded successfully',
                'imageUrl' => $imageFileName 
            ]);
        } else {
            sendResponse(['error' => 'Failed to insert article: ' . $stmt->error], 500);
        }
        
        $stmt->close();
        break;
        
    default:
        sendResponse(['error' => 'Invalid action'], 404);
        break;
}

$conn->close();
?>
