/**
 * Created by wyz on 2017/12/28.
 */
// 数据浏览 page   chart 图表查看页面
import { connect } from 'dva'
import List from './List';
import styles from './styles.less';
import { Spin } from 'antd';

// const ViewChartData = ({ manualJudge, loading }) => {
//   const { viewData, loadViewData } =  manualJudge;
//   if (!loadViewData) {
//     return (
//       <Spin spinning={true} />
//     );
//   } else if (manualJudge.viewData.length == 0) {
//     return(
//       <div>暂无数据 {console.log('loading',loading)}</div>
//     );
//   } else {
//     const view = [];
//     viewData.map(list => {
//       console.log(list);
//       view.push(
//         <List key={list.tableName} analogDataKeys={list.analogDataKeys} analogDataList={list.analogDataList} />
//       );
//     });
//     return(
//       <div className={styles.lists}>{view}</div>
//     );
//   }
// }
//

class ViewChartData  extends React.PureComponent {
  state = {
    viewData: [],
  };
  componentWillMount() {
    console.warn(new Date());
  }
  componentDidMount() {
    console.warn(new Date());
  }
  render() {
    const { loadViewData } =  this.props.manualJudge;
      if (!loadViewData) {
        return (
          <Spin spinning={true} />
        );
      } else {
        const viewDataStr = window.localStorage.getItem('viewData');
        if (!viewDataStr) {
          return(
            <div>暂无数据</div>
          );
        } else {
          let viewData = window.localStorage.getItem('viewData');
          console.log(new Date());
          viewData = window.viewData || [];
          // viewData = viewData && JSON.parse(viewData);
          console.log(new Date());
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
  }
}


export default connect(({ manualJudge, loading }) => ({ manualJudge, loading }))(ViewChartData)
