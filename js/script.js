let rings = [];

//リングの生成
for(let i=0; i<1; i++){
    const randomX = parseInt(Math.random() * parseInt(gameDisplay.clientWidth)); //0～gameDIsplayの横幅の範囲でランダム
    const romdomY = parseInt(Math.random() * parseInt(gameDisplay.clientHeight)); //0～gameDIsplay縦幅の範囲でランダム
    rings.push(new Ring("gameDisplay", randomX, romdomY, width=40, height=40, color="red"));
    rings.push(new Ring("gameDisplay", randomX, romdomY, width=40, height=40, color="blue"));
}

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
    for(let i=0; i<rings.length; i++){
        //吹き飛ばす
        if (fromDirection == "left") {
            rings[i].repeatMove(10, -10, 1, 25);
        } else if (fromDirection == "right") {
            rings[i].repeatMove(-10, -10, 1, 25);
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


