const clickSound = document.getElementById('btn_audio');



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
    const gameDisplayHeight = gameDisplay.clientHeight;

    const quarterBoundsBeside = gameDisplayWidth / 4;
    const quarterBoundsVirtical = gameDisplay.clientHeight / 4;
    const sectionHeight = gameDisplayHeight / 3;
    const sectionTopBoundaries = [sectionHeight, 2 * sectionHeight];
  

    //各リングを吹き飛ばす
    for (let i = 0; i < rings.length; i++) {
        const ringLeft = parseInt(rings[i].style.left);
        const ringTop = parseInt(rings[i].style.top);
        const isQuarterUnder = ringTop > quarterBoundsVirtical;

        let moveDistanceX, moveDistanceY;

        if (ringTop < sectionTopBoundaries[0]) {
            moveDistanceX = 10;
            moveDistanceY = 5;
        } else if (ringTop >= sectionTopBoundaries[0] && ringTop < sectionTopBoundaries[1]) {
            moveDistanceX = 5;
            moveDistanceY = 15;
        } else {
            moveDistanceX = 3;
            moveDistanceY = 25;
        }

        if (isQuarterUnder) {
            if (fromDirection == "left" && ringLeft < gameDisplayWidth - quarterBoundsBeside) { //左から吹き飛ばす
                repeatMove(rings[i], 10, -10, moveDistanceX, moveDistanceY);
            } else if (fromDirection == "right" && ringLeft > quarterBoundsBeside) { //右から吹き飛ばす
                repeatMove(rings[i], -10, -10, moveDistanceX, moveDistanceY);
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