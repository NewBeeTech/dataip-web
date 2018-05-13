const qs = require("qs");
const Mock = require("mockjs");
const config = require("../utils/config");

const { apiPrefix, api } = config;
const { users, flyTime, listInstance } = api;

let usersListData = Mock.mock({
  "data|80-100": [
    {
      id: "@id",
      name: "@name",
      nickName: "@last",
      phone: /^1[34578]\d{9}$/,
      "age|11-99": 1,
      address: "@county(true)",
      isMale: "@boolean",
      email: "@email",
      createTime: "@datetime",
      avatar() {
        return Mock.Random.image(
          "100x100",
          Mock.Random.color(),
          "#757575",
          "png",
          this.nickName.substr(0, 1)
        );
      }
    }
  ]
});

// 实验管理
let testListData = Mock.mock({
  "data|80-100": [
    {
      id: "@id",
      instanceId: "@id",
      name: "@name",
      instanceName: "test_instanceName",
      testTime: Mock.Random.date("yyyy-MM-dd HH:mm:ss"),
      manager: Mock.Random.cname(),
      place: "@city",
      testItem: "@last",
      testPhase: "phase_1",
      flyTime: 1512012782637,
      taskName: "@region",
      modelName: "XS-M",
      deleteFlag: 0,
      listInstanceId: 123
    }
  ]
});

let database = testListData.data;

const EnumRoleType = {
  ADMIN: "admin",
  DEFAULT: "guest",
  DEVELOPER: "developer"
};

const userPermission = {
  DEFAULT: {
    visit: ["1", "2", "21", "7", "5", "51", "52", "53"],
    role: EnumRoleType.DEFAULT
  },
  ADMIN: {
    role: EnumRoleType.ADMIN
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER
  }
};

const adminUsers = [
  {
    id: 0,
    username: "admin",
    password: "admin",
    permissions: userPermission.ADMIN
  },
  {
    id: 1,
    username: "guest",
    password: "guest",
    permissions: userPermission.DEFAULT
  },
  {
    id: 2,
    username: "吴彦祖",
    password: "123456",
    permissions: userPermission.DEVELOPER
  }
];

const queryArray = (array, key, keyAlias = "key") => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }

  if (data) {
    return data;
  }
  return null;
};

const NOTFOUND = {
  message: "Not Found",
  documentation_url: "http://localhost:8000/request"
};

module.exports = {
  [`POST ${apiPrefix}/user/login`](req, res) {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);

    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie(
        "token",
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true
        }
      );
      res.json({ success: true, message: "Ok" });
    } else {
      res.status(400).end();
    }
  },

  [`GET ${apiPrefix}/user/logout`](req, res) {
    res.clearCookie("token");
    res.status(200).end();
  },

  [`GET ${apiPrefix}/user`](req, res) {
    const cookie = req.headers.cookie || "";
    const cookies = qs.parse(cookie.replace(/\s/g, ""), { delimiter: ";" });
    const response = {};
    const user = {};
    if (!cookies.token) {
      res.status(200).send({ message: "Not Login" });
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id);
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions;
        user.username = userItem[0].username;
        user.id = userItem[0].id;
      }
    }
    response.user = user;
    res.json(response);
  },

  [`GET ${listInstance}`](req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;

    let newData = database;
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === "address") {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            );
          }
          return true;
        });
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length
    });
  },

  [`DELETE ${apiPrefix}/users`](req, res) {
    const { ids } = req.body;
    database = database.filter(item => !ids.some(_ => _ === item.id));
    res.status(204).end();
  },

  [`POST ${apiPrefix}/user`](req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock("@now");
    newData.avatar =
      newData.avatar ||
      Mock.Random.image(
        "100x100",
        Mock.Random.color(),
        "#757575",
        "png",
        newData.nickName.substr(0, 1)
      );
    newData.id = Mock.mock("@id");

    database.unshift(newData);

    res.status(200).end();
  },

  [`GET ${apiPrefix}/user/:id`](req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, "id");
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json(NOTFOUND);
    }
  },

  [`DELETE ${apiPrefix}/user/:id`](req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, "id");
    if (data) {
      database = database.filter(item => item.id !== id);
      res.status(204).end();
    } else {
      res.status(404).json(NOTFOUND);
    }
  },

  [`PATCH ${apiPrefix}/user/:id`](req, res) {
    const { id } = req.params;
    const editItem = req.body;
    let isExist = false;

    database = database.map(item => {
      if (item.id === id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      return item;
    });

    if (isExist) {
      res.status(201).end();
    } else {
      res.status(404).json(NOTFOUND);
    }
  },

  "POST /api/ispace/login": {
    result: "0",
    data: {
      roles: [
        {
          id: 51,
          name: "数据判读",
          roleList: [
            {
              id: 52,
              name: "人工判读",
              url: "/paramsBrowse",
              tabs: [
                { id: 54, name: "参数浏览", url: "/paramsBrowse" },
                { id: 55, name: "参数判读", url: "/manualJudge" },
                { id: 56, name: "数据浏览", url: "/dataBrowse" }
              ]
            },
            {
              id: 53,
              name: "自动判读",
              url: "/autoIp",
              tabs: [{ id: 57, name: "自动判读", url: "/autoIp" }]
            }
          ]
        },
        {
          id: 71,
          name: "判据管理",
          roleList: [
            { id: 72, name: "测试状态管理", url: null, tabs: [] },
            { id: 73, name: "判据装订", url: null, tabs: [] }
          ]
        },
        {
          id: 91,
          name: "判读结果管理",
          roleList: [
            { id: 92, name: "判读结果统计", url: "/decideResult/decide", tabs: [] },
            { id: 93, name: "必判参数统计", url: "/decideResult/must", tabs: [] }
          ]
        },
        {
          id: 111,
          name: "报告管理",
          roleList: [
            { id: 112, name: "报告浏览", url: "/report/list", tabs: [] },
            { id: 113, name: "我的报告", url: "/report/mine", tabs: [] }
          ]
        },
        {
          id: 131,
          name: "数据管理",
          roleList: [
            {
              id: 132,
              name: "试验管理",
              url: "/trial/admin",
              tabs: [
                { id: 133, name: "实例导入", url: null },
                { id: 134, name: "实例导出", url: null }
              ]
            }
          ]
        },
        {
          id: 151,
          name: "系统管理",
          roleList: [
            { id: 152, name: "用户管理", url: null, tabs: [] },
            { id: 153, name: "修改密码", url: null, tabs: [] },
            { id: 154, name: "自定义用户配置", url: null, tabs: [] }
          ]
        }
      ],
      token: "4297F44B13955235245B2497399D7A93"
    }
  },

  "POST /api/ispace/logout": {},

  "GET /api/ispace/userConfig/setCurrTask": {
    result: "0",
    data: {
      currModelName: "X1"
    }
  }
};
