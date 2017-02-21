<template lang="html">
    <div class="wrap" ref="wrap">
        <div class="fixed">
            {{scrolls}}
        </div>

        <section class="loadmore"
        ref="loadmoreBox"
        v-on:touchstart.stop="touchstart($event)"
        v-on:touchmove.stop="touchmove($event)"
        v-on:touchend.stop="touchend($event)"
        >
            <section class="loadmore-up" ref="loadmorePullUp">
                <section class="loadmore-loding" v-bind:class="{'help': loding}">{{pullup}}</section>
            </section>

            {{msg}}
            <p v-for="item in 20" style="height:1rem;border:1px red solid;">{{item}}</p>
            <!-- <section class="loadmore-down" ref="loadmorePullDown">
                <section class="loadmore-loding" v-bind:class="{'help': loding}">{{pulldown}}</section>
            </section> -->
        </section>

    </div>
</template>

<script>
import libs from '../../javascripts/main.js';
//v-bind="{'style' : 'height:'+ windowHeight +'px'}"
export default {
    name:'loadmore',
    data(){
        return{
            scrolls:0,
            msg:'loadmore',
            loding:false,
            pullup:'↓',
            // pulldown:'↑',
        }
    },
    created(){
        this.windowHeight = window.screen.height;
        let dateArr = ["2017-02-20 11:55:47", "2017-02-20 10:25:00", "2017-02-20 10:24:44", "2017-02-17 19:58:21", "2017-02-17 19:57:50", "2017-02-17 18:49:59"];
                    // ["2017-02-20 11:55:47", "10:25:00", "10:24:44", "2017-02-17 19:58:21", "19:57:50", "18:49:59"]
        let arr = [];
        for(let i = 0;i<dateArr.length;i++){
            if(dateArr[i+1]){
                // debugger
                let first = dateArr[i].split(' ')[0];
                let next = dateArr[i+1].split(' ')[0];

                if(first != next){
                    arr.push(dateArr[i])
                }else{
                    arr.push(dateArr[i].split(' ')[1])
                }
            }else{
                arr.push(dateArr[i])
            }

        }
        console.log(arr);
        // console.log(Array.from(new Set(arr)));
    },
    mounted(){
        this.loadmoreBox = this.$refs.loadmoreBox;
        this.loadmorePullUp = this.$refs.loadmorePullUp;
        this.wrap = this.$refs.wrap;
        this.$refs.wrap.addEventListener('scroll',this.scrollHandler);
        // this.loadmorePullDown = this.$refs.loadmorePullDown;
    },
    methods:{
        touchstart(e){
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.loadmoreBox.style.transition="none";
            // console.log(e.target);
            // this.$refs.wrap.scrollTop = 500;
        },
        touchmove(e){
            this.endX = e.touches[0].clientX;
            this.endY = e.touches[0].clientY;
            //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
            this.direction = libs.GetSlideDirection(this.startX,this.startY,this.endX,this.endY);
            this.offsetY = this.startY - this.endY;

            if(this.scrolls == 0){
                if(this.direction == 1){
                    /*if(this.offsetY > -100){
                        // console.log('上拉');
                        this.loadmorePullDown.children[0].style.transform=`rotate(${180}deg)`;
                    }else{
                        this.loadmorePullDown.children[0].style.transform=`rotate(${0}deg)`;
                    }*/
                    this.loadmoreBox.style.transform=`translate3d(0,${-this.offsetY}px,0)`;
                }else if(this.direction == 2){

                    if(this.offsetY < -100){
                        // console.log('下拉');
                        this.loadmorePullUp.children[0].style.transform=`rotate(${180}deg)`;
                    }else{
                        this.loadmorePullUp.children[0].style.transform=`rotate(${0}deg)`;
                    }

                    this.loadmoreBox.style.transform=`translate3d(0,${Math.abs(this.offsetY)}px,0)`;
                }
            }



        },
        touchend(e){
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            let loadmoreBox = this.loadmoreBox;

            loadmoreBox.style.transition=".5s";
            /*if(this.direction == 3 || this.direction == 4){
                loadmoreBox.style.transform=`translate3d(0,${0}px,0)`;
                return;
            }*/
            if(this.direction == 2 &&　this.offsetY < -100){
                console.log('下拉');
                this.loding = true;
                this.pullup = '';
                loadmoreBox.style.transform=`translate3d(0,${this.loadmorePullUp.offsetHeight}px,0)`;
                this.lodingUpHandler();
                return;
            }else if(this.direction == 1 && this.offsetY > -100){
                console.log('上拉');
                /*this.loding = true;
                this.pulldown = '';
                loadmoreBox.style.transform=`translate3d(0,${-this.loadmorePullUp.offsetHeight}px,0)`;
                this.lodingDownHandler();
                return;*/
            }else{
                console.log(1);
                loadmoreBox.style.transform=`translate3d(0,${0}px,0)`;
            }

        },
        lodingUpHandler(){
            if(this.loding){
                setTimeout(()=>{
                    this.loadmorePullUp.children[0].style.transform=`rotate(${0}deg)`;
                    this.loadmoreBox.style.transform=`translate3d(0,${0}px,0)`;
                    this.loding = false;
                    this.pullup = '↓';
                },3000)
            }
        },
        lodingDownHandler(){
            if(this.loding){
                setTimeout(()=>{
                    this.loadmorePullDown.children[0].style.transform=`rotate(${0}deg)`;
                    this.loadmoreBox.style.transform=`translate3d(0,${0}px,0)`;
                    this.loding = false;
                    this.pulldown = '↑';
                },3000)
            }
        },
        scrollHandler(){
            this.scrolls = this.wrap.scrollTop;
        }
    },
    watch:{
        loding(n,o){
            console.log(n);
        }
    }
}
</script>

<style lang="less">
.wrap{
    height: 50vh;
    width: 50%;
    margin:0 auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
    border: 1px blue solid;
}
.fixed{position: fixed;left: 25%;top: 20%;}
.none{display: none;}
.loadmore{
    // padding: 1rem;
    // height: 100rem;
    background: #f1f1f1;
}
.loadmore-up{
    padding: .25rem 0;
    margin-top: -1.5rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    transition: .5s;
}
.loadmore-down{
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    transition: .5s;
}
.loadmore-loding{
    transition: .25s;
}
/*Battery*/
.battery{
    width: 28px;
    height: 14px;
    border: 1px #fff solid;
    border-radius: 2px;
    position: relative;
    -webkit-animation: charge 5s linear infinite;
       -moz-animation: charge 5s linear infinite;
            animation: charge 5s linear infinite;
    margin: 1.25vh auto 0 auto;
}
.battery:after{
    width: 2px;
    height: 7px;
    background-color: #fff;
    border-radius: 0px 1px 1px 0px;
    position: absolute;
    content: "";
    top: 3px;
    right: -4px;
}
@-webkit-keyframes charge{
    0%{box-shadow: inset 0px 0px 0px #fff;}
    100%{box-shadow: inset 30px 0px 0px #fff;}
}
@-moz-keyframes charge{
    0%{box-shadow: inset 0px 0px 0px #fff;}
    100%{box-shadow: inset 30px 0px 0px #fff;}
}
@keyframes charge{
    0%{box-shadow: inset 0px 0px 0px #fff;}
    100%{box-shadow: inset 30px 0px 0px #fff;}
}

.help{
    width: 1rem;
    height: 1rem;
    border: 1px #ccc solid;
    border-radius: 50%;
    position: relative;
    -webkit-animation: rotation 1s linear infinite;
       -moz-animation: rotation 1s linear infinite;
            animation: rotation 1s linear infinite;
    margin: 0 auto 0 auto;
}
.help:after{
    width: 5px;
    height: 5px;
    top:-1px;
    background-color: rgba(255,255,255,1);
    border-radius: 100%;
    position: absolute;
    content: "";
}
@-webkit-keyframes rotation{
    0%{-webkit-transform: rotate(0deg);}
    100%{-webkit-transform: rotate(360deg);}
}
@-moz-keyframes rotation{
    0%{-webkit-transform: rotate(0deg);}
    100%{-webkit-transform: rotate(360deg);}
}
@keyframes rotation{
    0%{-webkit-transform: rotate(0deg);}
    100%{-webkit-transform: rotate(360deg);}
}
</style>
