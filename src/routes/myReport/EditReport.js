import { Table, Modal, Button, Icon, Tooltip, Input, Row, Col } from 'antd'
import styles from './styles.css';
import InputSelect from '@@/Inputselect'

export default (props) => {
  const BtnProps = {
    size: 'small',
    style: { marginRight: 5 },
  }
  const style = {
    marginBottom: 10,
    // marginTop: 10,
  }
  const btnStyle = {
    width: '90px',
    height: '90px',
  };
  function onChangeEditReport(name, value) {
      props.dispatch({
          type: 'reportBrowse/onChangeEditReport',
          payload: {
              name,
              value: value.target ? value.target.value : value
          }
      })
  }
  function editReport() {
    props.dispatch({
        type: 'reportBrowse/updateReportModel',
        payload: {
           ...props.editReport,
        }
    })
  }
  return (<div>
    <Modal
        visible={props.visible}
        title='编辑报告'
        onCancel={() => props.dispatch({
          type: 'reportBrowse/updateState',
          payload: {
            showEditReport: false,
          }
        })}
        footer={
            <div>
                <Button  onClick={() => props.dispatch({
                  type: 'reportBrowse/updateState',
                  payload: {
                    showEditReport: false,
                  }
                })}>取消</Button>
                <Button onClick={editReport} type='primary' style={{marginLeft:10}}>确定</Button>
            </div>
        }
    >
        <Row>
            {/* <Col span={2}>型号：</Col>
            <Col span={10} style={{ paddingRight: '10px'}}>
               <InputSelect
                  style={{width:'100%'}}
                  disableInput
                  onChange={value=>onChangeCreateReport('modelName', value)}
                  options={props.models} value={props.modelName}
                >
                </InputSelect>
            </Col> */}
            <Col span={3}>所属任务：</Col>
            <Col span={21}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value=>onChangeEditReport('taskName', value)}
                 options={props.tasks} value={props.taskName}
               >
               </InputSelect>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={3}>所属试验：</Col>
            <Col span={21}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value => {
                   console.log(value);
                   const values = value && value.split(',');
                   onChangeEditReport('instanceName', values[0]);
                   onChangeEditReport('instanceId', values[1]);
                 }}
                 options={props.instances.map(item => ({ ...item, value: `${item.name},${item.value}`}))}
               >
               </InputSelect>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>名称：</Col>
            <Col span={19}>
                <Input
                    onChange={value => onChangeEditReport('name', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>描述：</Col>
            <Col span={19}>
                <Input
                    type="textarea"
                    onChange={value => onChangeEditReport('description', value)}
                >
                </Input>
            </Col>
        </Row>
    </Modal>
  </div>)
}
