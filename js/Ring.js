let createdNum = 0;
const ringImgPaths = {"red" : "./img/redRing.png", "blue" : "./img/blueRing.png"} 


class Ring{
    constructor(showToElmId, x=0, y=0, width=40, height=40, color="red"){
        this.id = ++createdNum;
        this.x = x;
        this.y = y;

        //サークル画像の要素作り、引数で指定された要素に追加
        let ringHtml = `<img id="${this.getId()}" class="ring" style="position: absolute;" src="${ringImgPaths[color]}">`;
        this.showElm = document.getElementById(showToElmId); //表示先の要素
        this.showElm.innerHTML += ringHtml;
        this.elm = document.getElementById(this.getId());

        this.style = this.elm.style;

        //描画サイズを引数で指定されたサイズに変更
        this.setSize(width, height);

        //引数で指定された座標に描画
        this.moveTo(x, y);
    }

    setColor(color) {
        elm.src = ringImgPaths[color];
    }

    getId(){
        return `ring${this.id}`;
    }
    
    setSize(width=parseInt(this.style.width), height=parseInt(this.style.height)){
        this.style.width = width + "px";
        this.style.height = height + "px";
    }

    moveToGround(){
        this.setY(this.showElm.clientHeight - this.elm.clientHeight);
    }

    move(x=0, y=0){
        this.style.position = "relative";
        this.style.left = parseInt(this.style.left) + x + "px"; 
        this.style.top = parseInt(this.style.top) +  y + "px";
        this.style.position = "absolute";
    }

    moveTo(x=parseInt(this.style.left), y=parseInt(this.style.top)){
        this.x = x;
        this.style.left = x + "px";

        this.y = y;
        this.style.top = y + "px";
    }
}