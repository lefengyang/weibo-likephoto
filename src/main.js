// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import api from './api'

Vue.config.productionTip = false

import VueLazyLoad from 'vue-lazyload'

//懒加载的默认图片 
import def_lazy_img from '../static/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: def_lazy_img
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created: () => {
    //读取gsid
	var cql = 'select * from gsid limit 1';
	AV.Query.doCloudQuery(cql).then(data => {
		var results = data.results;
		for(var i in results){
			var gsid = results[i]['attributes']['gsidstr'];
			console.log('gsid:',gsid);
			api.setGsid(gsid);
		}
	});
  }
})
