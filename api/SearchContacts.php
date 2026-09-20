<?php
session_set_cookie_params([
 'lifetime' => 0,
 'path' => '/',
 'secure' => true, // once served over HTTPS
 'httponly' => true,
 'samesite' => 'Lax',
]);
	session_start();
	
	if (!isset($_SESSION['userId']))
	{
		http_response_code(401);
		echo json_encode(["error" => "Not logged in"]);
		exit;
	}

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$cfg = require __DIR__ . '/config.php';

	$conn = new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['name']); 	
	if ($conn->connect_error) 
	{
		//	returnWithError( $conn->connect_error );
		returnWithError("Connection failed");
	} 
	else
	{
		$stmt = $conn->prepare("select * from Contacts where (FirstName like ? OR LastName like?) and UserID=?");
		$search = trim($inData["search"] ?? '');
		if ($search === '')
		{
			http_response_code(400);
			echo json_encode(["results" => [], "error" => "Missing search term"]);
			exit;
		}
		$contactName = "%" . $search . "%";
		$stmt->bind_param("ssi", $contactName, $contactName, $_SESSION['userId']);
		if (!$stmt->execute())
		{
			http_response_code(500);
			echo json_encode(["results" => [], "error" => "Server error"]);
			exit;
		}
		$result = [];
		
		while($row = $result->fetch_assoc())
		{
			$results[] = [
				"id" => $row["ID"],
				"firstName" => $row["FirstName"],
				"lastName" => $row["LastName"],
				"email" => $row["Email"],
				"phone" => $row["Phone"],
				"dateCreated" => $row["DateCreated"],
			];
		}

		header('Content-Type: application/json');
		echo json_ecode(["results" => $results, "error" => ""]);
		
		if( $searchCount == 0 )
		{
			returnWithError(200);
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"results":[],"error": ' . $err . '}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
