import tool from '../../src/javascripts/main.js';

export default {
	install(Vue,options = {}){
		console.log(this)
		Vue.$myGlobalMethod=function(){
			console.log('myGlobalMethod');
		}
	}
}