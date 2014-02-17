<?php
$dirname = "../images/";
$images = glob($dirname."*.jpg");

echo '<root>';
foreach($images as $image) {
	echo "$image";
}
echo '</root>';
?>