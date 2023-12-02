
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const snowflakes = [];
const flakesCount = 200; // 雪花片数
const image = new Image();
image.src = "./image/snowflake.png"; // 雪花图片

const init = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < flakesCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: Math.random() * 3,
            speedY: Math.random() * 3 + 1,
            radius: Math.random() * 3 + 2,
            swing: Math.random() * 40 + 20,
            angle: 0,
        });
    }

    draw();
};

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snowflakes.length; i++) {
        context.save();
        context.translate(snowflakes[i].x, snowflakes[i].y);
        context.rotate((snowflakes[i].angle * Math.PI) / 180);

        // 绘制自定义图片
        context.drawImage(
            image,
            -snowflakes[i].radius,
            -snowflakes[i].radius,
            snowflakes[i].radius * 3,
            snowflakes[i].radius * 3
        );

        context.restore();

        snowflakes[i].x += snowflakes[i].speedX;
        snowflakes[i].y += snowflakes[i].speedY;

        if (
            snowflakes[i].x > canvas.width + 5 ||
            snowflakes[i].x < -5 ||
            snowflakes[i].y > canvas.height
        ) {
            if (i % 3 > 0) {
                snowflakes[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    speedX: snowflakes[i].speedX,
                    speedY: Math.random() * 3 + 1,
                    radius: Math.random() * 3 + 2,
                    swing: Math.random() * 40 + 20,
                    angle: 0,
                };
            } else {
                if (Math.sin(new Date().getTime() / 1000) > 0) {
                    snowflakes[i] = {
                        x: -5,
                        y: Math.random() * canvas.height,
                        speedX: Math.random() * 3,
                        speedY: Math.random() * 3 + 1,
                        radius: Math.random() * 3 + 2,
                        swing: Math.random() * 40 + 20,
                        angle: 0,
                    };
                } else {
                    snowflakes[i] = {
                        x: canvas.width + 5,
                        y: Math.random() * canvas.height,
                        speedX: Math.random() * 3,
                        speedY: Math.random() * 3 + 1,
                        radius: Math.random() * 3 + 2,
                        swing: Math.random() * 40 + 20,
                        angle: 0,
                    };
                }
            }
        }

        snowflakes[i].angle += snowflakes[i].swing / 1000;
    }

    requestAnimationFrame(draw);
};
image.onload = () => {
    init();
};
