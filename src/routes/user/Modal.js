import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Select } from 'antd'

const FormItem = Form.Item
const SelectOption = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
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
        instanceId: item.instanceId,
        testTime: item.testTime,
      }
      // data.testTime = data.testTime.format('YYYY-MM-DD HH:mm:ss')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="实验名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('instanceName', {
            initialValue: item.instanceName,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '实验名称不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="实验时间" hasFeedback {...formItemLayout}>
          {item.testTime}
        </FormItem>
        <FormItem label="负责人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('manager', {
            initialValue: item.manager,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '负责人不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="测试地点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('place', {
            initialValue: item.place,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '测试地点不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="测试项目" hasFeedback {...formItemLayout}>
          {getFieldDecorator('testItem', {
            initialValue: item.testItem,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '测试项目不能为空',
              },
            ],
          })(<Select
            size="large"
            style={{ width: '100%' }}
            placeholder="选择测试项目"
          >
            <SelectOption value="托尔斯泰">托尔斯泰</SelectOption>
            <SelectOption value="飞天计划">飞天计划</SelectOption>
          </Select>)}
        </FormItem>
        <FormItem label="测试阶段" hasFeedback {...formItemLayout}>
          {getFieldDecorator('testPhase', {
            initialValue: item.testPhase,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '测试阶段不能为空',
              },
            ],
          })(<Select
            size="large"
            style={{ width: '100%' }}
            placeholder="选择测试阶段"
          >
            <SelectOption value="测试阶段">测试阶段</SelectOption>
            <SelectOption value="实验阶段">实验阶段</SelectOption>
          </Select>)}
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
