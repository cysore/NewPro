import Vue from 'vue';
import testComponent from './test.vue';

// vue构造函数
const test = Vue.extend(testComponent);

// 创建组件容器
let component = new test({
    el : document.createElement('div')
});

console.log(test);

let doc = document.body;

export default {
    alert:(msg)=>{
        console.log(msg);
        component.data=msg;
        doc.appendChild(component.$el);
        setTimeout(()=>{
            doc.removeChild(component.$el)
        },2000)
    }
};
