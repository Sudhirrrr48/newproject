let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");
        let box = 20;
        let snake = [{ x: 10 * box, y: 10 * box }];
        let direction = "RIGHT";
        let food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        let score = 0;
        let game;

        function startGame() {
            document.querySelector("button").style.display = "none";
            canvas.style.display = "block";
            game = setInterval(draw, 100);
        }

        function draw() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? "lime" : "green";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (direction === "LEFT") snakeX -= box;
            if (direction === "UP") snakeY -= box;
            if (direction === "RIGHT") snakeX += box;
            if (direction === "DOWN") snakeY += box;

            if (snakeX === food.x && snakeY === food.y) {
                score++;
                document.getElementById("scoreboard").textContent = "Score: " + score;
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };
            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert("Game Over! Your Score: " + score);
                location.reload();
            }

            snake.unshift(newHead);
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }

        document.addEventListener("keydown", event => {
            if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
            if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
            if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
            if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
        });