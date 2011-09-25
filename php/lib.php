<?php

require('config.php');

$uid = $_GET["userId"];

if ($uid=='') {
	//die("Aucun user ?");
}

$con = mysql_connect($DB_host,$DB_user,$DB_password);
mysql_query("SET NAMES utf8;");
mysql_select_db($DB_name);

function jsonOutput( $json ) {
	header('Content-type: application/json');
	if (isset($_GET['callback'])) echo $_GET['callback'].'(';
	echo json_encode( $json );
	if (isset($_GET['callback'])) echo ')';
}

?>