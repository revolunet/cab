<?php

require('config.php');


$uid = null;
$user_id = null;

if (isset($_GET["userId"])) $uid = $_GET["userId"];


$con = mysql_connect($DB_host,$DB_user,$DB_password);
mysql_query("SET NAMES utf8;");
mysql_select_db($DB_name);

function getUserId( $uid ) {
	$res = mysql_fetch_assoc(mysql_query("SELECT users.id from users where users.uid='".$uid."';"));
	return $res['id'];
}

function jsonOutput( $json ) {
	header('Content-type: application/json');
	if (isset($_GET['callback'])) echo $_GET['callback'].'(';
	echo json_encode( $json );
	if (isset($_GET['callback'])) echo ')';
}

if ($uid!='') {
	//die("Aucun user ?");
	$user_id = getUserId($uid);
}

?>