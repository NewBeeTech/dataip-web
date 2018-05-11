export const APIV1 = '/api/v1'
export const APIV2 = '/api/v2'
export const APIV3 = '/api/ispace'
//const APIV3 = ''
export const APIHOST = 'http://47.104.163.55:8081'

module.exports = {
  name: 'i-space',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    listUserParamsetByModelName: `${APIV3}/userParamset/listUserParamsetByModelName`, // 根据型号名称获取用户的自定义参数组
    userParamsetDeleteAPI: `${APIV3}/userParamset/delete`, // 根据型号名称获取用户的自定义参数组
    userLogin: `${APIV3}/login`,
    userLogout: `${APIV3}/logout`,
    instanceIndex: `${APIV3}/instance/index`, // 获取任务树列表
    instanceUpdate: `${APIV3}/instance/update`, // 更新实验
    instanceDelete: `${APIV3}/instance/delete`, // 删除实验
    flyTime: `${APIV3}/instance/updateFlyTime`, // 实验 时标修订
    instanceActive: `${APIV3}/instance/active`, // 启用实验
    instanceBan: `${APIV3}/instance/ban`, // 禁止实验
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    listInstanceByName: `${APIV3}/instance/listInstanceByName`, // 根据任务获取试验列表
    judgeIndex: `${APIV3}/manual/judge/index`, // 参数浏览首页数据
    listInstance: `${APIV3}/instance/listInstance`, // 查询所有试验
    paramTree: `${APIV3}/manual/judge/tree/instanceId`, // 查询tree
    paramsetName: `${APIV3}/manual/judge/tree/paramsetName`, // 查询paramsetName
    startJudge: `${APIV3}/manual/judge/startJudge`, // 启动判读
    saveJudgeResultApi: `${APIV3}/manual/judge/ipResult`, // 保存判读结果
    lineData: `${APIV3}/manual/judge/line`, // 只剩一个
    downloadChart: `${APIV3}/manual/judge/downloadFiles`,
    downloadZipUrl: `${APIHOST}/manual/judge/downloadZIP?ZIP=`, // 这里是直接请求服务器 get
    // analogData: `${APIV3}/manual/judge/analogDataObj`, // 测试
    blurQuery: `${APIV3}/instance/blurQuery`, // 模糊搜索查询
  },
}
