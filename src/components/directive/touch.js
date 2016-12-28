export default(Vue) => {
    Vue.directive('touch',{
        bind:(el,binding,vnode) => {
            let touchType = binding.arg;//传入的模式press swipeRight swipeLeft swipeTop swipeDowm Tap
            let timeOutEvent = 0;
            let direction = '';

            // 滑动处理
            let stratX,startY;

            // 返回角度
            GetSlideAngle(dx,dy) => {return Math.atan2(dy,dx) * 180 / Math.PI};

            // 根据七点和终点返回方向1：向上，2：向下，3：向左，4：向右,0：未滑动
            GetSlideDirection(startX,startY,endX,endY){

                let dy = startY - endY;
                let dx = startX - endX;
                let result = 0;

                // 如果滑动距离太短
                if(Math,abs(dx) < 2 && Math.abs(dy) < 2){
                    return result;
                }

                let angle = GetSlideAngle(dx,dy);
                if(angle >= -45 && angle < 45){
                    result = 'swiperright';
                }else if(angle >= 45 && angle < 135){
                    result = 'swiperup'
                }else if(angle >= -135 && angle < -45){
                    result = 'swiperdown';
                }else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){
                    result = 'swipreleft'
                }
                return result;

            }

            el.addEventListener('touchstart',(ev) => {
                startX = ev.touches[0].pageX;
                startY = ev.touches[0].pageY;

                // 长按判断
                timeOutEvent = setTimeout(() => {
                    timeOutEvent = 0;
                    if(touchType == 'press'){
                        binding.value();
                    }
                },500);
            },false);

            el.addEventListener('touchmove',(ev) => {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            });

            el.addEventListener('touchend',(ev) => {
                let endX,endY;
                endX = ev.changedTouches[0].pageX;
                endY = ev.changedTouches[0].pageY;

                direction = GetSlideDirection(startX,startY,endX,endY);

                clearTimeout(timeOutEvent);

                switch (direction){
                    case 0:
                        break;
                    case 'swiperup':
                        if(touchType === 'swiperup'){
                            binding.value()
                        }
                        break;
                    case 'swiperdown':
                        if(touchType === 'swiperdown'){
                            binding.value();
                        }
                        break;
                    case 'swipreleft':
                        if(touchType === 'swipreleft'){
                            binding.value();
                        }
                        break;
                    case 'swiperright':
                        if(touchType === 'swiperright'){
                            binding.value();
                        }
                        break;
                    default;
                }
            },false);

        }
    })
}
