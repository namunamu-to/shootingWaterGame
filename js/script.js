let gameStarted = false; // ゲームが開始されたかどうかのフラグ

const clickSound = document.getElementById('btn_audio');

function adjustSoundSpeed(speed) {
    clickSound.playbackRate = speed;
}

//ボールを吹き飛ばす関数
//引数は"right"か"Left"で指定
function blowRing(fromDirection) {  
    
    // ゲームが開始されていない場合は処理しない
    if (!gameStarted) {
        return;
    }

    //SE用
    clickSound.currentTime = 0;
    clickSound.play();
    
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

        if (ringTop < sectionTopBoundaries[0]) 
         // リングが最上部のセクションよりも上にある場合
        {
            moveDistanceX = 5;
            moveDistanceY = 7;
        } else if (ringTop >= sectionTopBoundaries[0] && ringTop < sectionTopBoundaries[1]) 
        // リングが中央のセクションにある場合
        {
            moveDistanceX = 5;
            moveDistanceY = 20;
        } else 
        // リングが最下部のセクションにある場合
        {
            moveDistanceX = 5;
            moveDistanceY = 50;
        }

        if (isQuarterUnder) {
            if (fromDirection == "left" && ringLeft < gameDisplayWidth - quarterBoundsBeside) { //左から吹き飛ばす
                repeatMove(rings[i], 10, -10, moveDistanceX, moveDistanceY);
            } else if (fromDirection == "right" && ringLeft > quarterBoundsBeside) { //右から吹き飛ばす
                repeatMove(rings[i], -10, -10, moveDistanceX, moveDistanceY);
            }
        }

    }

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

    if (e.keyCode == 16) { //右シフト
        blowRing("right");
    }

});