<?php
// Connect to database
try{

  $config = parse_ini_file('config.cfg');

  $host = $config['hostname'];
  $dbname = $config['Database'];
  $user = $config['username'];
  $password = $config['password'];

  $dsn = "mysql:host=$host;dbname=$dbname";

  // Rest of your code
} catch (Exception $e) {
  // Handle the exception
  echo 'Error: ' . $e->getMessage();
}

$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
];

try {
  $pdo = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
  throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $discord_username = $_POST['discord-username'];
  $metamask_address = $_POST['metamask-address'];
	
  // Select address from database
  $selectstmt = $pdo->prepare("SELECT address, points FROM referral_eth WHERE address = :metamask_address");
  $selectstmt->execute(['metamask_address' => $metamask_address]);
  $result = $selectstmt->fetchAll(PDO::FETCH_ASSOC);
  //var_dump($result[0]["address"]);
  
  if ($result[0]["address"] === NULL) {
	  // Insert data into database
  	  $stmt = $pdo->prepare("INSERT INTO referral_eth (discord_usn, address) VALUES (:discord_username, :metamask_address)");
  	  $stmt->execute(['discord_username' => $discord_username, 'metamask_address' => $metamask_address]);
	  echo "You have successfuly registered!";
  echo "<div id='affiliateLink1'>Your affiliate link: <span>https://pro.metadudes.org/?ref=".$metamask_address."</span> <button class='copyButton' data-clipboard-target='#affiliateLink1 span'>Copy</button></div>";
} else {
  echo "Address already exists! You have ". $result[0]["points"] ." USDT!";
}
	
  // Redirect to thank you page
  //header("Location: thank-you.html");
  //exit();
}



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recaptcha_secret = $config['seckey'];
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Make and decode POST request:
    $recaptcha = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    // Check if the reCAPTCHA was successful
    if ($recaptcha->success == true) {
        // reCAPTCHA validated, continue with processing the form data
    } else {
        // reCAPTCHA validation failed, show an error message or something
    }
}


?>
