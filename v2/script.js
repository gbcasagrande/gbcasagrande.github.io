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

    const formattedMessage = formatMessage(tweetMessage);
    document.getElementById('tweetContent').innerHTML = formattedMessage;

    const verifiedBadge = document.getElementById('verifiedBadge');
    verifiedBadge.style.display = isVerified ? 'inline' : 'none';
}

function clearMessage() {
    document.getElementById('tweetMessage').value = '';
    updateTweet();
}

function formatMessage(message) {
    return message
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')    // Negrito
        .replace(/_(.*?)_/g, '<u>$1</u>')               // Sublinhado
        .replace(/~(.*?)~/g, '<s>$1</s>');              // Riscado
}

function addFormatting(symbol) {
    const textarea = document.getElementById('tweetMessage');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = textarea.value.substring(start, end);
    const formattedText = symbol + selectedText + symbol;

    textarea.setRangeText(formattedText, start, end, 'end');
    textarea.focus();
    updateTweet();
}

function changeFontSize(action) {
    const tweetContent = document.getElementById('tweetContent');
    const currentSize = parseFloat(window.getComputedStyle(tweetContent).fontSize);

    if (action === 'increase') {
        tweetContent.style.fontSize = (currentSize + 2) + 'px';
    } else if (action === 'decrease' && currentSize > 10) {
        tweetContent.style.fontSize = (currentSize - 2) + 'px';
    }
    }
