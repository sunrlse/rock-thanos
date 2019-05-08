import React from 'react';
import { Icon } from 'antd';
import Search from 'container/Search';

const dashRoutes = [
    {
        path: '/home',
        name: '主菜单',
        component: () => <h1>Home Page</h1>
    },
    {
        path: '/search',
        name: '搜索',
        component: Search
    },
    { redirect: true, path: '/', to: '/search', name: '' }
];

export default dashRoutes;