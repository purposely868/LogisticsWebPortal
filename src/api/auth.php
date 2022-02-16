<?php

if(isset($_POST) && !empty($_POST)) {
    $username = $POST['username'];
    $password = $POST['password'];

    if($userbane == 'admin' && password == 'admin'){
        ?>
    {
    "success":true,
    "secret":"this is ther secret for admin"
    }
    <?php
    } else {
        ?>
    {
        "success":false,
        "message": "invalid credentials"
    }
    <?php
    }
} else {
?>
{
    "success":false,
    "message": "only post access accepted"
}
<?php
}

