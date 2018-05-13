const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '数据管理',
    icon: 'book',
  },
  /* {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  }, */
  {
    id: '21',
    mpid: '2',
    bpid: '2',
    name: '实验管理',
    route: '/trial/admin',
  },
  {
    id: '22',
    mpid: '2',
    bpid: '2',
    name: '实例导入',
    route: '/trial/import',
  },
  {
    id: '23',
    mpid: '2',
    bpid: '2',
    name: '实例导出',
    route: '/trial/export',
  },
  {
    id: '3',
    bpid: '1',
    name: '系统管理',
    icon: 'book',
  },
  {
    id: '31',
    mpid: '3',
    bpid: '3',
    name: '在线用户查看',
    route: '/system/onlineUsers',
  },
  {
    id: '32',
    mpid: '3',
    bpid: '3',
    name: '启用/禁用判读',
    route: '/system/decide',
  },
  {
    id: '33',
    mpid: '3',
    bpid: '3',
    name: '自定义用户配置',
    route: '/system/setting',
  },
  {
    id: '4',
    bpid: '1',
    name: '权限管理',
    icon: 'book',
  },
  {
    id: '41',
    bpid: '4',
    mpid: '4',
    name: '用户管理',
    icon: 'heart-o',
    route: '/authority/users',
  },
  {
    id: '42',
    bpid: '4',
    mpid: '4',
    name: '角色管理',
    icon: 'database',
    route: '/authority/roles',
  },
  {
    id: '43',
    bpid: '4',
    mpid: '4',
    name: '权限列表',
    icon: 'bars',
    route: '/authority/list',
  },
  {
    id: '5',
    bpid: '1',
    name: '数据判读',
    icon: 'book',
  },
  {
    id: '51',
    bpid: '5',
    mpid: '5',
    name: '数据浏览',
    icon: 'line-chart',
    route: '/dataDecide/dataList',
  },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: '自动判读',
    // icon: 'bar-chart',
    route: '/dataDecide/autoDecide',
  },
  {
    id: '6',
    bpid: '1',
    name: '判据管理',
    icon: 'setting',
  },
  {
    id: '61',
    bpid: '6',
    mpid: '6',
    name: '测试状态管理',
    route: '/decideCert/navigation1',
  },
  {
    id: '62',
    bpid: '6',
    mpid: '6',
    name: '判据装订',
    route: '/decideCert/navigation2',
  },
  {
    id: '7',
    bpid: '1',
    icon: 'book',
    name: '判读结果管理',
  },
  {
    id: '71',
    bpid: '7',
    mpid: '7',
    name: '判读结果统计',
    route: '/statisticsResult',
  },
  {
    id: '72',
    bpid: '7',
    mpid: '7',
    name: '必判参数统计',
    route: '/forcedResult',
  },
  {
    id: '8',
    bpid: '1',
    icon: 'book',
    name: '报告管理',
  },
  {
    id: '81',
    bpid: '8',
    mpid: '8',
    name: '报告浏览',
    route: '/report/list',
  },
  {
    id: '82',
    bpid: '8',
    mpid: '8',
    name: '我的报告',
    route: '/report/mine',
  },
  {
    id: '9',
    icon: 'book',
    name: '参数浏览',
    route: '/paramsBrowse',
  },
  {
    id: '10',
    icon: 'book',
    name: '人工判读',
    route: '/manualJudge',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
