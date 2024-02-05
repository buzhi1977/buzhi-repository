import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{//展开合并菜单一个module，个人信息一个module
        tab
    }
})