module.exports = {
  [`POST /api/ispace/manual/judge/index`](req, res) {
    res
      .status(200)
      .json({
        result: "0",
        data: {
          listDeviceParamset: [
            { device: "外安综测仪", paramsetName: ["外安综测仪软件控制指令"] },
            {
              device: "数据处理软件",
              paramsetName: ["数据处理软件状态参数", "数据处理软件控制指令"]
            },
            { device: "数据存储软件", paramsetName: ["数据存储软件控制指令"] },
            { device: "遥测检测站", paramsetName: ["遥测检测站控制指令"] },
            { device: "振动传感器", paramsetName: ["fast2"] },
            {
              device: "综控机",
              paramsetName: [
                "飞控软件数据烧写控制响应",
                "飞控软件数据上传结果",
                "飞控软件数据下传结果",
                "飞控软件数据校验结果",
                "飞控机自检结果",
                "惯组误差装订结果",
                "惯组数据测量结果",
                "陀螺误差装订结果",
                "陀螺数据测量结果",
                "伺服零位装订结果",
                "伺服测量结果",
                "GPS数据查询结果",
                "飞控软件状态查询结果",
                "诸元数据控制结果",
                "诸元数据装订结果",
                "诸元数据下传结果",
                "电池电量初始化结果",
                "电池电量获取结果",
                "惯组水平计算结果",
                "惯组转导航结果"
              ]
            },
            {
              device: "前端测发控软件",
              paramsetName: ["前端测发控软件状态参数"]
            },
            { device: "主控计算机", paramsetName: ["地面测发控指令"] },
            { device: "供电控制单元", paramsetName: ["供电控制单元控制指令"] },
            { device: "遥测振动传感器", paramsetName: ["fast1"] },
            {
              device: "遥测数据",
              paramsetName: [
                "yc_slow11",
                "yc_slow12",
                "yc_slow13",
                "yc_slow14",
                "yc_slow15",
                "yc_slow16",
                "yc_slow17",
                "yc_slow18",
                "yc_slow19",
                "yc_slow20"
              ]
            }
          ],
          listInstance: [
            {
              instanceId: 370,
              instanceName: "2018-03-30 15:47:42",
              testTime: "2018-03-30 15:47:42",
              manager: null,
              place: null,
              testItem: null,
              testPhase: null,
              flyTime: null,
              taskName: null,
              modelName: null,
              deleteFlag: 0,
              blurStr: null,
              listInstanceId: null
            },
            {
              instanceId: 371,
              instanceName: "2018-03-30 16:01:02",
              testTime: "2018-03-30 16:01:02",
              manager: null,
              place: null,
              testItem: null,
              testPhase: null,
              flyTime: null,
              taskName: null,
              modelName: null,
              deleteFlag: 0,
              blurStr: null,
              listInstanceId: null
            }
          ],
          currModelName: "X1",
          listUserParamSetName: [
            "自定义参数组3",
            "自定义参数组2",
            "自定义参数组1",
            "自定义参数组4"
          ]
        }
      });
  },
  "GET /api/ispace/instance/model": {
    result: "0",
    data: {
      listModel: ["X1 ", "x2"]
    }
  },
  "POST /api/ispace/manual/judge/tree/paramsetName": {
    result: "0",
    data: {
      listParamSelectDTO: [
        {
          device: "外安综测仪",
          paramsetName: "外安综测仪软件控制指令",
          paramCode: "进入飞控烧写状态",
          paramName: "进入飞控烧写状态"
        },
        {
          device: "外安综测仪",
          paramsetName: "外安综测仪软件控制指令",
          paramCode: "退出飞控烧写状态",
          paramName: "退出飞控烧写状态"
        }
      ]
    }
  },
  "POST /api/ispace/manual/judge/tree/UserParamsetName": {}
};
