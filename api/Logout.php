<?php

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => true, // once served over HTTPS
    'httponly' => true,
    'samesite' => 'Lax',
]);

session_start();

// unset all session variables
session_unset();

// expire the cookie by fetching current params and setting expiration to the past
$params = session_get_cookie_params();
setcookie(session_name(),'',
    [
        'expires' => time() - 3600,
        'path' => $params['path'],
        'domain' => $params['domain'],
        'secure' => $params['secure'],
        'httponly' => $params['httponly'],
        'samesite' => $params['samesite']
    ]
);

// destroy the session
session_destroy();

// return 200 OK and JSON response
http_response_code(200);
sendResultInfoAsJson(["loggedOut" => true]);

// helper function at the bottom
function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo json_encode($obj);
}