export default [
    {
        title: "首页",
        key: "/admin/home",
        value: "/admin/home",
        icon: "home"
    }, {
        title: "商品",
        key: "/admin/products",
        value: "/admin/products",
        icon: "appstore",
        children: [ // 子菜单列表
            {
                title: "品类管理",
                key: "/admin/products/category",
                value: "/admin/products/category",
                icon: "bars"
            }, {
                title: "商品管理",
                key: "/admin/products/product",
                value: "/admin/products/product",
                icon: "tool"
            }
        ]
    }, {
        title: "用户管理",
        key: '/admin/user',
        value: '/admin/user',
        icon: "user"
    }, {
        title: "权限管理",
        key: '/admin/role',
        value: '/admin/role',
        icon: "safety"
    }, {
        title: "图形图表",
        key: '/admin/charts',
        value: '/admin/charts',
        icon: "area-chart",
        children: [ // 子菜单列表
            {
                title: "柱形图",
                key: '/admin/charts/bar',
                value: '/admin/charts/bar',
                icon: "bar-chart"
            }, {
                title: "折线图",
                key: '/admin/charts/line',
                value: '/admin/charts/line',
                icon: "line-chart"
            }, {
                title: "饼图",
                key: '/admin/charts/pie',
                value: '/admin/charts/pie',
                icon: "pie-chart"
            }
        ]
    }
];
