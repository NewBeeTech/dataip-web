import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input, Switch } from 'antd'

const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  selectedRowKeys,
  taskName,
  switchIsMotion,
  onSearch,
  onClickDisable,
  onClickEnable,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onSearch({ ...fields, taskName })
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const { name, address } = filter


  let btnsCom = (selectedRowKeys) => {
    if (selectedRowKeys.length > 0) {
      return (<div>
        <Button type="danger" size="large" className="margin-right" onClick={() => onClickDisable(selectedRowKeys)}>禁用</Button>
        <Button type="primary" size="large" className="margin-right" onClick={() => onClickEnable(selectedRowKeys)}>启用</Button>
        <Button size="large" className="margin-right" onClick={handleReset}>导入</Button>
        <Button size="large" className="margin-right" onClick={handleReset}>导出</Button>
      </div>)
    }
    return (<div>
      <Button size="large" className="margin-right" onClick={handleReset}>导入</Button>
      <Button size="large" className="margin-right" onClick={handleReset}>导出</Button>
    </div>)
  }

  return (
    <Row gutter={24}>
      <Col {...TwoColProps} xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          { btnsCom(selectedRowKeys) }
          <div style={{ width: 300 }}>
            {/* <Switch style={{ marginRight: 16 }} size="large" defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'Motion'} unCheckedChildren={'Motion'} />
            <Button size="large" type="ghost" onClick={onAdd}>Create</Button> */}
            <Col {...ColProps} xl={{ span: 24 }} md={{ span: 24 }}>
              {getFieldDecorator('blurStr', { initialValue: name })(
                <Search placeholder="搜索实验" size="large" onSearch={handleSubmit} />
              )}
            </Col>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
