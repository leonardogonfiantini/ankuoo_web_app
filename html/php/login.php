<!DOCTYPE html>
<html>

    <head> <title> login </title> </head>



    <body>

    <!DOCTYPE html>
<html lang="en">

<link rel="stylesheet" type="text/css" href="../css/loginreg-style.css">

<head>
    <title>Log-in</title>
</head>

<body>
    <?php
        if(isset($_POST['submit'])) {
            include('../../private/loginprocedure.php');
        }
    ?> 

    <form id="formlogin" method="post">
        <input type="text" name="nome" id="nome" maxlength="50" placeholder="nome utente" required />
        <input type="password" name="pass" id="pass" maxlength="50" placeholder="password" required />
        <button name="submit" id="submit" type="submit"> Submit </button>
    </form>
</body>
</html>


