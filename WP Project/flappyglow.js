const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const startBtn = document.getElementById("startBtn");
        const difficultySelect = document.getElementById("difficulty");
        const highScoreDisplay = document.getElementById("highScore");
        
        canvas.width = 400;
        canvas.height = 500;
        
        let bird, pipes, gravity, jumpPower, speedMultiplier;
        let gameStarted = false, score = 0, highScore = localStorage.getItem("flappyHighScore") || 0;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        
        function initializeGame() {
            bird = { x: 50, y: 250, radius: 10, dy: 0, color: "cyan" };
            pipes = [];
            gravity = 0.5 * speedMultiplier;
            jumpPower = -7 * speedMultiplier;
            score = 0;
        }
        
        document.addEventListener("keydown", (e) => { if (e.key === " " && gameStarted) bird.dy = jumpPower; });
        document.addEventListener("click", () => { if (gameStarted) bird.dy = jumpPower; });

        function spawnPipe() {
            let gap = 100;
            let pipeHeight = Math.floor(Math.random() * (canvas.height - gap - 50)) + 20;
            pipes.push({ x: canvas.width, y: 0, width: 50, height: pipeHeight, passed: false });
            pipes.push({ x: canvas.width, y: pipeHeight + gap, width: 50, height: canvas.height - pipeHeight - gap, passed: false });
        }

        function moveBird() {
            bird.dy += gravity;
            bird.y += bird.dy;
            if (bird.y + bird.radius > canvas.height) gameOver();
        }

        function movePipes() {
            pipes.forEach(pipe => { pipe.x -= 3 * speedMultiplier; });
            if (pipes.length > 0 && pipes[0].x + pipes[0].width < 0) pipes.splice(0, 2);
        }

        function checkCollision() {
            pipes.forEach(pipe => {
                if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width && bird.y - bird.radius < pipe.y + pipe.height && bird.y + bird.radius > pipe.y) {
                    gameOver();
                }
                if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                    pipe.passed = true;
                    score++;
                }
            });
        }
        
        function gameOver() {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("flappyHighScore", highScore);
                highScoreDisplay.textContent = `High Score: ${highScore}`;
            }
            alert(`Game Over! Your Score: ${score}`);
            initializeGame();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = bird.color;
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            
            pipes.forEach(pipe => {
                ctx.fillStyle = "cyan";
                ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
            });
            
            ctx.fillStyle = "white";
            ctx.fillText(`Score: ${score}`, 20, 30);
        }
        
        function update() {
            moveBird();
            movePipes();
            checkCollision();
            draw();
            if (gameStarted) requestAnimationFrame(update);
        }

        startBtn.addEventListener("click", () => {
            speedMultiplier = difficultySelect.value === "easy" ? 1 : difficultySelect.value === "medium" ? 1.5 : 2;
            initializeGame();
            gameStarted = true;
            startBtn.style.display = "none";
            difficultySelect.style.display = "none";
            canvas.style.display = "block";
            setInterval(spawnPipe, 2000);
            update();
        });