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
    addRoleAPI: `${APIV3}/role/add`, // 新增角色 
    getRightsAPI: `${APIV3}/role/getRights`, // 查询所有权限
    roleListAPI: `${APIV3}/role/list`, // 查询所有角色信息
    userListAPI: `${APIV3}/user/list`, // 查询所有用户信息
    ipControlAPI: `${APIV3}/manager/ipControl`, // 启用/禁用判读
    managerStatusAPI: `${APIV3}/manager/status`, // 获取服务器端的状态
    updateReportAPI: `${APIV3}/report/update`, // 创建报告
    exceptionDataAPI: `${APIV3}/manual/judge/exceptionData`, // 设为野点
    checkReportAPI: `${APIV3}/report/check`, // 校对报告
    auditReportAPI: `${APIV3}/report/audit`, // 审核报告
    approveReportAPI: `${APIV3}/report/approve`, // 批准报告
    downloadReportAPI: `${APIV3}/report/download`, // 下载判读报告
    listInstanceAPI: `${APIV3}/report/listInstance`, // 通过型号查询任务下所有的报告
    listTaskAPI: `${APIV3}/report/listTask`, // 通过型号查询任务下所有的报告
    listInstanceByNameAPI: `${APIV3}/instance/listInstanceByName`, // 通过任务名查询出对应的试验
    reportResultAPI: `${APIV3}/report/reportResult`, // 用户在数据判读页面完成数据判读后点击写入报告时调用此接口
    setCurrentReportAPI: `${APIV3}/report/setCurrent`, // 设为当前报告
    listReportMineAPI: `${APIV3}/report/listReportMine`, // 查询用户报告
    reportComparisonAPI: `${APIV3}/manual/judge/reportComparison`, // 将横向比对的结果写入到报告
    crossComparisonAPI: `${APIV3}/manual/judge/crossComparison`, // 显示横向比对页面
    getTaskListAPI: `${APIV3}/base/taskList`, // 获取型号任务列表
    reportCreateAPI: `${APIV3}/report/create`, // 创建报告
    getCurrentReportAPI: `${APIV3}/report/getCurrent`, // 查询当前报告
    judgeListDataAPI: `${APIV3}/manual/judge/listData`, // 查询参数数据
    downloadFiles1API: `${APIV3}/manual/judge/downloadFiles1`, // 下载数据
    listUserParamsetByModelName: `${APIV3}/userParamset/listUserParamsetByModelName`, // 根据型号名称获取用户的自定义参数组
    userParamsetDeleteAPI: `${APIV3}/userParamset/delete`, // 删除自定义参数组
    userParamsetUpdateAPI: `${APIV3}/userParamset/updateName`, // 更新自定义参数组基本信息
    userParamsetReplaceAPI: `${APIV3}/userParamset/replace`, // 覆盖自定义参数组基本信息
    queryTasksByModelNameAPI: `${APIV3}/base/task`, // 根据型号名称获取任务信息
    setCurrTaskAPI: `${APIV3}/userConfig/setCurrTask`, // 设置用户当前任务
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
    saveJudgeResultApi: `${APIV3}/manual/judge/saveResult`, // 保存判读结果
    lineData: `${APIV3}/manual/judge/line`, // 只剩一个
    downloadChart: `${APIV3}/manual/judge/downloadFiles`,
    downloadZipUrl: `${APIHOST}/manual/judge/downloadZIP?ZIP=`, // 这里是直接请求服务器 get
    // analogData: `${APIV3}/manual/judge/analogDataObj`, // 测试
    blurQuery: `${APIV3}/instance/blurQuery`, // 模糊搜索查询
  },
}
