// 思路：
// 【1】点击开始按钮，出现随机图片在顶部的随机位置；
// 【2】 让随机出现的图片，做自由落体运动；
// 【3】 当点中图片分数加1，但图片掉落底部失分加1.
// 获取该用到的元素
let btn = document.querySelector("#top button");
let add = document.querySelectorAll("#middle span")[0];
let reduce = document.querySelectorAll("#middle span")[1];
let div = document.querySelector("#middle  .right");
let img = document.querySelector(".right img");
let arrImg = ["../images/1.png", "../images/2.png", "../images/3.png", "../images/4.png", "../images/5.png", "../images/6.png", "../images/7.png", "../images/8.png"];
//  获取水果能在右边活动的宽度,高度
let width = parseInt(getStyle(div, "width")) - 50;
let height = parseInt(getStyle(div, "height")) - 50;
// 定义一些该用到的变量
let imgTop = 0; //用于img做下落运动的变量
let num = 0;    //用于img做下落运动的变量
let funshu_jian = 0;  //扣分变量
let funshu_jia = 0;   //加分变量
let flag = true;     //用于判断是加分还是扣分状态

function auto() {
    // 随机获取数组里的水果和其出现的位置
    let n = Math.round(Math.random() * (arrImg.length - 1));
    let positions = Math.round(Math.random() * (width));
    // 赋值
    img.src = arrImg[n]
    img.style.left = positions + "px";
    //   水果图片显示出来
    img.style.display = "block";
    // 将 fun函数的变量初始化
    imgTop = 0;
    num = 0;

}

function fun() {
    // 用一个定时器让img做下落运动
    let timer = setInterval(() => {
        num += 10;
        imgTop = imgTop + num;
        // 当图片下落高度大于定义活动的高度并满足flag=true时，
        if (imgTop >= height && flag === true) {
            img.style.display = "none";
            // 失分项加1
            funshu_jian++;
            reduce.innerHTML = funshu_jian
            // 调用auto函数
            auto()
        } else if (flag === false) {
            auto()
            flag = true
        }
        img.style.top = imgTop + "px";
        // 当失分为15时，停止定时器，并将数据恢复成初始状态
        if (reduce.innerHTML > 15) {
            clearInterval(timer);
            alert(`你的得分为${add.innerHTML}`)
            btn.innerHTML = "游戏开始";
            btn.disabled = false;
            funshu_jian=0;
            funshu_jia=0;
            reduce.innerHTML=0;
            add.innerHTML=0;
            img.style.display = "none";
            flag = true;
        }
    }, 200)
}
btn.onclick = () => {
    //点击后，游戏开始变成游戏进行中
    btn.innerHTML = "游戏进行ing";
    //  btn按钮不可再点击
    btn.disabled = true;
    auto()
    fun()
}
// 当图片被点击时，得分加1，改变图片路径，并将判定flag = false
img.onclick = () => {
    flag = false;
    img.src = "../images/cry.png";
    funshu_jia++;
    add.innerHTML = funshu_jia;
}