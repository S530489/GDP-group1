<?php
if($_SERVER['REQUEST_METHOD']=='POST)
	{
	$i=0;
	while($i<count($_FILES['upfile']['name'])){
	move_uploaded_file($_FILES['upfile']['tmp_name'][$i],$_FILES['upfile']['name'][$i]);
		$i++;
		}
	}
?>