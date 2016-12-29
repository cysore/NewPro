import Vue from 'vue';
import testComponent from './test.vue';

// vue构造函数
const test = Vue.extend(testComponent);

// 创建组件容器
let component = new test({
    el : document.createElement('div')
});

let doc = document.body;

export default {
    alert:(params) => {

        component.isshow = false;
        component.type = 'alert';

        for(let k in params){
            component[k] = params[k];
        }
        doc.appendChild(component.$el);
    },
    toast:(params) => {

        component.isshow = false;
        component.type = 'toast';
        for(let k in params){
            component[k] = params[k];
        }

        doc.appendChild(component.$el);

        setTimeout(()=>{
            component.isshow = true;
        },2000)
    },
    confirm:(params) => {

        component.isshow = false;
        component.type = 'confirm';
        component.ipt = null;

        for(let k in params){
            component[k] = params[k];
        }
        doc.appendChild(component.$el);
    }
};
