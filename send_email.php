<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Response array
$response = array();

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        $response['success'] = false;
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }
    
    // Email configuration
    $to = "info@vaidarchitects.com";
    $email_subject = "New Contact Form Submission - VAID Architects";
    
    // Create email body
    $email_body = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2 style='color: #333; margin: 0;'>New Contact Form Submission</h2>
                <p style='margin: 10px 0 0 0; color: #666;'>From VAID Architects Website</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Phone:</div>
                    <div class='value'>" . (!empty($phone) ? htmlspecialchars($phone) : 'Not provided') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Subject:</div>
                    <div class='value'>" . (!empty($subject) ? htmlspecialchars($subject) : 'General Inquiry') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Submitted on:</div>
                    <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
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
        $response['message'] = 'Thank you for your message! We have received your inquiry and will get back to you within 24 hours.';
    } else {
        $response['success'] = false;
        $response['message'] = 'Sorry, there was an error sending your message. Please try again or contact us directly at info@vaidarchitects.com';
    }
    
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

// Return JSON response
echo json_encode($response);
?>