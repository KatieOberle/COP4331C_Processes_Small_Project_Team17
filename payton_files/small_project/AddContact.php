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
$firstName = trim($inData['firstName'] ?? '');
$lastName  = trim($inData['lastName'] ?? '');
$email     = trim($inData['email'] ?? '');
$phone     = trim($inData['phone'] ?? '');
$userId    = $_SESSION['userId'];

// 4. Input validation
if($firstName === '' || $lastName === '' || ($email === '' && $phone === ''))
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

// 5. Prepared INSERT statement for 5 columns (DateCreated handled by DB default)
$stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, Phone, UserID) VALUES (?, ?, ?, ?, ?)");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

$stmt->bind_param("ssssi", $firstName, $lastName, $email, $phone, $userId);

if(!$stmt->execute())
{
    http_response_code(500);
	error_log($stmt->error);
    sendJson(["error" => "Server error"]);
    $stmt->close();
    $conn->close();
    exit();
}

// 6. Capture the newly created auto-increment ID
$newId = (int)$conn->insert_id;
$stmt->close();

// 7. Query the row back to obtain DateCreated
$stmt = $conn->prepare("SELECT DateCreated FROM Contacts WHERE ID = ?");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

$stmt->bind_param("i", $newId);

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

$dateCreated = null;
if($row = $result->fetch_assoc())
{
    $dateCreated = $row['DateCreated'];
}
$stmt->close();
$conn->close();

// 8. Return created contact payload
http_response_code(201);
sendJson([
    "id"          => $newId,
    "firstName"   => $firstName,
    "lastName"    => $lastName,
    "email"       => $email,
    "phone"       => $phone,
    "dateCreated" => $dateCreated
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
