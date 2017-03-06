<?php
    if (isset($_POST["submit"])) {
        $name = isset($_POST['field-name']) ? $_POST['field-name'] : '';
        $email = isset($_POST['field-email']) ? $_POST['field-email'] : '';
        $subject = isset($_POST['field-subject']) ? $_POST['field-subject'] : '';
        $message = isset($_POST['field-message']) ? $_POST['field-message'] : '';
        $from = 'Coder Contact Form'; 
        $to = 'mauricet1520@gmail.com'; // Change this email with yours
        
        $body = "From: $name\nE-Mail: $email\nMessage:\n $message";
        
        // Field values are validated with jQuery 
        // If there are no errors, send the email
        if (mail($to, $subject, $body, $from)) {
            $result='<div class="alert alert-success">Thank You! We will get to you as soon as possible.</div>';
        } else {
            $result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
        }

        echo json_encode($result);
        exit;
    }
?>