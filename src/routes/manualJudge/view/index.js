/**
 * Created by wyz on 2017/12/28.
 */
// 数据浏览 page   chart 图表查看页面
import { connect } from 'dva'

const ViewChartData = ({ manualJudge }) => {
  if (manualJudge.viewData.length == 0) {
    return(
      <div>暂无数据</div>
    );
  }
  return (
    <div>这里是数据查看页面</div>
  )
}

export default connect(({ manualJudge }) => ({ manualJudge }))(ViewChartData)
