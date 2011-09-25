<?php
require('lib.php');

$tripId = $_GET["tripId"];
$checked = ($_GET["value"]=='true');
 
if ($checked) {
	// l'utilisateur a demandé a partager un taxi existant
	$sql = "INSERT INTO requests SET TRIP=".$tripId.", USER=(SELECT ID FROM users WHERE uid='".$uid."');";
	$res = mysql_query($sql);


}
else {
	// l'utilisateur annule sa demande de partage
	$sql = "DELETE FROM requests WHERE TRIP=".$tripId." AND USER=(SELECT ID FROM users WHERE uid='".$uid."');";
	$res = mysql_query($sql);
}



$json = array(
	'success'=>true
);

jsonOutput($json);

?>
