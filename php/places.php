<?php
require('lib.php');
 
  
$json = array();

$sql = mysql_query("SELECT * from locations order by label");

while ($row = mysql_fetch_assoc($sql)) {
    $loc = array(
    	'id'=> $row['id'],
    	'name'=> $row['label'],
    	'lat'=>$row['latitude'],
    	'lng'=>$row['longitude']
	);
	$json[] = $loc;
}
 

jsonOutput($json);

?>
