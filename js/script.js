const ring = new Ring("gameDisplay", "100", "100");
// ring.moveToGround();
ring.move(100, 100);

//右クリック時にコンテキストメニューを表示させないようにする
gameDisplay.addEventListener("contextmenu", ()=> {return false});

//作成中
//水流出すハンドラ
function pushOutWaterFlow(distance=100, weight="50"){
    // const lineLength = 
}

//作成中
//左クリックで左半分の画面側から水流出す
document.addEventListener("click", (e)=>{
    console.log("aaa");

});

//作成中
//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", ()=>{
    console.log("bbb");
});


//ボールを落下させ続ける


