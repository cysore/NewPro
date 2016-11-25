const libs={
    /*
    * 圆弧进度条
    *@params:canvas外层div的ID
    *@params:canvas的ID
    *进度条的值设置在canvas的data-porgress上，值区间0~100
    */
    drawCricle:function(canvasParentEle,canvasSelf){

        var canvasParent = document.getElementById(canvasParentEle);
        var canvas = document.getElementById(canvasSelf);
        var porgress = 1.4*(canvas.dataset.progress)/100;
        var CanvasWidth = (window.getComputedStyle(canvasParent).getPropertyValue('width')).replace(/px/g,'');
        var CanvasHeight = (window.getComputedStyle(canvasParent).getPropertyValue('height')).replace(/px/g,'');

        canvas.width = CanvasWidth*2;
        canvas.height = CanvasHeight*2;
        // canvas.style.width为canvas.width的一半用于避免绘制后出现模糊不清晰
        canvas.style.width = canvas.width/2+'px';
        canvas.style.height = canvas.height/2+'px';

        var res;// 绘制百分比所需的半径
        var lineWidth = CanvasWidth/12.5;// 绘制圆弧线宽
        var setData={
            x:canvas.width/2,
            y:canvas.height/2,
            r:(canvas.width-lineWidth)/2
        }

        var ctx = canvas.getContext('2d');
            ctx.lineCap="round";
            // 绘制底圆
            ctx.beginPath();
            ctx.arc(
                setData.x,
                setData.y,
                setData.r,
                0.8*Math.PI,//开始角
                2.2*Math.PI,//结束角
                false//False = 顺时针，true = 逆时针。
            );//绘制圆弧进度条所需的半径总共1.5PI
            ctx.strokeStyle = '#e4e4e4';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.closePath();

            if(porgress>100 || porgress==0){return}
            // 绘制进度圆
            ctx.beginPath();
            ctx.arc(
                setData.x,
                setData.y,
                setData.r,
                0.8*Math.PI,//开始角
                (0.8+porgress)*Math.PI,//结束角
                false
            )
            ctx.strokeStyle = '#ff9331';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.closePath();
    }
}

export default libs;
