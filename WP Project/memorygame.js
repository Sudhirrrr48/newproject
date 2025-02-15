let icons = ["🔥", "🎮", "🚀", "💎", "🎲", "⚡", "🎯", "🕹️"];
        let cards = [...icons, ...icons];
        let flippedCards = [];
        let matchedCards = 0;
        let score = 0;
        let timeLeft = 60; // Set time limit
        let timerInterval;

        function startGame() {
            document.getElementById("intro").style.display = "none";
            document.getElementById("game-container").style.display = "block";
            shuffleCards();
            createBoard();
            startTimer();
        }

        function shuffleCards() {
            for (let i = cards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }

        function createBoard() {
            let grid = document.getElementById("grid");
            grid.innerHTML = "";
            cards.forEach((icon, index) => {
                let card = document.createElement("div");
                card.classList.add("card");
                card.setAttribute("data-index", index);
                card.onclick = () => flipCard(card, icon);
                grid.appendChild(card);
            });
        }

        function flipCard(card, icon) {
            if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
                card.classList.add("flipped");
                card.innerText = icon;
                flippedCards.push({ card, icon });

                if (flippedCards.length === 2) {
                    checkMatch();
                }
            }
        }

        function checkMatch() {
            let [card1, card2] = flippedCards;
            if (card1.icon === card2.icon) {
                score += 10;
                matchedCards += 2;
                flippedCards = [];
                checkWin();
            } else {
                setTimeout(() => {
                    card1.card.classList.remove("flipped");
                    card2.card.classList.remove("flipped");
                    card1.card.innerText = "";
                    card2.card.innerText = "";
                    flippedCards = [];
                }, 800);
            }
            document.getElementById("score").innerText = score;
        }

        function checkWin() {
            if (matchedCards === cards.length) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    alert(`You Win! 🎉 Score: ${score} | Time Left: ${timeLeft}s`);
                    resetGame();
                }, 500);
            }
        }

        function startTimer() {
            timeLeft = 60;
            document.getElementById("time-left").innerText = timeLeft;
            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById("time-left").innerText = timeLeft;
                if (timeLeft === 0) {
                    clearInterval(timerInterval);
                    alert("Time's up! Game Over! 😢");
                    resetGame();
                }
            }, 1000);
        }

        function resetGame() {
            document.getElementById("intro").style.display = "flex";
            document.getElementById("game-container").style.display = "none";
            score = 0;
            matchedCards = 0;
            document.getElementById("score").innerText = score;
            clearInterval(timerInterval);
        }