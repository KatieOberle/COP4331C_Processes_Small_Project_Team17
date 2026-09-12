<?php
// 1. Session authentication check
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

// 2. Database connection string (Update credentials when team finalizes database setup)
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "small_project_test");

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

// Reset AUTO_INCREMENT to lowest number
$stmt = $conn->prepare("SELECT MAX(ID) FROM Contacts");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

if(!$stmt->execute())
{
    http_response_code(500);
        error_log($stmt->error);
    sendJson(["error" => "Server error"]);
    $stmt->close();
    $conn->close();
    exit();
}

$result = $stmt->get_result();

if( $row = $result->fetch_assoc()  )
{
	$nextId = $row['ID'] + 1;
	$stmt = $conn->prepare("ALTER TABLE Contacts AUTO_INCREMENT=$nextId");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

if(!$stmt->execute())
{
    http_response_code(500);
        error_log($stmt->error);
    sendJson(["error" => "Server error"]);
    $stmt->close();
    $conn->close();
    exit();
}

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
