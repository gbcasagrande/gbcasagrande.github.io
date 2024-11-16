function downloadTweetAsImage() {
    updateTweet();

    const tweetElement = document.getElementById("tweet");
    html2canvas(tweetElement).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "tweet.png";
        link.click();
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
    const verifiedType = document.querySelector('input[name="verifiedType"]:checked').value;
    const errorMessage = document.getElementById('errorMessage');

    const lineCount = tweetMessage.split('\n').length;

    if (lineCount > 10) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    // Atualizar nome e usuário
    document.getElementById('nameDisplay').textContent = nameInput || "Seu Nome";
    document.getElementById('usernameDisplay').textContent = usernameInput ? `@${usernameInput}` : "";
    document.getElementById('usernameDisplay').style.display = usernameInput ? 'inline' : 'none';

    // Atualizar mensagem
    const formattedMessage = tweetMessage.replace(/\n/g, '<br>');
    document.getElementById('tweetContent').innerHTML = formattedMessage || "A sua frase irá aparecer aqui 🎉";

    // Atualizar verificado
    const verifiedBadge = document.getElementById('verifiedBadge');
    if (verifiedType === "notVerified") {
        verifiedBadge.style.display = 'none';
    } else {
        verifiedBadge.src = verifiedType;
        verifiedBadge.style.display = 'inline';
    }
}

function clearMessage() {
    document.getElementById('tweetMessage').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('usernameInput').value = '';
    document.querySelector('input[name="verifiedType"]:checked').checked = false;
    updateTweet();
            }
