<?php

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

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "small_project_test");
	if ($conn->connect_error) 
	{
		//	returnWithError( $conn->connect_error );
		returnWithError("Connection failed");
	} 
	else
	{
		$stmt = $conn->prepare("select * from Contacts where (FirstName like ? OR LastName like?) and UserID=?");
		$contactName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssi", $contactName, $contactName, $_SESSION['userId']);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"id" : "' . $row["ID"] .  '", "firstName" : "' . $row["FirstName"] . '", "lastName" : "' . $row["LastName"] . '", "email" : "' . $row["Email"] . '", "phone" : "' . $row["Phone"] . '", "dateCreated" : "' . $row["DateCreated"] . '"}';
		}
		
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
