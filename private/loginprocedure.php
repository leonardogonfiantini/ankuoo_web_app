<?php

    $nome = htmlspecialchars($nome);
    $pass = htmlspecialchars($pass);

    $nome = filter_var($_POST['nome'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_SANITIZE_URL);
    $pass = filter_var($_POST['pass'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_SANITIZE_URL);

    if ($nome == "utente" && $pass == "password") {
        session_start();
        $_SESSION['authorized'] = 1;
        header("location: home.php");
    }

    echo $nome;
    echo $pass;

?>