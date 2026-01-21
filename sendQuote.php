<?php
// Enable error reporting (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

// Check POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect and sanitize data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Service Inquiry';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Required field check
    if (empty($name) || empty($email) || empty($message)) {
        $response['success'] = false;
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }

    // Email receiver
    $to = "info@vaidarchitects.com";
    $email_subject = "New Quote Request - VAID Architects";

    // Construct Email Body
    $email_body = "
    <html>
    <head>
        <title>New Quote Request</title>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .box { background: #fafafa; padding: 20px; border-radius: 8px; }
            .label { font-weight: bold; margin-top: 10px; }
            .value { background: #fff; padding: 10px; border-radius: 5px; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class='box'>
            <h2>New Quote Request</h2>

            <div class='label'>Name:</div>
            <div class='value'>" . htmlspecialchars($name) . "</div>

            <div class='label'>Email:</div>
            <div class='value'>" . htmlspecialchars($email) . "</div>

            <div class='label'>Phone:</div>
            <div class='value'>" . htmlspecialchars($phone) . "</div>

            <div class='label'>Selected Service:</div>
            <div class='value'>" . htmlspecialchars($subject) . "</div>

            <div class='label'>Requirement:</div>
            <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>

            <div class='label'>Submitted On:</div>
            <div class='value'>" . date('Y-m-d H:i:s') . "</div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=UTF-8";
    $headers[] = "From: VAID Architects Website <noreply@vaidarchitects.com>";
    $headers[] = "Reply-To: " . $email;
    $headers[] = "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $email_subject, $email_body, implode("\r\n", $headers))) {
        $response['success'] = true;
        $response['message'] = 'Your quote request has been submitted successfully!';
    } else {
        $response['success'] = false;
        $response['message'] = 'Error sending the quote request. Please try again.';
    }

} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

// Return JSON response
echo json_encode($response);
?>
