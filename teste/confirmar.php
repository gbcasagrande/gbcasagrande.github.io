<?php
session_start();
require 'conexao.php';

if (!isset($_SESSION['email']) || !isset($_GET['pack'])) {
    header("Location: index.php");
    exit;
}

$email = $_SESSION['email'];
$pack  = $_GET['pack'];

// Marca como pago (na prática, deveria ser automático via API Pix)
$stmt = $conn->prepare("
    UPDATE compras 
    SET pago=1 
    WHERE pack=? 
    AND usuario_id=(SELECT id FROM usuarios WHERE email=?)
");
$stmt->bind_param("ss", $pack, $email);
$stmt->execute();

echo "Pagamento confirmado! Agora você já pode baixar seu pack.";
echo "<br><a href='dashboard.php'>Voltar</a>";
