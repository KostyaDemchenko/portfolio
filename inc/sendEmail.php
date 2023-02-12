<?php

// Replace this with your own email address
$siteOwnersEmail = 'kostiantyn.demchenko@nure.ua';

if ($_POST) {

  // Validate the form data
  $errors = [];
  $name = trim($_POST['contactName'] ?? '');
  $email = trim($_POST['contactEmail'] ?? '');
  $subject = trim($_POST['contactSubject'] ?? '');
  $contact_message = trim($_POST['contactMessage'] ?? '');

  // Check Name
  if (strlen($name) < 2) {
    $errors['name'] = "Please enter your name.";
  }

  // Check Email
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Please enter a valid email address.";
  }

  // Check Message
  if (strlen($contact_message) < 15) {
    $errors['message'] = "Please enter your message. It should have at least 15 characters.";
  }

  // Set subject
  if (empty($subject)) {
    $subject = "Contact Form Submission";
  }

  // Set message
  $message = "Email from: $name <br />";
  $message .= "Email address: $email <br />";
  $message .= "Message: <br />";
  $message .= $contact_message;
  $message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";

  // Set From header
  $from = "$name <$email>";

  // Email headers
  $headers = "From: $from\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  // If there are no errors, send the email
  if (empty($errors)) {
    if (mail($siteOwnersEmail, $subject, $message, $headers)) {
      echo "OK";
    } else {
      echo "Something went wrong. Please try again.";
    }
  } else {
    echo implode("<br />\n", $errors);
  }
}
