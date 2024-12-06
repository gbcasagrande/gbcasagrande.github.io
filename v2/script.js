function downloadTweetAsImage() {
    const tweetElement = document.getElementById("tweet");

    // Temporariamente remover bordas arredondadas antes da captura da imagem
    tweetElement.style.borderRadius = "0";
    const avatarImage = document.getElementById('avatarImage');
    avatarImage.style.borderRadius = "0";

    html2canvas(tweetElement).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "tweet.png";
        link.click();

        // Restaurando as bordas após o download
        tweetElement.style.borderRadius = "16px";
        avatarImage.style.borderRadius = "50%"; // Restaura a imagem de perfil para borda arredondada
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
    const errorMessage = document.getElementById('errorMessage');

    const lineCount = tweetMessage.split('\n').length;

    if (lineCount > 10) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    document.getElementById('nameDisplay').textContent = nameInput;
    document.getElementById('usernameDisplay').textContent = '@' + usernameInput;
    
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameInput) {
        usernameDisplay.style.display = 'inline';
    } else {
        usernameDisplay.style.display = 'none';
    }

    const formattedMessage = tweetMessage.replace(/\n/g, '<br>');
    document.getElementById('tweetContent').innerHTML = formattedMessage;

    const verifiedBadge = document.getElementById('verifiedBadge');
    verifiedBadge.style.display = isVerified ? 'inline' : 'none';
}

function clearMessage() {
    document.getElementById('tweetMessage').value = '';
    updateTweet();
}
