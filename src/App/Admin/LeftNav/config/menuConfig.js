export const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/admin/home', // 对应的path
        icon: 'home', // 图标名称
    },
    {
        title: '商品',
        key: '/admin/products',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/admin/products/category',
                icon: 'bars'
            },
            {
                title: '商品管理',
                key: '/admin/products/product',
                icon: 'tool'
            },
        ]
    },
    
    {
        title: '用户管理',
        key: '/admin/user',
        icon: 'user'
    },
    {
        title: '权限管理',
        key: '/admin/role',
        icon: 'safety',
    },
    {
        title: '图形图表',
        key: '/admin/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: '/admin/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/admin/charts/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/admin/charts/pie',
                icon: 'pie-chart'
            },
        ]
    },
];

export function getCurKey(pathname, menu, deep=false) {
    let i=0;
    
    let result = {
        preKey: null,
        key: null
    };
    
    for(i=0; i<menu.length; i++){
        result.preKey = menu[i];
        if(deep && pathname.indexOf(result.preKey.key) === 0){
            result.key = menu[i];
            return result;    // 找到了就返回 result{preKey, key}
        }else if(!deep && result.preKey.key === pathname){
            result.key = menu[i];
            return result;    // 找到了就返回 result{preKey, key}
        }else if(menu[i].children){
            let ret = getCurKey(pathname, menu[i].children);    // ret{preKey, key}
            if(ret && ret.key){
                ret.preKey = menu[i];    // 更新 ret{preKey, key} 的 preKey
                return ret;    // 返回正确的 ret{preKey, key}
            }
        }
    }
    
    return deep?false:getCurKey(pathname, menu, true)
}
