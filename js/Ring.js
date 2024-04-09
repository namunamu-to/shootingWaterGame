let createdNum = 0;
const ringImgPaths = {"red" : "./img/redRing.png", "blue" : "./img/blueRing.png"} 


class Ring{
    constructor(showToElmId, x=0, y=0, width="40", height="40", color="red"){
        this.id = ++createdNum;
        this.x = x;
        this.y = y;

        //サークル画像の要素作り、引数で指定された要素に追加
        let ringHtml = `<img id="${this.getId()}" class="ring" style="position: absolute;" src="${ringImgPaths[color]}">`;
        this.showElm = document.getElementById(showToElmId); //表示先の要素
        this.showElm.innerHTML += ringHtml;
        this.elm = document.getElementById(this.getId());

        //描画サイズを引数で指定されたサイズに変更
        this.setWidth(width);
        this.setHeight(height);

        //引数で指定された座標に描画
        this.setPosition(x, y);
    }

    setColor(color) {
        this.elm.src = ringImgPaths[color];
    }

    getId(){
        return `ring${this.id}`;
    }

    setX(x){
        this.elm.style.left = x + "px";
    }
    
    setY(y){
        this.elm.style.top = y + "px";
    }

    setPosition(x, y){
        this.setX(x);
        this.setY(y);
    }


    setWidth(width){
        this.elm.style.width = width + "px";
    }
    
    setHeight(height){
        this.elm.style.height = height + "px";
    }

    moveToGround(){
        this.setY(this.showElm.clientHeight - this.elm.clientHeight);
    }

}