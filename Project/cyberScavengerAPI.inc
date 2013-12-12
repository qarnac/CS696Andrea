<?php

define('DB_USER','cyberread'); 
define('DB_PASSWORD','Carefusion101@'); 
define('DB_HOST','68.178.216.51'); 
define('DB_NAME','cyberscavenger'); 

$dbc = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) OR die('Cound not connect to MySQL: '.mysql_error());
@mysql_select_db(DB_NAME) OR die('Could not select database: '.mysql_error());

?>
