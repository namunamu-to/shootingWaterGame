const ring = new Ring("gameDisplay", "100", "100");
ring.move(100, 300);
const clickSound = document.getElementById('btn_audio');

// 音声再生速度を調整する関数
function adjustSoundSpeed(speed) {
    clickSound.playbackRate = speed;
}

// 再生速度を0.5倍に設定する
//adjustSoundSpeed(1.25);

//右クリック時にコンテキストメニューを表示させないようにする
gameDisplay.addEventListener("contextmenu", () => { return false });

//左クリックで左半分のリングを右上方向に吹き飛ばす
function blowRing() {
    ring.moveTo(5, 5);
}

document.addEventListener("click", (e) => {
    ring.repeatMove(10, -10, 1, 25);

    //SE用
    clickSound.currentTime = 0; 
    clickSound.play();

});

//作成中
//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", () => {
    ring.repeatMove(-10, -10, 1, 25);

        //SE用
        clickSound.currentTime = 0; 
        clickSound.play();
    
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") { //左シフト
        ring.repeatMove(10, -10, 1, 25);

            //SE用
    clickSound.currentTime = 0; 
    clickSound.play();

    }
    
});


