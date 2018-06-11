import React, { PropTypes } from 'react';
import { Table, Button } from 'antd';
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

class Interpretation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '序号',
      dataIndex: 'instanceId',
      key: 'instanceId',
      width: 50,
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
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        instanceId: data.instanceId,
        instanceName: data.instanceName,
        testTime: data.testTime,
      });
    });
    }
    return dataSource;
  }
  render() {
    return (
      <div>
        {/*  判读结果列表  */}
        <div className={styles.tableTitle}>
           <Button>预加载数据</Button>
        </div>
        <Table
          rowSelection={{
            onChange: () => {

            }
          }}
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.leftTable)}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

export default Interpretation;
