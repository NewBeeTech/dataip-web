import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox, Tree } from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const { TextArea } = Input;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

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

class RoleList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '序号',
      dataIndex: 'no',
      key: 'no',
      width: 100,
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 200,
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 100,
    }];
    this.state = {
      visible: false,
    }
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        no: 1,
        roleName: '角色1',
        operation: (
          <div>
            <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
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
            </a>
          </div>
        ),
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
        {/*  角色列表  */}
        <div className={styles.tableTitle}>
           <div>角色列表</div>
           <Button type="primary">新增角色</Button>
        </div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(data)}
          pagination={false}
          bordered
        />

        {/*  角色新增或编辑  */}
        <Modal
          title="角色编辑"
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
                  label="角色名称"
                  {...formItemLayout}
                >
                  <Input
                    placeholder="角色名称"
                  />
               </FormItem>
               <FormItem
                 label="权限列表"
                 {...formItemLayout}
               >
                 <Tree
                    checkable
                    defaultExpandedKeys={['0-0-0', '0-0-1']}
                    defaultSelectedKeys={['0-0-0', '0-0-1']}
                    defaultCheckedKeys={['0-0-0', '0-0-1']}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                  >
                    <TreeNode title="parent 1" key="0-0">
                      <TreeNode title="parent 1-0" key="0-0-0">
                        <TreeNode title="leaf" key="0-0-0-0" />
                        <TreeNode title="leaf" key="0-0-0-1" />
                      </TreeNode>
                      <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                      </TreeNode>
                    </TreeNode>
                  </Tree>
                </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RoleList;
