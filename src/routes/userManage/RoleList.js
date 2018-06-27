import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox, Tree } from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const { TextArea } = Input;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;


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
    if (datas) {
      datas.forEach((data, index) => {
        dataSource.push({
          key: index,
          no: data.roleId,
          roleName: data.roleName,
          operation: (
            <div>
              <a
                style={{ color: '#1372d8' }}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ visible: true })
                }}
              >
                编辑
            </a> | <a
                style={{ color: '#1372d8' }}
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
  renderRightTree() {
    const rightsList = this.props.rightsList;
    const treeNode = rightsList.map(rights => {
      const subRightsList = rights.children;
      const subTreeNode = subRightsList.map(right => {
        return (
          <TreeNode title={right.function} key={right.function}>
          </TreeNode> 
        )
      })
      return (
        <TreeNode title={rights.function} key={rights.function}>
          {subTreeNode}
        </TreeNode>
      )
    });
    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        {treeNode}
      </Tree>
    )
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
          <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>新增角色</Button>
        </div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.roleList)}
          pagination={false}
          bordered
        />

        {/*  角色新增或编辑  */}
        <Modal
          title="角色编辑"
          visible={this.state.visible}
          onOk={() => { }}
          onCancel={() => { this.setState({ visible: false }) }}
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
                {this.renderRightTree()}
              </Tree>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RoleList;
