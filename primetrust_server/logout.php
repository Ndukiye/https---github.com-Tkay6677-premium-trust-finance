<?php
setcookie("isLoggedIn", "", time() - 3600, "/");
header("Location: ../html/dashboard/auth/sign-in.html");