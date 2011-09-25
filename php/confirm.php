<?php
require('lib.php');

  
$checked = ($_GET["value"]=='true');

$passengerId = $_GET["passengerId"];
$passengerId = mysql_query("SELECT users.id from users where users.uid='".$passengerId."';");
#echo "SELECT trips.id from trips,users where trips.user=users.id and users.uid='".$uid."';";
$passengerId = mysql_fetch_assoc( $passengerId );
$passengerId = $passengerId['id'];

$tripId = mysql_query("SELECT trips.id from trips,users where trips.user=users.id and users.uid='".$uid."';");
#echo "SELECT trips.id from trips,users where trips.user=users.id and users.uid='".$uid."';";
$tripId = mysql_fetch_assoc( $tripId );
$tripId = $tripId['id'];
 
 

if ($checked) {
	// le client du taxi accepte la demande de partage

	// 1) update status du trip
	$sql="UPDATE trips set status='booked', confirmsent=NOW(), passenger=".$passengerId." where user=(SELECT ID FROM users WHERE uid='".$uid."') and id=(SELECT id from trips where trips.user=users.id and users.uid='".$uid."');";
	$res = mysql_query($sql);
	#print $sql."\n";

	// 2) envoie confirmation au passager 
	$sql="UPDATE requests set confirmsent=NOW(),status=1 where trip=".$tripId." and user=" . $passengerId ." ;";
	$res = mysql_query($sql);

	// 3) cancel autres requetes du trip en cours (except passenger)
	$sql="UPDATE requests set confirmsent=NOW(),status=0 where trip=".$tripId." and user<>" . $passengerId ." ;";
	$res = mysql_query($sql);

}
else {
	//  le client du taxi refuse la demande de partage
	// 1) delete le trip
	$sql="DELETE from trips where user=(SELECT ID FROM users WHERE uid='".$uid."');";
	//$sql="UPDATE trips set statut='canceled' where user=(SELECT ID FROM users WHERE uid='".$uid."');";
	$res = mysql_query($sql);

	print "\n".$sql;

	// 2) envoie confirmation au passager 
	$sql="UPDATE requests set confirmsent=NOW(),status=0 where trip=".$tripId." and user=".$passengerId.";";
	$res = mysql_query($sql);

	print "\n".$sql;
}



$json = array(
	'success'=>true
);

jsonOutput($json);

?>
