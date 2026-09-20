<?php
	// Start session for ID handling
	session_start();
	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$cfg = require __DIR__ . '/config.php';

	$conn = new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['name']); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Get the ID, name, and HASHED password that match the login
		$login = trim($inData["login"] ?? '');
		$password = $inData["password"] ?? '';
		if ($login === '' || $password === '')
		{
			http_response_code(400);
			returnWithError("Missing username or password");
			exit();
		}
		$stmt = $conn->prepare("SELECT ID,firstName,lastName,Password FROM Users WHERE Login=?");
		$stmt->bind_param("s", $login);
		if (!$stmt->execute())
		{
			http_response_code(500);
			error_log($stmt->error);
			returnWithError("Server error");
			exit();
		}
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			// Verify that the input password matches the hashed password
			$verify = password_verify($inData["password"], $row['Password']);

			if($verify)
			{
				session_regenerate_id(true);
				$_SESSION['userId'] = $row['ID'];
				returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
			}
			else
				returnWithError("Wrong Password!");
		}
		else
		{
			returnWithError("No Records Found");
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
