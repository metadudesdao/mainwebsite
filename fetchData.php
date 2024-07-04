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


// Select address from database
$selectstmt = $pdo->prepare("SELECT discord_usn, num_ref FROM referral_eth WHERE num_ref is not null ORDER BY num_ref DESC LIMIT 10");
$selectstmt->execute();
$result = $selectstmt->fetchAll(PDO::FETCH_ASSOC);
//var_dump($result[0]["address"]);
  
// Output data as JSON
header('Content-Type: application/json');
echo json_encode($result);

?>
