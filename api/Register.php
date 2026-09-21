<?php
	$inData = getRequestInfo();
	
	$firstName = trim($inData["firstName"] ?? '');
	$lastName = trim($inData["lastName"] ?? '');
	$login = trim($inData["login"] ?? '');
	$passwordRaw = $inData["password"];

	if ($firstName === '' | $lastName === '' | $login === '' | $passwordRaw === '')
	{
		http_response_code(400);
		returnWithError("Missing required field");
		exit();
	}

	// Hash the input password
	$password = password_hash($inData["password"], PASSWORD_BCRYPT);

	$cfg = require __DIR__ . '/config.php';

	$conn = new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['name']); 	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Create a user with the input information (the ID is handled as an AUTO_INCREMENT)
		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		$stmt->execute();
		if (!$stmt->execute())
		{
			if ($conn->errno === 1062) // duplicate key
			{
				http_response_code(409);
				returnWithError("Username already taken");
			}
			else
			{
				http_response_code(500);
				error_log($stmt->error);
				returnWithError("Server error");
			}
			$stmt->close();
			$conn->close();
			exit();
		}
		$stmt->close();
		$conn->close();
		returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
