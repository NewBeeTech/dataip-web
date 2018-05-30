/**
 * Created by wyz on 2017/12/28.
 */
// 数据浏览 page   chart 图表查看页面
import { connect } from 'dva'
import List from './List';
import styles from './styles.less';
import { Spin } from 'antd';

const ViewChartData = ({ manualJudge, loading }) => {
  const { viewData } =  manualJudge;
  if (loading.global) {
    return (
      <Spin spinning={true} />
    );
  } else if (manualJudge.viewData.length == 0) {
    return(
      <div>暂无数据 {console.log('loading',loading)}</div>
    );
  } else {
    const view = [];
    viewData.map(list => {
      console.log(list);
      view.push(
        <List key={list.tableName} analogDataKeys={list.analogDataKeys} analogDataList={list.analogDataList} />
      );
    });
    return(
      <div className={styles.lists}>{view}</div>
    );
  }
}

export default connect(({ manualJudge, loading }) => ({ manualJudge, loading }))(ViewChartData)
