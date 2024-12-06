function insertBold() {
    const textarea = document.getElementById("tweetMessage");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const beforeCursor = textarea.value.substring(0, start);
    const afterCursor = textarea.value.substring(end);

    const insertion = "**" + "**"; // Inserção padrão para negrito

    // Atualiza o valor do textarea com os ** no cursor
    textarea.value = beforeCursor + insertion + afterCursor;

    // Ajuste para posicionar o cursor no meio dos asteriscos
    const newCursorPosition = start + 2;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);

    // Atualiza a mensagem no painel de visualização
    updateTweet();
}

function downloadTweetAsImage() {
    const tweetElement = document.getElementById("tweet");

    // Removendo bordas arredondadas temporariamente
    tweetElement.style.borderRadius = "0";
    const avatarImage = document.getElementById('avatarImage');
    avatarImage.style.borderRadius = "0";

    html2canvas(tweetElement).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "tweet.png";
        link.click();

        // Restaurando bordas após a captura
        tweetElement.style.borderRadius = "16px";
        avatarImage.style.borderRadius = "50%";
    });
}

function loadAvatar(event) {
    const avatarImage = document.getElementById('avatarImage');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function updateTweet() {
    const nameInput = document.getElementById('nameInput').value;
    const usernameInput = document.getElementById('usernameInput').value;
    const tweetMessage = document.getElementById('tweetMessage').value;
    const isVerified = document.getElementById('verified').checked;

    const lineCount = tweetMessage.split('\n').length;

    const errorMessage = document.getElementById('errorMessage');
    if (lineCount > 10) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    document.getElementById('nameDisplay').textContent = nameInput;
    document.getElementById('usernameDisplay').textContent = '@' + usernameInput;

    const formattedMessage = tweetMessage.replace(/\n/g, '<br>');
    document.getElementById('tweetContent').innerHTML = formattedMessage;

    const verifiedBadge = document.getElementById('verifiedBadge');
    verifiedBadge.style.display = isVerified ? 'inline' : 'none';
}

function clearMessage() {
    document.getElementById('tweetMessage').value = '';
    updateTweet();
}
