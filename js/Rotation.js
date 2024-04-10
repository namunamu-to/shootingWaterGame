//gameDisplayが回転するようにはなった
// がゲーム画面がいろいろめり込む
// gameDisp;ayの配置を調節すれば解決するがとりあえず何もしていない
// マウスホイールクリックまたはスペースキーで回転するか否か決められるようになった
// Ctrlキーでも動かせるようになった
// スペースキーを押すとボールがジャンプする…
// エンターキーに変えてみたが結局ボールがジャンプするので現状はスペースキー

const square = document.getElementById('gameDisplay');
const rotationSpeed = 1; // 回転速度の調節係数
const maxRotation = 20; // 最大回転角度

let rotationEnabled = true; // 回転の有効状態を表すフラグ
let rotationDirection = 0; // 回転方向を表す変数
let currentRotation = 0; // 現在の回転角度を保持する変数
let rotationPaused = false; // 回転が一時停止されているかを表すフラグ

// マウスカーソルでの四角の動作
document.addEventListener('mousemove', (event) => {
    // 回転が無効化されている場合または一時停止されている場合、処理を終了する
    if (!rotationEnabled || rotationPaused) return; 

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const rect = square.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    let rotation = angle * (180 / Math.PI) * rotationSpeed; // 回転速度を適用

    // 最大回転角度を超えないように制限
    if (rotation > maxRotation) {
        rotation = maxRotation;
    } else if (rotation < -maxRotation) {
        rotation = -maxRotation;
    }

    square.style.transform = `translate(0%, 0%) rotate(${rotation}deg)`;

    currentRotation = rotation;
    // ただのログ
    console.log(`現在の回転角度: ${rotation}度`);
});

// キーボードの回転操作
document.addEventListener('keydown', (event) => {
    if (event.code === 'ControlLeft') { // 左Ctrlキーが押された場合
        rotationDirection = -1; // 左に回転する
    } else if (event.code === 'ControlRight') { // 右Ctrlキーが押された場合
        rotationDirection = 1; // 右に回転する
    }

    if (event.code === 'Space') { // スペースキーが押された場合
        rotationPaused = !rotationPaused; // 回転の一時停止状態を切り替える
        console.log(`回転が${rotationPaused ? '一時停止' : '再開'}されました`);
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control') { // Ctrlキーが離された場合
        rotationDirection = 0; // 回転方向をリセット
    }
});

// マウスホイールのクリックで回転の有効無効をトグルする
document.addEventListener('mousedown', (event) => {
    if (event.button === 1) { // マウスホイールがクリックされた場合
        rotationPaused = !rotationPaused; // 回転の一時停止をトグル
        console.log(`回転が${rotationPaused ? '一時停止' : '再開'}されました`);
    }
});

// 四角の回転を更新する関数
function updateRotation() {
    if (rotationEnabled && rotationDirection !== 0 && !rotationPaused) {

        // 回転速度が早ければ早いほどCtrlキーでも大きい数字で回転する
        // 仕様に最も近いバグの状態
        currentRotation += rotationDirection * rotationSpeed; // 回転方向に応じて回転角度を更新

        // 最大回転角度を超えないように制限
        if (currentRotation > maxRotation) {
            currentRotation = maxRotation;
        } else if (currentRotation < -maxRotation) {
            currentRotation = -maxRotation;
        }

        square.style.transform = `translate(0%, 0%) rotate(${currentRotation}deg)`;

        // ただのログ
        console.log(`現在の回転角度: ${currentRotation}度`);
    }
}

// 回転を定期的に更新する
setInterval(updateRotation, 100); // 100ミリ秒ごとに回転を更新
