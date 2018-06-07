/**
 * Created by wyz on 2017/12/11.
 */
import React from 'react'
import { Button, Tooltip } from 'antd'
import styles from './line.less'

export default ({ reset, clear, report, queryChartData, viewData, saveImg }) => { // eslint-disable-line
  const BtnProps = {
    size: 'default',
    style: { marginBottom: 5 },
  }
  return (<span className={styles.toolbarBox}>
    <Tooltip placement="leftTop" title="查看曲线">
      <Button className={styles.iconBtn} {...BtnProps} type="primary" icon="line-chart" onClick={queryChartData} />
    </Tooltip>
    <Tooltip placement="leftTop" title="还原">
      <Button className={styles.iconBtn} {...BtnProps} onClick={reset} icon="reload" />
    </Tooltip>
    <Tooltip placement="leftTop" title="清空">
      <Button className={styles.iconBtn} {...BtnProps} onClick={clear} icon="close" />
    </Tooltip>
    <Button className={styles.iconBtn} {...BtnProps} icon="setting" />
    <Tooltip placement="leftTop" title="写入报告">
      <Button onClick={report} className={styles.iconBtn} {...BtnProps} icon="edit" />
    </Tooltip>
    <Tooltip placement="leftTop" title="保存图片">
      <Button onClick={saveImg} className={styles.iconBtn} {...BtnProps} icon="picture" />
    </Tooltip>
    <Tooltip placement="leftTop" title="查看数据">
      <Button className={styles.iconBtn} {...BtnProps} icon="copy" onClick={viewData} />
    </Tooltip>
  </span>)
}
