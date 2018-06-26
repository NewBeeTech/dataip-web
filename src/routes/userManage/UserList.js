import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox } from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const { TextArea } = Input;
const FormItem = Form.Item;

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const roleData = [{
  no: 1,
  roleName: '角色1'
}, {
  no: 2,
  roleName: '角色2'
}, {
  no: 3,
  roleName: '角色3'
}]

class UserList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '200px'
    }, {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: '100px'
    }, {
      title: '真实姓名',
      dataIndex: 'name',
      key: 'name',
      width: '100px'
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: '100px'
    }];
    this.roleColumns = [{
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: '200px'
    }];
    this.state = {
      visible: false,
      passVisible: false,
    }
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      console.log('data: ', data);
      dataSource.push({
        key: index,
        userName: data.username,
        name: data.trueName,
        role: '',
        operation: (
          <div>
            <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true })
              }}
            >
              编辑
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              删除
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ passVisible: true })
              }}
            >
              重置密码
            </a>
          </div>
        ),
      });
    });
    }
    return dataSource;
  }
  _renderRoleSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        no: 1,
        roleName: (
          <div><Checkbox>{data.roleName}</Checkbox></div>
        )
      });
    });
    }
    return dataSource;
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        {/*  用户列表  */}
        <div className={styles.tableTitle}>
           <div>用户列表</div>
           <Button type="primary"
             onClick={() => { this.setState({ visible: true }) }}
           >新增用户</Button>
        </div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.userList)}
          pagination={false}
          bordered
        />

        {/*  用户新增或编辑  */}
        <Modal
          title="用户编辑"
          visible={this.state.visible}
          onOk={() => {}}
          onCancel={() => { this.setState({ visible: false })}}
          okText="确认"
          cancelText="取消"
          width="600"
        >
        <Form
            horizontal
            className="advanced-search-form"
          >
                <FormItem
                  label="用户名称"
                  {...formItemLayout}
                >
                  <Input
                    placeholder="真实姓名"
                  />
               </FormItem>
               <FormItem
                 label="真实姓名"
                 {...formItemLayout}
               >
                 <Input
                   placeholder="真实姓名"
                 />
              </FormItem>
              <FormItem
                label="角色列表"
                {...formItemLayout}
              >
                <Table
                  size="middle"
                  columns={this.roleColumns}
                  dataSource={this._renderRoleSource(roleData)}
                  pagination={false}
                  bordered
                />
             </FormItem>
          </Form>
        </Modal>

        {/*  密码修改 */}
        <Modal
          title="充值密码"
          visible={this.state.passVisible}
          onOk={() => {}}
          onCancel={() => { this.setState({ passVisible: false })}}
          okText="确认"
          cancelText="取消"
          width="600"
        >
        <Form
            horizontal
            className="advanced-search-form"
          >
                <FormItem
                  label="用户名称"
                  {...formItemLayout}
                >
                  1111
               </FormItem>
               <FormItem
                 label="新密码"
                 {...formItemLayout}
               >
                 <Input
                   placeholder="新密码"
                 />
              </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UserList);
