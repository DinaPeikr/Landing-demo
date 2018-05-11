<?php
	//declare our assets 
	$name = stripcslashes($_POST['name']);
	$emailAddr = stripcslashes($_POST['email']);
	$subject = stripcslashes($_POST['subject']);
        $page = stripcslashes($_POST['page']);
        $headers = "From: \"$name\" <$emailAddr>\r\n";
	$headers .= "Content-type: text/plain; charset=UTF-8\r\n";
	$contactMessage =  
"Sender name: $name <$emailAddr>   
Email sent from: $page
Sender IP: $_SERVER[REMOTE_ADDR]";
		
		//send the email
		mail('divo1peikr@gmail.com', $subject, $contactMessage, $headers);
		echo('success'); //return success callback
?>