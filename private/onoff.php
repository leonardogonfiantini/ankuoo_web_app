<?php
    require("../db/db.php");
    $table = "ONOFF";

    $onoff = $_GET['onoff'];

    $result = $mysqli->prepare("UPDATE $table SET onoff = ? WHERE id LIKE 0");
    $result->bind_param('i', $onoff);
    $result->execute();

?>