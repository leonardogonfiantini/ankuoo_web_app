<?php
    require("db.php");
        $table = "time";

        if ($result = $mysqli->query("SHOW TABLES LIKE '".$table."'")) {
            if($result->num_rows == 0) {
                $mysqli->query("CREATE TABLE $table (
                                tim int(2),
                                mon int,
                                tue int,
                                wed int,
                                thu int,
                                fri int,
                                sat int,
                                sun int,
                                PRIMARY KEY  (tim) 
                                )");
            }
        }

        $i = 0;
        while ($i < 24) {
            $result = $mysqli->prepare("INSERT INTO $table (tim) VALUES (?)");
            $result->bind_param('i', $i);
            $result->execute();
            $i++;
        }

        $table = "ONOFF";

        if ($result = $mysqli->query("SHOW TABLES LIKE '".$table."'")) {
            if($result->num_rows == 0) {
                $mysqli->query("CREATE TABLE $table (
                                id int(1),
                                onoff int,
                                PRIMARY KEY (id) 
                                )");
            }
        }

        $result = $mysqli->prepare("INSERT INTO $table (id) VALUES (?)");
        $i = 0;
        $result->bind_param('i', $i);
        $result->execute();



?>