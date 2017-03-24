/**
 * Created by admin on 2017/3/18.
 */
window.onload = function () {

    headerScroll();

    banner();

    countDownTimer();
};

/**
 * 头部滚动
 */
function headerScroll() {
    var headerNode = document.querySelector('.header');
    var navNode = document.querySelector('.nav');
    //定义一个最大滑动距离
    var maxScroll = navNode.offsetTop + navNode.offsetHeight;

    window.onscroll = function () {
        var winScroll = window.document.body.scrollTop;

        var percent = winScroll / maxScroll;
        if(percent > 1) percent = 1;

        headerNode.style.background = 'rgba(201, 21, 35, '+percent+')';
    }
}

/**
 * 轮播图
 */
function banner() {
    // console.log('轮播图');
    var imagesUl = document.querySelector('.banner_images');
    var dotsUl = document.querySelector('.banner_dots');
    //此处为了实现无限轮播的效果，所以将最后一个元素复制一份添加至最前面，
    //将第一个元素复制一份添加至最后面。
    var imageArr = imagesUl.children;
    var imageFirst = imageArr[0];
    var imageLast = imageArr[imageArr.length-1];
    //将复制的节点添加至ul中
    imagesUl.insertBefore(imageLast.cloneNode(true),imageFirst);
    imagesUl.appendChild(imageFirst.cloneNode(true));
    // console.log(imageArr);

    var width = document.body.offsetWidth;
    var imageIndex = 1;//因为在ul的最前面添加一个元素，故初始值为1。
    imagesUl.style.transform = 'translateX('+ -1 * width + 'px)';
    // console.log('imageIndex：' + imageIndex);
    var dotIndex = 0;

    var timer = setInterval(function () {

        imageIndex++;
        // console.log('imageIndex：' + imageIndex);
        imagesUl.style.transition = 'all .5s';
        imagesUl.style.transform = 'translateX('+ -1 * width * imageIndex + 'px)';

    },2000);

    imagesUl.addEventListener('webkitTransitionEnd',function () {
        // console.log('平移结束');
        if(imageIndex > 8) {
            imageIndex = 1;
            imagesUl.style.transition = '';
            imagesUl.style.transform = 'translateX('+ -1 * width * imageIndex + 'px)';
        }else if(imageIndex < 1){
            imageIndex = 8;
            imagesUl.style.transition = '';
            imagesUl.style.transform = 'translateX('+ -1 * width * imageIndex + 'px)';
        }

        dotsUl.children[dotIndex].classList.remove('current');
        dotIndex++;
        if(dotIndex == 8) dotIndex = 0;
        dotsUl.children[dotIndex].classList.add('current');
    });

    //因为在浏览器中无法使用触摸事件，故暂不能进行测试
    var mDownX;
    var mMoveX;
    imagesUl.addEventListener('touchstart',function (event) {
        clearInterval(timer);
        imagesUl.style.transition = '';
        mDownX = event.touches[0].clientX;
    });
    imagesUl.addEventListener('touchmove',function (event) {
        mMoveX = event.touches[0].clientX - mDownX;
        imagesUl.style.transform = 'translateX('+mMoveX - width * imageIndex+')';
    });
    imagesUl.addEventListener('touchend',function () {
        var maxDis = width / 3;
        if(Math.abs(mMoveX) > maxDis){
            if(mMoveX < 0){
                imageIndex ++;
            }else {
                imageIndex --;
            }
        }
        imagesUl.style.transition = 'all .5s';
        imagesUl.style.transform = 'translateX('+ -1 * width * imageIndex + 'px)';

        timer = setInterval(function () {

            imageIndex++;
            // console.log('imageIndex：' + imageIndex);
            imagesUl.style.transition = 'all .5s';
            imagesUl.style.transform = 'translateX('+ -1 * width * imageIndex + 'px)';

        },2000);
    });

}

/**
 * 倒计时
 */
function countDownTimer() {

    var totalSec = 3 * 60 * 60;

    var countNode = document.querySelector('.content_count_down');
    var countSpanArr = countNode.children;
    console.log(countSpanArr);

    var time = setInterval(function () {

        totalSec --;

        if(totalSec < 0){
            console.log('倒计时已结束');
            clearInterval(time);
            return;
        }

        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 / 60);
        var second = totalSec % 60;

        console.log(hour + " -- " + minute + ' -- ' + second);

        countSpanArr[0].innerHTML = String(Math.floor(hour / 10));
        countSpanArr[1].innerHTML = String(hour % 10);

        countSpanArr[3].innerHTML = String(Math.floor(minute / 10));
        countSpanArr[4].innerHTML = String(minute % 10);

        countSpanArr[6].innerHTML = String(Math.floor(second / 10));
        countSpanArr[7].innerHTML = String(second % 10);
    },1000);
}