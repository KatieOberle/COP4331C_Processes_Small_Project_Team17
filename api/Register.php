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
		// Check if username is already taken
		$stmt = $conn->prepare("SELECT * from Users WHERE Login=?");
		$stmt->bind_param("s", $login);

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
		if( $row = $result->fetch_assoc()  )
		{
			if($row['Login'] !== '')
				returnWithError("Username already taken");

		}

		// Create a user with the input information (the ID is handled as an AUTO_INCREMENT)
		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		if (!$stmt->execute())
		{
			http_response_code(500);
			error_log($stmt->error);
			returnWithError("Server error");
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
