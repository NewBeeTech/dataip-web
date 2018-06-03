import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';

class CrossComparison extends Component {
  reportComparison = () => {
    this.props.dispatch({
      type: 'crossComparison/reportComparisonModel',
    });
  }
  render() {
    const {
      instance,
      crossComparison,
    } = this.props.crossComparison;
    const columns = instance && instance.map(item => ({
      title: item.name,
      dataIndex: item.id,
      key: item.id
    }));
    columns && columns.unshift({
      title: '',
      dataIndex: 'name',
      key: 'name'
    });
    const dataSource = crossComparison.map(item => {
      let list = item.list;
      let obj = {};
      list = list.map(i => {
        obj[i.id] = i.value;
      });
      return ({
        name: item.name,
        ...obj,
      });
    });
    console.warn(dataSource);
    return (
      <div style={{ background: '#fff', padding: '20px 20px' }}>
        <Button onClick={this.reportComparison} style={{ marginBottom: '10px',  }} type="primary">写入报告</Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    );
  }

}


export default connect(({ crossComparison }) => ({ crossComparison }))(CrossComparison);
