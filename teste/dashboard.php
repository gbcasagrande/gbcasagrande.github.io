<?php
session_start();
require 'conexao.php';

if (!isset($_SESSION['email'])) {
    header("Location: index.php");
    exit;
}

$email = $_SESSION['email'];

// Pega usuário
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();
$usuario_id = $user['id'];

// Pega compras
$compras = [];
$sql = "SELECT pack, pago FROM compras WHERE usuario_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
    $compras[$row['pack']] = $row['pago'];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha Conta</title>
</head>
<body>
  <h2>Bem-vindo, <?php echo $email; ?></h2>

  <div>
    <h3>🎸 Bandinhas</h3>
    <?php if (isset($compras['bandinhas']) && $compras['bandinhas'] == 1): ?>
      <a href="downloads/bandinhas.zip">Baixar</a>
    <?php else: ?>
      <a href="pagar.php?pack=bandinhas">Comprar R$5,00</a>
    <?php endif; ?>
  </div>

  <div>
    <h3>🎶 Sertanejo</h3>
    <?php if (isset($compras['sertanejo']) && $compras['sertanejo'] == 1): ?>
      <a href="downloads/sertanejo.zip">Baixar</a>
    <?php else: ?>
      <a href="pagar.php?pack=sertanejo">Comprar R$5,00</a>
    <?php endif; ?>
  </div>

  <div>
    <h3>🔥 Funk</h3>
    <?php if (isset($compras['funk']) && $compras['funk'] == 1): ?>
      <a href="downloads/funk.zip">Baixar</a>
    <?php else: ?>
      <a href="pagar.php?pack=funk">Comprar R$5,00</a>
    <?php endif; ?>
  </div>

  <div>
    <h3>💥 Pancadão</h3>
    <?php if (isset($compras['pancadao']) && $compras['pancadao'] == 1): ?>
      <a href="downloads/pancadao.zip">Baixar</a>
    <?php else: ?>
      <a href="pagar.php?pack=pancadao">Comprar R$5,00</a>
    <?php endif; ?>
  </div>
</body>
</html>
