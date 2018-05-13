import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox, Select, Row, Col} from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
  key: '1',
  reportName: 'XXXX报告',
  writer: '我是编写人',
  createAt: '2018-09-23 19:20:20',
  proofer: '郝校对',
  approver: '王审批',
  ratifier: '张批准',
}, {
  key: '2',
  reportName: 'XXXX报告',
  writer: '我是编写人',
  createAt: '2018-09-23 19:20:20',
  proofer: '郝校对',
  approver: '王审批',
  ratifier: '张批准',
}, {
  key: '3',
  reportName: 'XXXX报告',
  writer: '我是编写人',
  createAt: '2018-09-23 19:20:20',
  proofer: '郝校对',
  approver: '王审批',
  ratifier: '张批准',
}];

class ReportList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      model: '1',
      task: '1',
      test: '1',
    }
    this.columns = [{
      title: '序号',
      dataIndex: 'no',
      key: 'no',
      width: '100px'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '200px'
    }, {
      title: '报告名称',
      dataIndex: 'reportName',
      key: 'reportName',
      width: '120px'
    }, {
      title: '编写人',
      dataIndex: 'writer',
      key: 'writer',
      width: '100px'
    }, {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      width: '120px'
    }, {
      title: '校对人',
      dataIndex: 'proofer',
      key: 'proofer',
      width: '100px'
    }, {
      title: '审批人',
      dataIndex: 'approver',
      key: 'approver',
      width: '100px'
    }, {
      title: '批准人',
      dataIndex: 'ratifier',
      key: 'ratifier',
      width: '100px'
    }];
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  downLoadReport = (e) => {
    e.preventDefault();
    console.log('下载');
  }
  handleModelChange = (model) => {
    console.log(model);
    if (!('value' in this.props)) {
      this.setState({ model });
    }
  }
  handleTaskChange = (mask) => {
    console.log(mask);
    if (!('value' in this.props)) {
      this.setState({ mask });
    }
  }
  handleTestChange = (test) => {
    console.log(test);
    if (!('value' in this.props)) {
      this.setState({ test });
    }
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        no: 1,
        reportName: 'XXXX报告',
        writer: '我是编写人',
        createAt: '2018-09-23 19:20:20',
        proofer: '郝校对',
        approver: '王审批',
        ratifier: '张批准',
        operation: (
          <div>
            <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true })
              }}
            >
              查看
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              校对
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ passVisible: true })
              }}
            >
              审批
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ passVisible: true })
              }}
            >
              批准
            </a>
          </div>
        ),
      });
    });
    }
    return dataSource;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div>
        {/*  用户列表  */}
        <div className={styles.tableTitle}>
        <Form
          className=""
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="型号">
                {getFieldDecorator('model', {
                  initialValue: this.state.model,
                  onChange: (e) => this.handleModelChange(e)
                })(
                  <Select>
                    <Option value="1">XXX-1</Option>
                    <Option value="2">XXX-2</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="任务">
                {getFieldDecorator('task', {
                  initialValue: this.state.model,
                  onChange: (e) => this.handleTaskChange(e)
                })(
                  <Select>
                    <Option value="1">MASK-XXX-1</Option>
                    <Option value="2">MASK-XXX-1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="试验">
                {getFieldDecorator('test', {
                  initialValue: this.state.model,
                  onChange: (e) => this.handleTestChange(e)
                })(
                  <Select>
                    <Option value="1">TEXT-XXX-1</Option>
                    <Option value="2">TEXT-XXX-2</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={4} offset={16} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={(e) => this.downLoadReport(e)}>下载报告</Button>
            </Col>
          </Row>
        </Form>
        </div>
        <Table
          rowSelection={rowSelection}
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(data)}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

export default Form.create()(ReportList);
