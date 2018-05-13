import React, { PropTypes } from 'react';
import {  Input, Button, Modal, Form, Checkbox, Tree } from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const FormItem = Form.Item;
const TextArea  = Input;
const TreeNode = Tree.TreeNode;

class EditReport extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: '1',
      task: '1',
      test: '1',
      name: '1',
      desc: '描述',
      editData: {
        reportName: 'XXXX报告',
      },
    }
    this.columns = [{
      key: '0',
      label: '数据判断',
      children: [{
        key: '0-0',
        label: '人工判断',
      }, {
        key: '0-1',
        label: '自动判断',
      }]
    }, {
      key: '1',
      label: '判断结果管理',
      children: [{
        key: '1-0',
        label: '判断状态管理',
      }, {
        key: '1-1',
        label: '判据装订',
      }]
    }, {
      key: '2',
      label: '报告管理',
      children: [{
        key: '2-0',
        label: '报告浏览',
      }, {
        key: '2-1',
        label: '我的报告',
      }]
    }, {
      key: '3',
      label: '数据管理',
      children: [{
        key: '3-0',
        label: '试验管理',
      }, {
        key: '3-1',
        label: '实例导入',
      }, {
        key: '3-2',
        label: '实例导出',
      }]
    }, {
      key: '4',
      label: '系统管理',
      children: [{
        key: '4-0',
        label: '在线用户查看',
      }, {
        key: '4-1',
        label: '启用/禁用判读',
      }, {
        key: '4-2',
        label: '自定义用户配置',
      }]
    }, {
      key: '5',
      label: '权限管理',
      children: [{
        key: '5-0',
        label: '用户管理',
      }, {
        key: '5-1',
        label: '权限装订',
      }]
    }]
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  renderTree = (list) => {
    return list.map((item) => {
      return (
        <TreeNode title={item.label} key={item.key}>
          {item.children && this.renderTree(item.children)}
        </TreeNode>
      )
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        {/*  用户列表  */}
        <Modal
          title="编辑报告信息"
          visible={this.props.visible}
          onOk={() => {}}
          onCancel={() => { this.props.changeModalAction(false)}}
          okText="确认"
          cancelText="取消"
          width={700}
        >
          <div className={styles.editModal}>
            <div className={styles.editForm}>
              <Form
                onSubmit={this.handleSearch}
              >
                <FormItem { ...formItemLayout} label="所属任务">
                  {getFieldDecorator('task', {
                    initialValue: this.state.task,
                  })(
                    <span>{this.state.task}</span>
                  )}
                </FormItem>
                <FormItem { ...formItemLayout} label="所属试验">
                  {getFieldDecorator('test', {
                    initialValue: this.state.test,
                  })(
                    <span>{this.state.test}</span>
                  )}
                </FormItem>
                <FormItem { ...formItemLayout} label="名称">
                  {getFieldDecorator('name', {
                    initialValue: this.state.editData.reportName,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem { ...formItemLayout} label="描述">
                  {getFieldDecorator('desc', {
                    initialValue: this.state.desc,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
              </Form>
            </div>
            <div className={styles.editTree}>
              <Tree
                checkable
                // defaultExpandedKeys={['0-0-0', '0-0-1']}
                // defaultSelectedKeys={['0-0-0', '0-0-1']}
                // defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
              >
                {this.renderTree(this.columns)}
              </Tree>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


EditReport.EditReport = {
  changeModalAction: PropTypes.func,
  visible: PropTypes.bool,
  editData: PropTypes.object,
  form: PropTypes.object,
}

export default Form.create()(EditReport);
