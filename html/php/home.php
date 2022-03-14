<!DOCTYPE html>
<html>

    <head> 
        <link rel="stylesheet" type="text/css" href="../css/home.css">    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <title> Scaldabagno </title>
    </head>


    <body>

        <p> Tabella scaldabagno: </p>

        <table>
            <tr> <td> </td> <td> Mon </td> <td> Tue </td> <td> Wed </td> <td> Thu </td> <td> Fri </td> <td> Sat </td> <td> Sun </td> </tr>
            <?php
                require("../../db/db.php");
                $table = "time";

                for ($i = 0; $i < 24; $i++) {
                    $time = date("h:i a",mktime($i, 0))."-".date("h:i a",mktime($i+1, 0));
                    $timetag = $i;

                    $result = $mysqli->query("SELECT * FROM $table WHERE tim LIKE $i");

                    echo "<tr id=".$timetag."> <td>".$time."</td>";
                        while($row = mysqli_fetch_array($result)) {
                            echo "<td id='mon'> <input id='btnmon' class='fullwidth' type='button' value=".$row['mon']." /> </td>";
                            echo "<td id='tue'> <input id='btntue' class='fullwidth' type='button' value=".$row['tue']." /> </td>";
                            echo "<td id='wed'> <input id='btnwed' class='fullwidth' type='button' value=".$row['wed']." /> </td>";
                            echo "<td id='thu'> <input id='btnthu' class='fullwidth' type='button' value=".$row['thu']." /> </td>";
                            echo "<td id='fri'> <input id='btnfri' class='fullwidth' type='button' value=".$row['fri']." /> </td>";
                            echo "<td id='sat'> <input id='btnsat' class='fullwidth' type='button' value=".$row['sat']." /> </td>";
                            echo "<td id='sun'> <input id='btnsun' class='fullwidth' type='button' value=".$row['sun']." /> </td>";
                        }
                    echo "</tr>";

                    $result->close();
                }
            ?>
        </table>


        <button class="ONOFF" id="ONOFF" name="ONOFF" value= <?php  $result = $mysqli->query("SELECT onoff FROM ONOFF WHERE id = 0"); 
                                                                    $row = mysqli_fetch_array($result);
                                                                    echo $row['onoff']; ?>> ON </button>

    </body>

    <script>

        var inputarray = document.getElementsByTagName("input");
        for (let i = 0; i < inputarray.length; i++) {
            
            if(inputarray[i].value == 1) {
                $(inputarray[i]).css('background-color', 'green');
                $(inputarray[i]).css('color', 'green');

            } else {
                $(inputarray[i]).css('background-color', 'white');
                $(inputarray[i]).css('color', 'white');
            }

            inputarray[i].onclick = function() {
                if (inputarray[i].value == 1) {
                    $(inputarray[i]).css('background-color', 'white');
                    $(inputarray[i]).css('color', 'white');
                    inputarray[i].value = 0;
                } else {
                    $(inputarray[i]).css('background-color', 'green');
                    $(inputarray[i]).css('color', 'green');
                    inputarray[i].value = 1;
                }
            }
        }

        var ON = document.getElementById("ONOFF");

        if (ON.value == 1) {
            $(ON).css('background-color', 'green');
        }
        else {
            $(ON).css('background-color', 'red');
        }

        ON.onclick = function() {
            if (ON.value == 1) {
                $(ON).css('background-color', 'red');
                ON.value = 0;
            }
            else {
                $(ON).css('background-color', 'green');
                ON.value = 1;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    console.log("ok");
                }
            };
            xhttp.open("GET", "../../private/onoff.php?onoff="+ON.value, true);
            xhttp.send();
        }


        var trarray = document.getElementsByTagName("tr");
        for (let i = 1; i < trarray.length; i++) {
            var tdarray = trarray[i].getElementsByTagName("td");

            for (let j = 1; j < tdarray.length; j++) {
                var input = tdarray[j].getElementsByTagName("input");

                input[0].addEventListener("click", function() {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = function() {
                        if (xhttp.status === 200) {
                            console.log("ok");
                        }
                    };
                    xhttp.open("GET", "../../private/addtime.php?time="+trarray[i].id+"&day="+tdarray[j].id, true);
                    xhttp.send();
                })
            }
        }

    </script>
</html>