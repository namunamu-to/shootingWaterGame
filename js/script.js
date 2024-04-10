const ring = new Ring("gameDisplay", "100", "100");
// ring.moveToGround();
ring.move(100, 100);

//右クリック時にコンテキストメニューを表示させないようにする
gameDisplay.addEventListener("contextmenu", () => { return false });

//作成中
//水流出すハンドラ
function pushOutWaterFlow(distance = 100, weight = "50") {
    // const lineLength = 
}

//作成中
//左クリックで左半分のリングを右上方向に吹き飛ばす
function blowRing() {
    ring.moveTo(5, 5);
    console.log("aaa");
}
document.addEventListener("click", (e) => {
    // for(let i = 0; 0<40; i++) setTimeout(blowRing, 3);
});

//作成中
//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", () => {
    console.log("bbb");
});

//左シフトキー
document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") { //左シフト
        console.log("AAA");
    }
    if (e.location == 0) { //右シフト
        console.log("BBB");
    }

    console.log("e.code = " + e.code);
    console.log("e.location = " + e.location);
    console.log("KeyboardEvent.DOM_KEY_LOCATION_LEFT = " + KeyboardEvent.DOM_KEY_LOCATION_LEFT);
    console.log("KeyboardEvent.DOM_KEY_LOCATION_RIGHT = " + KeyboardEvent.DOM_KEY_LOCATION_RIGHT);

});


//ボールを落下させ続ける
function fallRing() {
    ring.move(0, 3);
}
setInterval(fallRing, 11);


