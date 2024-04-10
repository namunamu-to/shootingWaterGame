//gameDisplayが回転するようにはなった
// がゲーム画面がいろいろめり込む
// gameDisp;ayの配置を調節すれば解決するがとりあえず

const square = document.getElementById('gameDisplay');
const rotationSpeed = 2; // 回転速度の調節係数
const maxRotation = 10; // 最大回転角度

document.addEventListener('mousemove', (event) => {
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

    // ただのログ
    console.log(`現在の回転角度: ${rotation}度`);
});
