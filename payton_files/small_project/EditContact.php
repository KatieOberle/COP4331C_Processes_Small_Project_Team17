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
$firstName = trim($inData['firstName'] ?? '');
$lastName = trim($inData['lastName'] ?? '');
$email = trim($inData['email'] ?? '');
$phone = trim($inData['phone'] ?? '');
$userId    = $_SESSION['userId'];
$dateCreated = '';

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

$stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID=? AND UserID=?");

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

// Get current data for selected contact
$result = $stmt->get_result();

// Store current data for all empty entries
if( $row = $result->fetch_assoc()  )
{
	if($firstName === '')
		$firstName = $row['FirstName'];
	if($lastName === '')
		$lastName = $row['LastName'];
	if($email === '')
		$email = $row['Email'];
	if($phone === '')
		$phone = $row['Phone'];
	$dateCreated = $row['DateCreated'];
}

// Prepare update statement, then execute
$stmt = $conn->prepare("UPDATE Contacts 
	SET FirstName=?, LastName=?, Email=?, Phone=?
	WHERE ID=? AND userId=?");

if(!$stmt)
{
    http_response_code(500);
    error_log($conn->error);
    sendJson(["error" => "Server error"]);
    $conn->close();
    exit();
}

$stmt->bind_param("ssssii", $firstName, $lastName, $email, $phone, $contactId, $_SESSION['userId']);

if(!$stmt->execute())
{
    http_response_code(500);
	error_log($stmt->error);
    sendJson(["error" => "Server error"]);
    $stmt->close();
    $conn->close();
    exit();
}

http_response_code(201);
sendJson([
    "id"          => $contactId,
    "firstName"   => $firstName,
    "lastName"    => $lastName,
    "email"       => $email,
    "phone"       => $phone,
    "dateCreated" => $dateCreated
]);


$conn->close();

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
