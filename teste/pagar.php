<?php
session_start();
require 'conexao.php';

if (!isset($_SESSION['email']) || !isset($_GET['pack'])) {
    header("Location: index.php");
    exit;
}

$email = $_SESSION['email'];
$pack  = $_GET['pack'];

// Confere usuário
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();
$usuario_id = $user['id'];

// Cria pedido (pago=0)
$stmt = $conn->prepare("INSERT INTO compras (usuario_id, pack, pago) VALUES (?, ?, 0)");
$stmt->bind_param("is", $usuario_id, $pack);
$stmt->execute();

// Aqui entraria integração com API de Pix
$chave_pix = "seu-email@pix.com.br";
$valor = "5.00";
$mensagem = "Pagamento pack $pack";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Pagamento Pix</title></head>
<body>
  <h2>Pagamento Pix - <?php echo ucfirst($pack); ?></h2>
  <p>Valor: R$5,00</p>
  <p>Chave Pix: <strong><?php echo $chave_pix; ?></strong></p>
  <p>Mensagem: <?php echo $mensagem; ?></p>
  <p>Após pagar, clique em confirmar.</p>
  <a href="confirmar.php?pack=<?php echo $pack; ?>">Já paguei</a>
</body>
</html>
