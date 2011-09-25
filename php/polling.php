<?php
require('lib.php');

$tripId = $_GET["tripId	"];
$passengerId = $_GET["passengerId"];
$checked = ($_GET["value"]=='true');
  
$json = array(
	'success'=>true,
	'rides'=>array()
);

// requetes en attente ? 
$sql2 = " SELECT requests.id as reqid, trips.id as tripid, 	
		(select users.uid from users where id=requests.user) as userId, requests.timesent 
		from requests,users,trips where requests.trip=trips.id and users.id=trips.user 
		and ISNULL(timesent) and ISNULL(confirmsent) and users.uid='" . $uid . "' 
		and requests.user not IN (select ID from users where uid='" . $uid . "') 
		order by requests.id limit 0,1 ";
 
$requests = mysql_query($sql2);
if ($requests) {
	while ($row = mysql_fetch_assoc($requests)) {
		$json['request'] = array(
			'tripId'=>$row['tripid'],
			'userId'=>$row['userId'],
			'time'=>$row['time'],
			'description'=>$row['description'],
			'date'=>$row['timesent']
		);
		// delete it
		//mysql_query("DELETE FROM requests where id=" . $row['reqid']." and confirmsent>0;");
		mysql_query("UPDATE requests set timesent=NOW() where id=" . $row['reqid'].";");
	}
}
// confirmations en attente ?
$sql2 = " SELECT requests.id as reqid, (select users.uid from users where id=trips.user) as userId, requests.timesent, requests.status from requests,users,trips where requests.trip=trips.id and confirmsent>0 and requests.user = (select id from users where uid='" . $uid . "') order by requests.id limit 0,1 "; 	
 
$requests = mysql_query($sql2);
if ($requests) {
	while ($row = mysql_fetch_assoc($requests)) {
		$json['response'] = array(
			'userId'=>$row['userId'],
			'date'=>$row['timesent'],
			'success'=>$row['status']
		);
		// delete it
		mysql_query("DELETE FROM requests where id=" . $row['reqid']." ;");
	}
}


// rides

// get user info
$sql = "SELECT * from trips,users where  users.id=trips.user and users.id=(SELECT ID from users where uid='".$uid. "') order by trips.id desc limit 0,1 ";
 

$user_trip = mysql_fetch_assoc(mysql_query( $sql ));
 

$sql = "SELECT trips.id,`from`,`to`,date_format(start, '%H:%i') as start,users.uid as userId from trips,users WHERE users.id=trips.user and start >= NOW() ";
// from and to same place

$sql .= " and `from`=".$user_trip['from']." ";
$sql .= " and `to`=".$user_trip['to']." ";
// status
$sql .= " and status in ('FREE', 'PENDING') ";
// exclude myself
$sql .= " and user<>".$user_id." ";

$sql .= " group by user order by start, id ";

 
 
$trips = mysql_query($sql);

if ($trips) { 
	 
	while ($row = mysql_fetch_assoc($trips)) {
		 
		$start=mysql_fetch_assoc(mysql_query("SELECT * from locations where id=".$row['from'].";"));
		$end=mysql_fetch_assoc(mysql_query("SELECT * from locations where id=".$row['to'].";"));
		$selected=mysql_fetch_assoc(mysql_query("SELECT count(requests.ID) as count from requests,users WHERE users.id=requests.user and trip=".$row['id']." and users.uid='".$uid."';"));
	 
		$selected = ($selected["count"] == 1);
	    $ride = array(
	    	'tripId' => $row['id'],
	    	'userId' => $row['userId'],
	    	'selected' => $selected,
	    	'start' => $start['label'],
	    	'end' => $end['label'],
	    	'time' => $row['start']
		);
	 
		$json['rides'][] = $ride;
	}
}

// passenger/rider position
// find partner

jsonOutput($json);

?>
