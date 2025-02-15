 // Simulate loading screen
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
            document.querySelector(".content").style.display = "block";
        }, 3000); // 3 seconds loading time

        // Function to start the game
        function startGame() {
            window.location.href = "tic-tac-toe-game.html";
        }