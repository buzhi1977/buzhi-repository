export default{
    state:{
        isCollapse:false,
        tabList:[{
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        }],
        tabs:[{
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        }],
        menu:[]
    },
    mutations:{
        changeCollapse(state){
            state.isCollapse=!state.isCollapse;
        },
        selectMenu(state,val){//state是vuex的state对象，val是触发selectMenu时传过来的item
            // console.log("==========state",state)
            console.log("========val",val)
            // 判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabs.findIndex(item => item.name === val.name)
                // 如果不存在
                if (index === -1) {
                    state.tabs.push(val)
                }
            };
            console.log("===========tags===111",state.tabs)
            state.tabList=[];
            state.tabList.unshift({
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            });
            if (val.name !== 'home') {
                if(val.url.indexOf('/')!=-1){
                    state.tabList.push({label:"其他"})
                }
                state.tabList.push(val)
            }
            
        },
        closeMenu(state,item){
            const index=state.tabs.findIndex(val=>val.name==item.name);
            state.tabs.splice(index, 1)
        },
        setMenu(state,val){
            console.log("==========val",val)
            state.menu = val
            sessionStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state,router){
            //组装动态路由
            const menuArray=[];
            if (!sessionStorage.getItem('menu')) return
            const menu = JSON.parse(sessionStorage.getItem('menu'))
            state.menu = menu
            menu.forEach(item => {
                /*if(item.children){
                    item.children=item.children.map(val=>{
                        console.log("=============val",val)
                        val.component=()=>import(`../views/${val.url}`)
                        return val;
                    })
                } else {
                    item.component = () => import(`../views/${item.url}`)
                }
                menuArray.push(item)*/
                if (item.children) {
                    item.children = item.children.map(val => {
                        val.component = () => import(`../views/${val.url}`)
                        return val
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log("==========menuArray",menuArray)            
             // 路由的动态添加
             menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}