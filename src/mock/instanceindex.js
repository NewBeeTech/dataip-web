module.exports = {
  [`POST /api/ispace/instance/index`](req, res) {
    res.status(200).json({
      result: "0",
      data: {
        listTask: { X1: ["X1-Y1", "X1-Y2"], X2: ["X2-Y1", "X2-Y2"], X3: [] },
        listItemName: ["name_1", "name_2"],
        listItemPhase: ["phase_1", "phase_2"]
      }
    });
  },
  "GET /api/ispace/instance/model": {
    result: "0",
    data: {
      listModel: ["X1 ", "x2"]
    }
  },
  "/api/ispace/instance/listInstance": {
    result: "0",
    data: [
      {
        instanceId: 201,
        instanceName: "test_instanceName",
        testTime: "2017-11-16 17:21:45",
        manager: "201_manager1",
        place: "201_place",
        testItem: "item_name_test1",
        testPhase: "phase_1",
        flyTime: 0,
        taskName: "XS-M-Y1",
        modelName: "XS-M",
        deleteFlag: 0,
        listInstanceId: null
      },
      {
        instanceId: 202,
        instanceName: "2017-08-12 13:52:02",
        testTime: "2017-11-16 16:16:00",
        manager: "4",
        place: "place_jzp1",
        testItem: "item_name_test1",
        testPhase: "phase_1",
        flyTime: 1,
        taskName: "XS-M-Y1",
        modelName: "XS-M",
        deleteFlag: 0,
        listInstanceId: null
      }
    ]
  }
};
