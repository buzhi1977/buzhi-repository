const menuAll=[];
const menuDataAdmin = [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'HomeView.vue'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall.vue'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'User.vue'
    },
    {
        path: '',
        label: '其他',
        icon: 'location',
        children: [
            {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'PageOne.vue'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'PageTwo.vue'
            }
        ]
    }
];
const menuDataUser = [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'HomeView.vue'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall.vue'
    },
];
export default {menuAll};
export {menuDataUser};
export {menuDataAdmin};
