<?php
session_start();
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Se não existe, cria
    if ($result->num_rows == 0) {
        $stmt = $conn->prepare("INSERT INTO usuarios (email) VALUES (?)");
        $stmt->bind_param("s", $email);
        $stmt->execute();
    }

    $_SESSION['email'] = $email;
    header("Location: dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Login - Packs de Músicas</title>
</head>
<body>
  <h2>Digite seu e-mail para acessar</h2>
  <form method="POST">
    <input type="email" name="email" required>
    <button type="submit">Entrar</button>
  </form>
</body>
</html>
