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
  $metamask_address = $_POST['metamask-address1'];
	
  // Select address from database
  $selectstmt = $pdo->prepare("SELECT address, points FROM referral_eth WHERE address = :metamask_address");
  $selectstmt->execute(['metamask_address' => $metamask_address]);
  $result = $selectstmt->fetchAll(PDO::FETCH_ASSOC);
  //var_dump($result[0]["address"]);
  
  if ($result[0]["address"] === NULL) {
	echo "You are not registered in the METADUDES Affiliate program!";
} else {
  echo "You have ". $result[0]["points"] ." USDT!";
  echo "<div id='affiliateLink2'>Your affiliate link: <span>https://pro.metadudes.org/?ref=".$metamask_address."</span> <button class='copyButton' data-clipboard-target='#affiliateLink2 span'>Copy</button></div>";
}
	
  // Redirect to thank you page
  //header("Location: thank-you.html");
  //exit();
}
?>
