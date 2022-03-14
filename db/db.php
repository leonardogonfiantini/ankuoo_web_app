<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); //error reporting for mysql server
  $mysqli = mysqli_connect('localhost', 'root', '1234', 'dbtime');
?>