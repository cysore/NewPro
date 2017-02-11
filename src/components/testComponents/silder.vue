<template lang="html">
    <section class="silderbox">
        <div class="silderbox-img" ref="silderboxImg" v-bind="{'style' : 'width:'+ boxWidth +'px'}"
        v-on:touchstart.stop.prevent="touchstart($event)"
        v-on:touchmove.stop.prevent="touchmove($event)"
        v-on:touchend.stop.prevent="touchend($event)">
            <a href="http://www.baidu.com" v-for="(item,index) in imgs" v-bind="{'data-item' : index}">
                <img v-bind:src="item.url" alt="">
            </a>
        </div>
        <div class="silderbox-item">
            <span v-for="(i,index) in imgs.length" v-bind:class="{'curr': index==imgIndex}"></span>
        </div>
    </section>
</template>

<script>
class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    toString(){
        return this.x+'+'+this.y;
    }

    toColor(){
        return this.color;
    }
}
class ColorPoint extends Point{
    constructor(x,y,color){
        // this.color = color;
        super(x,y);
        this.color = color;
    }

}
// let p = new Point(1,2);
// console.log(p.toString());
// console.log(typeof Point);
// console.log(Point == Point.prototype.constructor);
// console.log(Object.getOwnPropertyNames(Point.prototype));

let cp = new ColorPoint(25,8,'green');
console.log(cp.toColor());

var i = require('../../images/top_banner.png')
export default {
    name:'silderbox',
    data(){
        return {
            msg:'silder',
            imgs:[
                {'url':i},
                {'url':i},
                {'url':i},
                {'url':i},
            ],
            imgIndex:0,//图片下标
            boxWidth:0,//silderbox-img 的总宽度
            boxOffset:0,//上一个图片的offsetX值
            endOffset:0,
        }
    },
    mounted(){
        this.eEle = this.$refs.silderboxImg;
        this.autoPlay();
    },
    created(){
        this.windowWidth = window.screen.width;
        this.boxWidth = this.imgs.length * this.windowWidth;
    },
    methods:{
        touchstart(e){
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;            
            this.eEle.style.transition="none";
            clearInterval(this.auto)
        },
        touchmove(e){
            this.endX = e.touches[0].clientX;
            this.endY = e.touches[0].clientY;

            this.direction = this.GetSlideDirection(this.startX,this.startY,this.endX,this.endY);
            this.startOffset =  -(this.startX - this.endX);
            // console.log(this.eEle.style.width.replace('px',''));
            if(Math.abs(this.startOffset) >= (this.windowWidth/3)){
                if(this.direction == 3 ){
                    // this.index+=1;
                }else if(this.direction == 4){
                    // this.index-=1;
                }
            }
            let s = -this.imgIndex*this.windowWidth+e.touches[0].pageX-this.startX;
            console.log(s)
            this.eEle.style.transform=`translate3d(${s}px,0,0)`;
        },
        touchend(e){
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.imgIndex = Number(e.target.dataset.item);//第几张图片的下标
            this.$refs.silderboxImg.style.transition=".5s";
            this.endOffset = Math.abs(this.startX-this.endX);
            this.autoPlay();
            // 如果是只是点击则不切换图片
            if(this.endOffset <= 50){
                this.eEle.style.transform=`translate3d(${-((this.imgIndex)*this.windowWidth)}px,0,0)`;
                return;
            }

            if(this.direction == 3){//向右
                if(this.imgIndex == this.imgs.length-1){
                    this.eEle.style.transform=`translate3d(${-((this.imgIndex)*this.windowWidth)}px,0,0)`;
                    return;
                }
                
                this.eEle.style.transform=`translate3d(${-((this.imgIndex+1)*this.windowWidth)}px,0,0)`;
                this.imgIndex+=1;
                // console.log('向右'+this.imgIndex);
            }else if(this.direction == 4){//向左
                // console.log('向左'+(this.imgIndex-1));
                let res;
                this.imgIndex -= 1;
                
                if(this.imgIndex <= 0){
                    this.imgIndex = 0;
                    res = 0;
                }else{
                    res = (this.imgIndex+1)*this.windowWidth-this.windowWidth;
                }
                this.eEle.style.transform=`translate3d(${-res}px,0,0)`;
            }
        },
        autoPlay(){

            this.auto = setInterval(()=>{
                this.eEle.style.transition=".5s";
                if(this.imgIndex == this.imgs.length-1){

                    this.eEle.style.transform=`translate3d(${0}px,0,0)`;
                    this.imgIndex=0;
                    
                }else{
                    this.eEle.style.transform=`translate3d(${-((this.imgIndex+1)*this.windowWidth)}px,0,0)`;
                    this.imgIndex+=1;
                }
            }, 1000)
        },
        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        GetSlideDirection(startX,startY, endX, endY){

            let dy = startY - endY;
            let dx = endX - startX;
            let result = 0;

            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            // 获取手势方向
            let angle = Math.atan2(dy,dx) * 180 / Math.PI;//返回角度
            if (angle >= -45 && angle < 45) {
                result = 4;
            }else if (angle >= 45 && angle < 135) {
                result = 1;
            }else if (angle >= -135 && angle < -45) {
                result = 2;
            }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }
            return result;
        },

    }
}
</script>

<style lang="less">
.silderbox{
    height: 4rem;
    overflow: hidden;
    position: relative;
    .silderbox-img{
        height: 4rem;
        display: box;
        display: -webkit-box;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        >a{
            display: block;
            height: 4rem;
            img{
                pointer-events:none;
                width: 100%;
                height: 4rem;
            }
        }
    }
    .silderbox-item{
        pointer-events:none;
        position: absolute;
        bottom: 0;
        left: 0;
        padding:.1rem 0;
        height: .25rem;
        line-height: .25rem;
        width: 100%;
        text-align: center;
        >span{
            display: inline-block;
            height: .25rem;
            width: .25rem;
            margin: 0 .05rem;
            border-radius: 50%;
            background: #ccc;
        }
        .curr{
            background: #fd9153;
        }
    }
}

</style>
