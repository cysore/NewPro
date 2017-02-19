import tool from '../../src/javascripts/main.js';
import Switch from '../../src/components/testComponents/switch';

let MyPlugin = {};

MyPlugin.install = function (Vue, options) {
	
	// 1. 添加全局方法或属性
	Vue.myGlobalMethod = function () {
		console.log(1)
	}
	// 2. 添加全局资源
	Vue.directive('my-directive', {
		bind (el, binding, vnode, oldVnode) {
			// 逻辑...
		}
	})
	// 3. 注入到组件
	Vue.mixin({
		beforeCreate: function () {
			this.$tool = tool;
		}
	})
	// 4. 添加实例方法
	Vue.prototype.$myMethod = function (options) {
		// 逻辑...
	}
}

export default MyPlugin;