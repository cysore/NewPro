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
                    <ul class="picker-time-list list1">
                        <li v-for="year in YMD.year">{{year}}年</li>
                    </ul>
                    <ul class="picker-time-list list2">
                        <li v-for="month in YMD.month">{{month}}月</li>
                    </ul>
                    <ul class="picker-time-list list3">
                        <li v-for="day in YMD.day">{{day}}日</li>
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
            startX:null,//touch 开始点
            startY:null,//touch 开始点
            endX:null,//touch 结束点
            endY:null,//touch 结束点
            direction:0,//touch 方向
            lisize:0,//li 个数
            currY:{
                year:0,
                month:0,
                day:0
            },//touch当前的距离
            index:{
                year:0,
                month:0,
                day:0
            },//滚动后的记录下标值
            selected:{
                year:0,
                month:0,
                day:0
            },//选中的值
            time:null,//touch start 记录的开始时间
            liHeight:null,//li 的高度
            windowWidth:null,//屏幕宽度
            YMD:{
                year:[],
                month:[],
                day:[]
            }
        }
    },
    created(){
        let maxDate = '2030-10-10';
        let minDate = '2000-10-10';

        let [
                maxDate_year,
                maxDate_month,
                maxDate_day,

                minDate_year,
                minDate_month,
                minDate_day
            ] = [
                Number(maxDate.split('-')[0]),
                Number(maxDate.split('-')[1]),
                Number(maxDate.split('-')[2]),

                Number(minDate.split('-')[0]),
                Number(minDate.split('-')[1]),
                Number(minDate.split('-')[2])
            ]


        for(let i = 0; i <= maxDate_year - minDate_year; i++){
            this.YMD.year.push(minDate_year+i);
        }
        for(let i = 1; i <= 12; i++){
            this.YMD.month.push(i);
        }

        let days = this.getDaysInMonth(this.YMD.year[2],this.YMD.month[2]);
        this.getDays(days,0);


        console.log(days)
    },
    // 组件挂载
    mounted(){
        this.windowWidth = window.screen.width;
        this.liHeight = Number((window.getComputedStyle(document.querySelector('li')).height).replace('px',''));
    },
    // 计算属性
    computed:{
        /*dateArr(){
            let year = [],month = [],day = [];
            for(let i = 0;i < )
        },*/

    },
    methods:{
        touchstart(e){
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;

            let eEle = e.target;
            let ulArr = e.currentTarget.querySelectorAll('ul');

            this.time = new Date().getTime();
            // this.liHeight = Number((window.getComputedStyle(ulArr[0].querySelector('li')).height).replace('px',''));

            // 根据touch点选取ul和li的个数
            this.position = this.GetPosition(this.startX,this.windowWidth);

            this.lisize = ulArr[this.position].querySelectorAll('li').length;

            // console.log(lisize*this.liHeight);

            // ulArr[this.position].style.transition='transform 0.3s ease-out';

            // console.log(e.target.parentNode.className)
            // console.log(this.startX)
        },
        touchmove(e){
            this.endX = e.touches[0].clientX;
            this.endY = e.touches[0].clientY;

            let eEle = e.target.parentNode;
            this.direction = this.GetSlideDirection(this.startX,this.startY,this.endX,this.endY);
            let offsetY = this.currY[this.isYMD()] + this.endY - this.startY ;

            let isclass = eEle.className.indexOf('picker-time-list');

            // 当只有上下滑动并且是目标ul元素的时候
            if((this.direction == 1 || this.direction == 2) && isclass!=-1){
                eEle.style.transform='translate3d(0,'+ offsetY +'px,0)';
            }

        },
        touchend(e){

            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;

            let t = new Date().getTime() - this.time;
            let d = this.endY - this.startY;

            // 取整计算需要移动的值
            let offset = this.currY[this.isYMD()] + d;
            offset = Math.round(offset / this.liHeight) * this.liHeight;

            // 偏移量大于2个li高度时候
            if(offset > this.liHeight * 2){
                offset = this.liHeight * 2;
            }
            if(offset < -this.liHeight * (this.lisize - 3)){
                offset = - this.liHeight * (this.lisize - 3);
            }

            this.currY[this.isYMD()] = offset;

            let eEle = e.target.parentNode;
            let isclass = eEle.className.indexOf('picker-time-list');

            if(isclass!=-1){
                // 判断是否是快速滑动
                /*if(t < 500  && Math.abs(d) > this.liHeight * 3){
                    if(this.direction == 1){
                        eEle.style.transform='translate3d(0,'+ - this.liHeight * (this.lisize - 3) +'px,0)';
                        return;
                    }else if(this.direction == 2){
                        eEle.style.transform='translate3d(0,'+ this.liHeight * 2 +'px,0)';
                        return;
                    }
                }*/
                eEle.style.transform='translate3d(0,'+ offset +'px,0)';

            }

            // 将下标推入index对象
            let idx = offset / this.liHeight - 2;
            this.index[this.isYMD()] = Math.abs(idx);

            console.log(this.index);

            if(this.position == 0 || this.position == 1){
                let [year,month] = [eEle.querySelectorAll('li')[this.index.year].innerHTML,eEle.querySelectorAll('li')[this.index.month].innerHTML]
                // this.YMD.day.length = 0;
                let days = this.getDaysInMonth(year.replace(/[^0-9]/ig,""),month.replace(/[^0-9]/ig,""));
                this.getDays(days,1);
                console.log(days)
            }


            
        },
        //
        getDays(d,init){
            // console.log(el);
            if(init == 0){
                for(let i = 1; i <= d; i++){
                    this.YMD.day.push(i);
                }
            }else if(init == 1){
                for(let i = 1; i <= d; i++){
                    this.YMD.day.splice(i,i);
                }
            }
        },
        // 根据年月获得当月天数
        getDaysInMonth(year,month){ 
            month = parseInt(month,10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。 
            var temp = new Date(year,month,0); 
            return temp.getDate(); 
        },
        // 判断年月日类型
        isYMD(){
            if(this.position == 0){
                return 'year';
            }else if(this.position == 1){
                return 'month';
            }else if(this.position == 2){
                return 'day';
            }
        },
        // 返回点击位置
        GetPosition(startX,windowWidth){
            let pos;
            if(startX < windowWidth/3){
                pos = 0;
            }else if(startX > windowWidth/3 && startX < windowWidth/1.5){
                pos = 1;
            }else{
                pos = 2;
            }
            return pos;
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
                font-size: .45rem;
            }
        }
        .picker-time-content{
            height: 5rem;
            width: 100%;
            overflow: hidden;
            position: relative;
            &:before{
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                height: 2rem;
                width: 90%;
                margin: 0 5%;
                border-bottom: 1px #ccc solid;
                background-image: linear-gradient(to bottom, #f1f1f1, rgba(255, 255, 255, 0));
                pointer-events:none;
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
                background-image: linear-gradient(to top, #f1f1f1, rgba(255, 255, 255, 0));
                border-top: 1px #ccc solid;
                pointer-events:none;
            }
            .picker-time-list{
                width: 33.33%;
                float: left;
                text-align: center;
                transition: all .3s ease-out;
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
