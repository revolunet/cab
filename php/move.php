<?php
require('lib.php');

$lat = $_GET["latitude"];
$lng =  $_GET["longitude"];
  
$sql= "UPDATE users set latitude=".$lat.", longitude=".$lng." WHERE uid='".$uid."';";
 
$res = mysql_query($sql);

$json = array(
	'success'=>true
);

jsonOutput($json);

?>
