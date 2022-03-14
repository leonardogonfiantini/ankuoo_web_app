<?php
    require("../db/db.php");
    $table = "time";

    $time = $_GET['time'];
    $day = $_GET['day'];

    $result = $mysqli->prepare("SELECT $day FROM $table WHERE tim LIKE ?");
    $result->bind_param('i', $time);
    $result->execute();
    $result->store_result();
    $result->bind_result($state); 

    $result->fetch();

   if ($state == 1) {
        $result = $mysqli->prepare("UPDATE $table SET $day = 0 WHERE tim = ?"); 
        $result->bind_param('i', $time);
        $result->execute();
    } else {
        $result = $mysqli->prepare("UPDATE $table SET $day = 1 WHERE tim = ?"); 
        $result->bind_param('i', $time);
        $result->execute();
    } 
?>