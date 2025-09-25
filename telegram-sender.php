<?php
// Telegram Bot API - Server-side solution
// This file handles sending messages via Telegram Bot API

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Your Telegram Bot Configuration
$BOT_TOKEN = '8380849170:AAGJIxZ3a4iY9tYv9hMzkHMXDSNk-4yLEdE';
$CHAT_ID = '5971113567';

// Get the request data
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'message'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit;
    }
}

// Format the message
$message = "📧 *New Contact Form Message*\n\n";
$message .= "👤 *Name:* " . $input['firstName'] . " " . $input['lastName'] . "\n";
$message .= "📧 *Email:* " . $input['email'] . "\n";
$message .= "📞 *Phone:* " . ($input['phone'] ?? 'Not provided') . "\n\n";
$message .= "💬 *Message:*\n" . $input['message'] . "\n\n";
$message .= "🏫 *Sent from:* Bakka Secondary School Contact Page\n";
$message .= "⏰ *Time:* " . date('Y-m-d H:i:s');

// Prepare the data for Telegram API
$telegram_data = [
    'chat_id' => $CHAT_ID,
    'text' => $message,
    'parse_mode' => 'Markdown',
    'disable_web_page_preview' => true
];

// Send to Telegram
$telegram_url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegram_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($telegram_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $result = json_decode($response, true);
    if ($result['ok']) {
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully to Telegram!',
            'telegram_response' => $result
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'error' => 'Telegram API error: ' . $result['description']
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. HTTP Code: ' . $http_code
    ]);
}
?>


