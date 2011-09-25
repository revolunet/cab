<?php
require('lib.php');

$departure = $_GET["departure"];
$arrival = $_GET["arrival"];
$time = $_GET["time"];
$description = $_GET["description"];
$start = $_GET["time"];
$start = str_replace('/', '-', $start);


$sql = "SELECT id from users where uid='".$uid."';"; 
$has_user = mysql_fetch_assoc(mysql_query($sql));
$user_id = 0;
if (!$has_user) {
	mysql_query("INSERT INTO users SET uid='".$uid."', name='".$uid."';");
	$user_id = mysql_insert_id();
}
else {
	$user_id = $has_user['id'];
}

// first delete all current user trips
$sql = "DELETE FROM trips where user=".$user_id.";";
$res = mysql_query($sql);
$sql = "DELETE FROM requests where user=".$user_id.";";
$res = mysql_query($sql);


$sql = "INSERT INTO trips SET `from`=".$departure.", `to`=".$arrival.",start='".$start."',user=".$user_id.";";
$res = mysql_query($sql);

$json = array(
	'success'=>true
);

jsonOutput($json);

?>
