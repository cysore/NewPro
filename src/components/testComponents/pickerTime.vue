<template lang="html">
    <div class="test">
        
        <div class="picker">
            <div class="picker-time">
                <div class="picker-time-tit">
                    <span>取消</span>
                    <span>确定</span>
                </div>
                <div class="picker-time-content"
                v-on:touchstart.stop.prevent="touchstart($event)"
                v-on:touchmove.stop.prevent="touchmove($event)"
                v-on:touchend.stop.prevent="touchend($event)">
                    <ul class="picker-time-list list1"
                    >
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                    </ul>
                    <ul class="picker-time-list list2"
                    >
                        <li>2016</li>
                        <li>2016</li>
                        <li>2017</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                    </ul>
                    <ul class="picker-time-list list3"
                    >
                        <li>2016</li>
                        <li>2016</li>
                        <li>2018</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                        <li>2016</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            time:null,
            startX:null,
            startY:null,
            endX:null,
            endY:null,
            liHeight:null,
        }
    },
    created(){
        
    },
    mouted(){
        let li = document.querySelector('li');
        this.liHeight = (window.getComputedStyle(li).height).replace('px','');
        console.log(this.liHeight)
    },
    methods:{
        touchstart(e){
            let eEle = e.target;

            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;

            // console.log(e.target.parentNode.className)
            console.log(this.startY)
        },
        touchmove(e){
            this.endX = e.touches[0].clientX;
            this.endY = e.touches[0].clientY;

            let eEle = e.target.parentNode;
            let direction = this.GetSlideDirection(this.startX,this.startY,this.endX,this.endY);
            let offsetY = this.endY - this.startY +this.liHeight;
            console.log(offsetY);
            let className = eEle.className;

            if((direction == 1||2) && className.indexOf('picker-time-list')!=-1){
               
                eEle.style.transform='translate3d(0,'+ offsetY +'px,0)';
                
                // console.log(direction)
            }
            // console.log(e.target.parentNode);

        },
        touchend(e){

            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;

            console.log(this.endY)
        },

        //返回角度
        GetSlideAngle(dx,dy){
            return Math.atan2(dy,dx) * 180 / Math.PI;
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
            let angle = this.GetSlideAngle(dx, dy);
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
        }
    }
}
</script>

<style lang="less">
.test{
    overflow: hidden;
    border: 1px red solid;
}
.picker{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0,0,0,.5);
    .picker-time{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 6rem;
        background: #fff;
        .picker-time-tit{
            border-bottom: 1px #ccc solid;
            display: box;
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            >span{
                width: 20%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: .35rem;
            }
        }
        .picker-time-content{
            height: 5rem;
            width: 100%;
            overflow: hidden;
            position: relative;
            display: box;
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            &:before{
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                height: 2rem;
                width: 90%;
                margin: 0 5%;
                background-image: linear-gradient(to bottom, #FFF, rgba(255, 255, 255, 0));
                border-bottom: 1px #ccc solid;
            }
            &:after{
                content: '';
                display: block;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2rem;
                width: 90%;
                margin: 0 5%;
                background-image: linear-gradient(to top, #FFF, rgba(255, 255, 255, 0));
                border-top: 1px #ccc solid;
            }
            .picker-time-list{
                width: 33.33%;
                height: auto;
                text-align: center;
                transition: all .25s ease-out;
                overflow: hidden;
                border: 1px red solid;
                >li{
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .5rem;
                }

            }
        }
    }
}

</style>
