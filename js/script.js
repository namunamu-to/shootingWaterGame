const ring = new Ring("gameDisplay", "100", "100");
// ring.moveToGround();
ring.move(100, 100);

//水流出すハンドラ
document.addEventListener("click", (e)=>{
    console.log("aaa");

});

document.addEventListener("contextmenu", ()=>{
    console.log("bbb");
});