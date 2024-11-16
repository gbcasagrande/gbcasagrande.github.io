function updateTweet() {
    const name = document.getElementById('nameInput').value;
    const username = document.getElementById('usernameInput').value;
    const message = document.getElementById('tweetMessage').value;

    const nameDisplay = document.getElementById('nameDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const tweetContent = document.getElementById('tweetContent');
    const verifiedBadge = document.getElementById('verifiedBadge');

    // Atualizar nome e nome de usuário
    nameDisplay.textContent = name || "Seu Nome";
    usernameDisplay.textContent = username ? `@${username}` : "@usuario";

    // Atualizar conteúdo do tweet
    tweetContent.textContent = message || "A sua frase irá aparecer aqui 🎉";

    // Lidar com o selo de verificação
    const verifiedOption = document.querySelector('input[name="verifiedType"]:checked').value;
    if (verifiedOption === "none") {
        // Ocultar selo se "Sem Selo" for selecionado
        verifiedBadge.style.display = "none";
    } else {
        // Exibir selo e atualizar sua imagem
        verifiedBadge.style.display = "inline";
        verifiedBadge.src = verifiedOption;
    }

    // Validar se a mensagem não excede 10 linhas
    const lines = message.split('\n').length;
    const errorMessage = document.getElementById('errorMessage');
    if (lines > 10) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
}

// Função para limpar a mensagem
function clearMessage() {
    document.getElementById('nameInput').value = '';
    document.getElementById('usernameInput').value = '';
    document.getElementById('tweetMessage').value = '';
    updateTweet();
}

// Função para fazer o download da postagem como imagem
function downloadTweetAsImage() {
    html2canvas(document.querySelector("#tweet")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tweet.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Função para carregar a imagem de perfil (caso o usuário faça upload)
function loadAvatar(event) {
    const avatarImage = document.getElementById('avatarImage');
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        avatarImage.src = e.target.result;
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Inicialização da função updateTweet na carga da página
window.onload = function() {
    updateTweet();
};
