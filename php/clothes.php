<?php
require('lib.php');


$json = array();

$sql = mysql_query("SELECT * from clothes order by name ASC");

while ($row = mysql_fetch_assoc($sql)) {
	$name = array(
		'id'=> $row['id'],
		'name'=> $row['name']
	);
	$json[] = $name;
}

echo "var clothes =";
jsonOutput($json);

?>
