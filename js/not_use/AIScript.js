
// Microsoft Copilotに書かせてみたウォーターゲーム
//基礎中の基礎しか書いていないから自分でもっといろいろ追加してね！と書いていた

// ゲームの状態を管理するオブジェクト
let game = {
    isRunning: false,
    ball: {
        x: 50,
        y: 50,
        speed: 2
    },
    target: {
        x: 100,
        y: 0
    }
};

// ボールを動かす関数
function moveBall() {
    if (game.isRunning) {
        game.ball.y -= game.ball.speed;
        if (game.ball.y <= game.target.y) {
            game.isRunning = false;
            console.log("Goal!");
        }
    }
}

// ボタンを押したときの処理
function onButtonPress() {
    game.isRunning = true;
}

// ゲームのメインループ
function gameLoop() {
    moveBall();
    setTimeout(gameLoop, 1000 / 60); // 60 FPS
}

// ゲームの開始
gameLoop();
