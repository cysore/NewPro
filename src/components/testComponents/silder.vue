<template lang="html">
    <section class="silderbox">
        <div class="silderbox-img"
        v-on:touchstart.stop.prevent="touchstart($event)"
        v-on:touchmove.stop.prevent="touchmove($event)"
        v-on:touchend.stop.prevent="touchend($event)">
            <a>
                <img src="../../images/top_banner.png" alt="">
            </a>
            <a>
                <img src="../../images/top_banner.png" alt="">
            </a>
            <a>
                <img src="../../images/top_banner.png" alt="">
            </a>
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

export default {
    name:'silderbox',
    data(){
        return {
            msg:'silder'
        }
    },
    mounted(){

    },
    created(){

    },
    methods:{
        touchstart(e){
            console.log(e);
        },
        touchmove(e){
            console.log(e);
        },
        touchend(e){
            console.log(e);
        },
    }
}
</script>

<style lang="less">
.silderbox{
    border: 1px red solid;
    width: 100%;
    height: 4rem;
    overflow: hidden;
    .silderbox-img{
        height: 4rem;
        position: relative;
        >a{
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 4rem;
            img{
                width: 100%;
                height: 4rem;
            }
        }
    }
}
</style>
