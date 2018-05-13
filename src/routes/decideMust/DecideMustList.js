import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox, Select, Row, Col} from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
  key: '1',
  no: 1,
  username: '用户1',
  decideParam: 100,
  decidedParam: 60,
  toDecided: '正常',
  normal: 20,
  abnormal: 60,
}, {
  key: '2',
  no: 2,
  username: '用户1',
  decideParam: 100,
  decidedParam: 60,
  toDecided: '正常',
  normal: 20,
  abnormal: 60,
}, {
  key: '3',
  no: 3,
  username: '用户1',
  decideParam: 100,
  decidedParam: 60,
  toDecided: '正常',
  normal: 20,
  abnormal: 60,
}];
class DecideMustList extends React.Component {
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
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      width: '200px'
    }, {
      title: '应判参数',
      dataIndex: 'decideParam',
      key: 'decideParam',
      width: '120px'
    }, {
      title: '已判参数',
      dataIndex: 'decided',
      key: 'decided',
      width: '100px'
    }, {
      title: '未判参数',
      dataIndex: 'todecide',
      key: 'todecide',
      width: '120px'
    }, {
      title: '正常个数',
      dataIndex: 'normal',
      key: 'normal',
      width: '100px'
    }, {
      title: '异常个数',
      dataIndex: 'abnormal',
      key: 'abnormal',
      width: '100px'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
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
        username: '用户1',
        decideParam: 100,
        decidedParam: 60,
        toDecided: '正常',
        normal: 20,
        abnormal: 60,
        operation: (
          <div>
            <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true })
              }}
            >
              详情
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
        用户必判统计信息：
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

export default Form.create()(DecideMustList);
