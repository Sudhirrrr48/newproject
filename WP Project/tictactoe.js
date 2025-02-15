 let board = ["", "", "", "", "", "", "", "", ""];
    let player = "X";
    let bot = "O";
    let currentPlayer = Math.random() < 0.5 ? bot : player;
    let gameActive = true;
    let playerScore = 0;
    let botScore = 0;
    let difficulty = "medium"; // Default difficulty

    function setDifficulty(level) {
        difficulty = level;
        resetGame();
    }

    function createBoard() {
        let boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        board.forEach((cell, index) => {
            let cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.setAttribute("data-index", index);
            cellElement.innerText = cell;
            cellElement.onclick = () => handleMove(index);
            boardElement.appendChild(cellElement);
        });

        if (currentPlayer === bot && gameActive) {
            setTimeout(botMove, 500);
        }
    }

    function handleMove(index) {
        if (!gameActive || board[index] !== "" || currentPlayer !== player) return;

        board[index] = player;
        currentPlayer = bot;
        createBoard();
        checkWinner();

        if (gameActive) {
            setTimeout(botMove, 500);
        }
    }

    function botMove() {
        if (!gameActive || currentPlayer !== bot) return;

        let move;
        if (difficulty === "easy") {
            move = getRandomMove();
        } else if (difficulty === "medium") {
            move = getBestMove();
        } else {
            move = getOptimalMove(); // Hard mode (Minimax)
        }

        if (move !== -1) {
            board[move] = bot;
            currentPlayer = player;
            createBoard();
            checkWinner();
        }
    }

    function getRandomMove() {
        let available = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
        return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : -1;
    }

    function getBestMove() {
        // Medium mode: 50% smart, 50% random
        return Math.random() < 0.5 ? getOptimalMove() : getRandomMove();
    }

    function getOptimalMove() {
        let bestScore = -Infinity;
        let move = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = bot;
                let score = minimax(board, 0, false);
                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(newBoard, depth, isMaximizing) {
        let result = checkWinForAI();
        if (result !== null) return result;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === "") {
                    newBoard[i] = bot;
                    let score = minimax(newBoard, depth + 1, false);
                    newBoard[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === "") {
                    newBoard[i] = player;
                    let score = minimax(newBoard, depth + 1, true);
                    newBoard[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinForAI() {
        let winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] === bot && board[b] === bot && board[c] === bot) return 10;
            if (board[a] === player && board[b] === player && board[c] === player) return -10;
        }

        if (!board.includes("")) return 0;
        return null;
    }

    function checkWinner() {
        let winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                let winner = board[a] === player ? "You Win! 🎉" : "Bot Wins! 🤖";
                if (board[a] === player) {
                    playerScore++;
                } else {
                    botScore++;
                }
                updateScore();
                showWinnerMessage(winner);
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            showWinnerMessage("It's a Draw! 🤝");
        }
    }

    function showWinnerMessage(message) {
        let msgElement = document.createElement("div");
        msgElement.classList.add("winner-message");
        msgElement.innerText = message;
        document.body.appendChild(msgElement);

        setTimeout(() => {
            msgElement.remove();
            resetGame();
        }, 2000);
    }

    function updateScore() {
        document.getElementById("player-score").innerText = playerScore;
        document.getElementById("bot-score").innerText = botScore;
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = Math.random() < 0.5 ? bot : player;
        createBoard();
    }

    createBoard();