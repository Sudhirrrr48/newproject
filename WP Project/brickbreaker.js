const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const startBtn = document.getElementById("startBtn");
        const difficultySelect = document.getElementById("difficulty");
        
        canvas.width = 800;
        canvas.height = 500;
        
        let paddle, ball, bricks, gameStarted = false;
        let rightPressed = false, leftPressed = false;
        let speedMultiplier = 1;

        function initializeGame() {
            paddle = {
                x: canvas.width / 2 - 60,
                y: canvas.height - 20,
                width: 120,
                height: 10,
                color: "cyan",
                speed: 8,
            };
            
            ball = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                radius: 8,
                color: "cyan",
                dx: 4 * speedMultiplier,
                dy: -4 * speedMultiplier,
            };
            
            bricks = [];
            let rows = 5, cols = 8;
            let brickWidth = 75, brickHeight = 20, brickPadding = 10, brickOffsetTop = 50;
            
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    bricks.push({
                        x: c * (brickWidth + brickPadding) + 35,
                        y: r * (brickHeight + brickPadding) + brickOffsetTop,
                        width: brickWidth,
                        height: brickHeight,
                        color: "cyan",
                        destroyed: false,
                    });
                }
            }
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") rightPressed = true;
            if (e.key === "ArrowLeft") leftPressed = true;
        });
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowRight") rightPressed = false;
            if (e.key === "ArrowLeft") leftPressed = false;
        });

        function movePaddle() {
            if (rightPressed && paddle.x + paddle.width < canvas.width) paddle.x += paddle.speed;
            if (leftPressed && paddle.x > 0) paddle.x -= paddle.speed;
        }

        function moveBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx *= -1;
            if (ball.y - ball.radius < 0) ball.dy *= -1;
            
            if (ball.y + ball.radius > canvas.height) {
                alert("Game Over! Restarting...");
                initializeGame();
            }
            
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + ball.radius > paddle.y) ball.dy *= -1;
            
            bricks.forEach(brick => {
                if (!brick.destroyed) {
                    if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y - ball.radius < brick.y + brick.height && ball.y + ball.radius > brick.y) {
                        ball.dy *= -1;
                        brick.destroyed = true;
                    }
                }
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = paddle.color;
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
            
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
            
            bricks.forEach(brick => {
                if (!brick.destroyed) {
                    ctx.fillStyle = brick.color;
                    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                }
            });
        }
        
        function update() {
            movePaddle();
            moveBall();
            draw();
            requestAnimationFrame(update);
        }

        startBtn.addEventListener("click", () => {
            speedMultiplier = difficultySelect.value === "easy" ? 1 : difficultySelect.value === "medium" ? 1.5 : 2;
            initializeGame();
            gameStarted = true;
            startBtn.style.display = "none";
            difficultySelect.style.display = "none";
            canvas.style.display = "block";
            update();
        });