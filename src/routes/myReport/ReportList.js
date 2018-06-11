import React, { PropTypes } from 'react';
import { Table, Input, Button, Modal, Form, Checkbox, Select, Row, Col} from 'antd';
import { push } from 'react-router-redux';
import EditReport from './EditReport';
import InputSelect from '@@/Inputselect'

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
      editVisible: false,
      editData: {
        reportName: 'XXXX报告',
      },
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
      title: '所属任务',
      dataIndex: 'taskName',
      key: 'taskName',
      width: '100px'
    }, {
      title: '所属试验',
      dataIndex: 'instanceName',
      key: 'instanceName',
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
  changeModalAction = (visible) => {
    this.setState({
      editVisible: visible
    })
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
  setReport = (e) => {
    e.preventDefault();
    console.log('设为当前报告');
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
        no: data.reportId,
        reportName: data.name,
        writer: data.author,
        createAt: data.createTime,
        proofer: data.checker,
        approver: data.auditor,
        ratifier: data.approve,
        taskName: data.taskName,
        instanceName: data.instanceName,
        operation: (
          <div>
            <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                this.downLoadReport([data.reportId]);
              }}
            >
              查看
            </a> | <a
              style={{color: '#1372d8'}}
              onClick={(e) => {
                e.preventDefault();
                // this.props.dispatch({
                //   type: 'reportBrowse/checkReportModel',
                //   payload: {
                //     reportId: data.reportId,
                //   }
                // });
              }}
            >
              编辑
            </a>
          </div>
        ),
      });
    });
    }
    return dataSource;
  }
  downLoadReport = (listReportId) => {
    this.props.dispatch({
      type: 'reportBrowse/downloadReportModel',
      payload: {
        listReportId,
      }
    })
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
    const onChangeChooseReport = (name, value) => {
        this.props.dispatch({
            type: 'reportBrowse/onChangeChooseReport',
            payload: {
                name,
                value: value.target ? value.target.value : value
            }
        });
        console.log(name);
        if (name == 'taskName') {
          this.props.dispatch({
              type: 'reportBrowse/listInstanceByNameModel',
              payload: {
              }
          });
        }
    }
    return (
      <div>
        {/*  用户列表  */}
        <div className={styles.tableTitle}>
        <Form
          className=""
          onSubmit={this.handleSearch}
        >
          <div className={styles.topSelect}>
            <div className={styles.selectItem}>
              型号：
              <InputSelect
                 disableInput
                 onChange={value=>onChangeChooseReport('modelName', value)}
                 options={this.props.reportBrowse.models}
               >
               </InputSelect>
            </div>
            <div className={styles.selectItem}>
              任务：
              <InputSelect
                 disableInput
                 onChange={value=>onChangeChooseReport('taskName', value)}
                 options={this.props.reportBrowse.tasks}
               >
               </InputSelect>
            </div>
            <div className={styles.selectItem}>
              试验：
              <InputSelect
                 disableInput
                 onChange={value=>onChangeChooseReport('instanceId', value)}
                 options={this.props.reportBrowse.instances}
                 value={this.props.reportBrowse.chooseReport.instanceId}
               >
               </InputSelect>
            </div>
          </div>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => {
                this.props.dispatch({
                  type: 'reportBrowse/searchModel',
                  payload: {
                  }
                });
              }}>查询</Button>
              <Button style={{ marginLeft: '10px' }} type="primary" onClick={() => this.downLoadReport(this.props.reportBrowse.searchData.map(item => item.reportId))}>下载报告</Button>
              <Button style={{ marginLeft: '10px' }} type="primary" onClick={(e) => this.setReport(e)}>设为当前报告</Button>
            </Col>
          </Row>
        </Form>
        </div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.reportBrowse.searchData)}
          pagination={false}
          bordered
        />
        <EditReport
          changeModalAction={(visible) => this.changeModalAction(visible)}
          visible={this.state.editVisible}
          editData={this.state.editData}
        />
      </div>
    );
  }
}

export default Form.create()(ReportList);
