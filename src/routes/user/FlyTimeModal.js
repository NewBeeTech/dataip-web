import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      const { flyTime } = data
      onOk({
        instanceId: item.instanceId,
        flyTime,
      })
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="起飞时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('flyTime', {
            initialValue: item.flyTime,
            rules: [
              {
                required: true,
                message: '起飞时间不能为空',
              },
            ],
          })(<Input type="number" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
