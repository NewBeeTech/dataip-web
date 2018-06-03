import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

class CrossComparison extends Component {

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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  }

}


export default connect(({ crossComparison }) => ({ crossComparison }))(CrossComparison);
