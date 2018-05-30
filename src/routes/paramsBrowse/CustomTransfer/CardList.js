/**
 * Created by wyz on 2017/12/31.
 */
import React from 'react'
import { Card } from 'antd'
import styles from './style.less'

const CardList = ({ list, title, rowKey, onSelectChange, selectedKeys, height }) => { // eslint-disable-line
  const ItemCls = item => (selectedKeys.indexOf(item[rowKey]) > -1 ? styles.itemActive : '')
  // style={{ width: 300 }}
  return (<Card
    title={title}
    bodyStyle={{ padding: '8px 0', height: height || 350 }}
    extra={<span>{list.length}</span>}
  >
    <ul className="ant-transfer-list-content">
      {
        list.map(item => (<li
          className={`ant-transfer-list-content-item ${ItemCls(item)}`}
          key={item[rowKey]}
          onClick={() => { onSelectChange(item[rowKey]) }}
        >
          <div className={styles.box}>
            <div className={styles.boxItem}>{item.paramName}</div>
            <div className={styles.boxItem}>{item.paramCode}</div>
          </div>
        </li>))
      }
    </ul>
  </Card>)
}

export default CardList
