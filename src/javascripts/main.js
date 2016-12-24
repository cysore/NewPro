
const libs={
    /**
    *圆弧进度条
    *@param:canvasParentEle(string:eleID) canvas外层div的ID
    *@param:canvasSelf(string:eleID) canvas的ID
    *@param:isTrueOrFalse(boolean) true为圆弧进度条，false为整园进度条
    *@param:progrColor(string) 绘制进度圆的颜色值
    *进度条的值设置在canvas的data-progress上，值区间0~100
    */
    drawCricle:function (canvasParentEle,canvasSelf,isTrueOrFalse,progrColor){

        if(!canvasParentEle && !canvasSelf && !isTrueOrFalse){
            console.error('arguments not meeting expectations');
            return
        };

        var canvasParent = document.getElementById(canvasParentEle);
        var canvas = document.getElementById(canvasSelf);
        var dataPorgress = Number(canvas.dataset.progress);
        // 字符串'%'替换处理
        if(isNaN(dataPorgress)){
            dataPorgress = Number(canvas.dataset.progress.replace('%',''));
        }

        var porgress = isTrueOrFalse ? 1.4*(dataPorgress)/100 : 2*(dataPorgress)/100;
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
            r:(canvas.width-lineWidth-2)/2// 减2控制绘制的圆弧与canvas的边界紧密贴合，防止出现canvas边界出现模糊
        }

        var ctx = canvas.getContext('2d');
            ctx.lineCap="round";
            // 绘制底圆
            ctx.beginPath();
            if(isTrueOrFalse==true){
                ctx.arc(
                    setData.x,
                    setData.y,
                    setData.r,
                    0.8*Math.PI,//开始角
                    2.2*Math.PI,//结束角
                    false//False = 顺时针，true = 逆时针。
                );//绘制圆弧进度条所需的半径总共1.5PI
            }else if(isTrueOrFalse==false){
                ctx.arc(
                    setData.x,
                    setData.y,
                    setData.r,
                    0*Math.PI,//开始角
                    2*Math.PI,//结束角
                    false//False = 顺时针，true = 逆时针。
                );//绘制圆弧进度条所需的半径总共1.5PI
            }
            ctx.strokeStyle = '#e6e6e6';
            ctx.lineWidth = isTrueOrFalse ? lineWidth : lineWidth/3;
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
            );
            ctx.strokeStyle = progrColor || '#ff9331';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.closePath();
    },

    /**
    *@param:(paramsObj)promise对象
    *返回一个promise对象,可以使用.then来处理response参数
    */
    Fetch:function (paramsObj){
        if(!paramsObj && typeof paramsObj !== 'object' && JSON.stringify(paramsObj) != '{}') return;
        return new Promise((resolve,reject) => {
            fetch(paramsObj).then((response) => {
                if(response.status == 200){
                    // console.log(response.headers.get('Content-Type'));
                    // console.log(response.headers.get('Date'));
                    // resolve(response.json());
                    resolve(response);
                }else{
                    reject(response);
                }
            }).catch((err) => {console.log(err);})
        })
    }
}

export default libs;
