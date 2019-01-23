export default [
    // {
    //     title: "首页",
    //     key: "/home",
    //     value: "/home",
    //     icon: "home"
    // },
    {
        title: "商品",
        key: "/products",
        value: "/products",
        icon: "appstore",
        children: [ // 子菜单列表
            {
                title: "品类管理",
                key: "/category",
                value: "/category",
                icon: "bars"
            }, {
                title: "商品管理",
                key: "/product",
                value: "/product",
                icon: "tool"
            }
        ]
    }, {
        title: "用户管理",
        key: '/user',
        value: '/user',
        icon: "user"
    }, {
        title: "权限管理",
        key: '/role',
        value: '/role',
        icon: "safety"
    }, {
        title: "图形图表",
        key: '/charts',
        value: '/charts',
        icon: "area-chart",
        children: [ // 子菜单列表
            {
                title: "柱形图",
                key: '/charts/bar',
                value: '/charts/bar',
                icon: "bar-chart"
            }, {
                title: "折线图",
                key: '/charts/line',
                value: '/charts/line',
                icon: "line-chart"
            }, {
                title: "饼图",
                key: '/charts/pie',
                value: '/charts/pie',
                icon: "pie-chart"
            }
        ]
    }
];
