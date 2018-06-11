import React, { PropTypes } from 'react';
import { Table } from 'antd';
import { push } from 'react-router-redux';

const styles = require('./styles.css')


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

class CacheList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '序号',
      dataIndex: 'instanceId',
      key: 'instanceId',
      width: 50,
    }, {
      title: '任务',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 100,
    }, {
      title: '试验名称',
      dataIndex: 'instanceName',
      key: 'instanceName',
      width: 100,
    }, {
      title: '试验时间',
      dataIndex: 'testTime',
      key: 'testTime',
      width: 100,
    }, {
      title: '缓存状态',
      dataIndex: 'status',
      key: 'status',
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
        // no: 1,
        instanceId: data.instanceId,
        taskName: data.taskName,
        instanceName: data.instanceName,
        testTime: data.testTime,
        status: data.status,
      });
    });
    }
    return dataSource;
  }
  render() {
    return (
      <div>
        {/*  角色列表  */}
        <div className={styles.tableTitle}>
           <div>缓存试验列表</div>
        </div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.instanceCacheDTOList)}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

export default CacheList;
