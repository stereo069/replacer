<?php
$sourceStr = ltrim($_GET["text"]);
$parseStr = shell_exec("linencode.exe "."\"".$sourceStr."\"");
echo $parseStr;
?>
