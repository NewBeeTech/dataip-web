/**
 * Created by wyz on 2017/12/6.
 */
import { request, config } from 'utils'

const { api } = config
const { startJudge, saveJudgeResultApi,
  judgeListDataAPI,
  lineData,
  downloadChart,
} = api


export async function queryParamsetName (params) {
  return request({
    url: paramsetName,
    method: 'post',
    data: params,
  })
}

export async function queryStartJudge (params) {
  return request({
    url: startJudge,
    method: 'post',
    data: params,
  })
}


export async function saveJudgeResult (params) {
  return request({
    url: saveJudgeResultApi,
    method: 'post',
    data: params,
  })
}

// 获取chart 图表的数据
export async function queryChartLine (params) {
  return request({
    url: lineData,
    method: 'post',
    data: params,
  })
}

export async function download (params) {
  return request({
    url: downloadChart,
    method: 'post',
    data: params,
  })
}
// end chart

/**
 * 查询参数数据
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function judgeListDataService(params) {
  return request({
    url: judgeListDataAPI,
    method: 'post',
    data: params,
  });
}
