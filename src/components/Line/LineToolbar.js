/**
 * Created by wyz on 2017/12/11.
 */
import React from 'react'
import { Button, Tooltip } from 'antd'
import styles from './line.less'

export default ({ reset, clear, queryChartData }) => { // eslint-disable-line
  const BtnProps = {
    size: 'default',
    style: { marginBottom: 5 },
  }
  return (<span className={styles.toolbarBox}>
    <Tooltip title="查看曲线">
      <Button className={styles.iconBtn} {...BtnProps} type="primary" icon="line-chart" onClick={queryChartData} />
    </Tooltip>
    <Tooltip title="还原">
      <Button className={styles.iconBtn} {...BtnProps} onClick={reset} icon="reload" />
    </Tooltip>
    <Tooltip title="清空">
      <Button className={styles.iconBtn} {...BtnProps} onClick={clear} icon="close" />
    </Tooltip>
    <Button className={styles.iconBtn} {...BtnProps} icon="setting" />
    <Button className={styles.iconBtn} {...BtnProps} icon="edit" />
  </span>)
}
