<?php
require('lib.php');

  
$checked = (isset($_GET["value"]) && $_GET["value"]=='true');

$passengerId = getUserId($_GET["passengerId"]);
 
$tripId = mysql_query("SELECT trips.id from trips,users where trips.user=users.id and users.uid='".$uid."';");
#echo "SELECT trips.id from trips,users where trips.user=users.id and users.uid='".$uid."';";
$tripId = mysql_fetch_assoc( $tripId );
$tripId = $tripId['id'];
 
 

if ($checked) {
	// le client du taxi accepte la demande de partage

	// 1) update status du trip
 
	$sql="UPDATE trips set status='booked', passenger=".$passengerId." where user=".$user_id.";";
	$res = mysql_query($sql);
	#print $sql."\n";

	// delete trips di passenger if any
	$sql="DELETE FROM trips where user=".$passengerId." ;";
	$res = mysql_query($sql);
	#print $sql."\n";

	// 2) envoie confirmation au passager 
	$sql="UPDATE requests set confirmsent=NOW(),status=1 where trip=".$tripId." and user=" . $passengerId ." ;";
	$res = mysql_query($sql);

	// 3) cancel autres requetes du trip en cours (except passenger)
	$sql="UPDATE requests set confirmsent=NOW(),status=0 where trip=".$tripId." and user<>" . $passengerId ." ;";
	$res = mysql_query($sql);

	// 4) delete le taxi en cours


}
else {
	//  le client du taxi refuse la demande de partage
	// 1) delete le trip
	//$sql="DELETE from trips where user=".$user_id.";";
	//$sql="UPDATE trips set statut='canceled' where user=(SELECT ID FROM users WHERE uid='".$uid."');";
	$sql = "UPDATE from trips set status='canceled' where id=".$tripId."; ";
	$res = mysql_query($sql);

	//$sql="DELETE from trips where user=".$passengerId.";";
	//$sql="UPDATE trips set statut='canceled' where user=(SELECT ID FROM users WHERE uid='".$uid."');";
	//$res = mysql_query($sql);

	#print "\n".$sql;

	// 2) envoie confirmation au passager 
	$sql="UPDATE requests set confirmsent=NOW(),status=0 where trip=".$tripId." and user=".$passengerId.";";
	$res = mysql_query($sql);

	#print "\n".$sql;
}



$json = array(
	'success'=>true
);

jsonOutput($json);

?>
