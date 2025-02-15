let randomNumber, maxRange, attempts, maxAttempts;

        function startGame() {
            let difficulty = document.getElementById("difficulty").value;
            maxRange = difficulty === "easy" ? 10 : difficulty === "medium" ? 50 : 100;
            maxAttempts = difficulty === "easy" ? 5 : difficulty === "medium" ? 8 : 14;
            randomNumber = Math.floor(Math.random() * maxRange) + 1;
            attempts = 0;
            document.getElementById("gameArea").style.display = "block";
            document.getElementById("message").innerText = "";
            document.getElementById("startBtn").style.display = "none";
            document.getElementById("difficulty").style.display = "none";
            document.getElementById("restartBtn").style.display = "none";
            console.log("Secret Number:", randomNumber);
        }

        function checkGuess() {
            let userGuess = parseInt(document.getElementById("guess").value);
            attempts++;
            let message = document.getElementById("message");
            let restartBtn = document.getElementById("restartBtn");
            
            if (userGuess === randomNumber) {
                message.innerHTML = `🎉 <strong>Congratulations!</strong> You guessed the number in <strong>${attempts}</strong> tries!`;
                message.style.animation = "winAnimation 1s infinite alternate";
                restartBtn.style.display = "block";
            } else if (attempts >= maxAttempts) {
                message.innerHTML = `❌ <strong>Better luck next time!</strong> The correct number was <strong>${randomNumber}</strong>. Try again!`;
                message.style.animation = "loseAnimation 1s infinite alternate";
                restartBtn.style.display = "block";
            } else if (userGuess > randomNumber) {
                message.innerText = `📉 Too high! Attempts left: ${maxAttempts - attempts}`;
            } else {
                message.innerText = `📈 Too low! Attempts left: ${maxAttempts - attempts}`;
            }
        }

        function restartGame() {
            document.getElementById("gameArea").style.display = "none";
            document.getElementById("startBtn").style.display = "block";
            document.getElementById("difficulty").style.display = "block";
        }