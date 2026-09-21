<?php
// 1. Session authentication check
session_set_cookie_params([
 'lifetime' => 0,
 'path' => '/',
 'secure' => true, // once served over HTTPS
 'httponly' => true,
 'samesite' => 'Lax',
]);
session_start();
if(!isset($_SESSION['userId']))
{
    http_response_code(401);
    sendJson(["error" => "Not authenticated"]);
    exit();
}

// Read incoming JSON body
$inData = getRequestInfo();

// 3. Read input fields
$contactId     = trim($inData['id'] ?? '');
$userId    = $_SESSION['userId'];

// 4. Input validation
if($contactId === '')
{
    http_response_code(400);
    sendJson(["error" => "Missing required field"]);
    exit();
}

$cfg = require __DIR__ . '/config.php';

$conn = new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['name']); 	
if($conn->connect_error)
{
    http_response_code(500);
	error_log($conn->connect_error);
    sendJson(["error" => "Server error"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND userId=?");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

$stmt->bind_param("ii", $contactId, $_SESSION['userId']);

if(!$stmt->execute())
{
    http_response_code(500);
	error_log($stmt->error);
    sendJson(["error" => "Server error"]);
    $stmt->close();
    $conn->close();
    exit();
}
if ($stmt->affected_rows === 0)
{
	http_response_code(404);
	$stmt->close();
	$conn->close();
	sendJson(["error" => "Contact not found"]);
	exit();
}

$conn->close();
http_response_code(201);
sendJson([
    "id"          => $contactId
]);

// Helper Functions
function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendJson($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}
?>
