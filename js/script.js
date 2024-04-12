const clickSound = document.getElementById('btn_audio');
let rings = [];
//リングの生成
const ringWidth = 40;
const ringHeight = 40;
for (let i = 0; i < 8; i++) {
    const randomX = parseInt(Math.random() * (parseInt(gameDisplay.clientWidth) - ringWidth)); //0～ (gameDIsplay - ringHeight)の横幅の範囲でランダム
    const romdomY = parseInt(Math.random() * (parseInt(gameDisplay.clientHeight) - ringHeight)); //0～　(gameDIsplay縦幅 - ringHeight)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "blue"));
}

for (let i = 0; i < 8; i++) {
    const randomX = parseInt(Math.random() * (parseInt(gameDisplay.clientWidth) - ringWidth)); //0～ (gameDIsplay - ringHeight)の横幅の範囲でランダム
    const romdomY = parseInt(Math.random() * (parseInt(gameDisplay.clientHeight) - ringHeight)); //0～　(gameDIsplay縦幅 - ringHeight)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "red"));
}



// 音声再生速度を調整する関数
function adjustSoundSpeed(speed) {
    clickSound.playbackRate = speed;
}

// 再生速度を0.5倍に設定する
// adjustSoundSpeed(1.25);

//ボールを吹き飛ばす関数
//引数は"right"か"Left"で指定
function blowRing(fromDirection) {
    const gameDisplayWidth = gameDisplay.clientWidth;
    const quarterBoundsBeside = gameDisplayWidth / 4;
    const quarterBoundsVirtical = gameDisplay.clientHeight / 4;


    //各リングを吹き飛ばす
    for (let i = 0; i < rings.length; i++) {
        const ringLeft = parseInt(rings[i].style.left);
        const ringTop = parseInt(rings[i].style.top);
        const isQuarterUnder = ringTop > quarterBoundsVirtical;

        if (isQuarterUnder) {
            if (fromDirection == "left" && ringLeft < gameDisplayWidth - quarterBoundsBeside) { //左から吹き飛ばす
                repeatMove(rings[i], 10, -10, 1, 25);
            } else if (fromDirection == "right" && ringLeft > quarterBoundsBeside) { //右から吹き飛ばす
                repeatMove(rings[i], -10, -10, 1, 25);
            }
        }
    }

    //SE用
    clickSound.currentTime = 0;
    clickSound.play();
}

document.addEventListener("click", (e) => {
    blowRing("left");
});

//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", () => {
    blowRing("right");
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") { //左シフト
        blowRing("left");
    }

    if (e.location == 0) { //右シフト
        blowRing("right");
    }
});