<?php
require('lib.php');


$json = array();

$sql = mysql_query("SELECT * from colors order by color_name ASC");

while ($row = mysql_fetch_assoc($sql)) {
	$colors = array(
		'id'=> $row['id'],
		'name'=> $row['color_name']
	);
	$json[] = $colors;
}

header('Content-type: application/x-javascript');

echo  "var colors =";
jsonOutput($json, false);
echo ";";

?>
