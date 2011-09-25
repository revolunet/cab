<?php
require('lib.php');


$json = array();

$sql = mysql_query("SELECT * from colors order by color_name ASC");

while ($row = mysql_fetch_assoc($sql)) {
	$colors = array(
		'id'=> $row['id'],
		'name'=> $row['colors_name']
	);
	$json[] = $colors;
}


jsonOutput($json);

?>
