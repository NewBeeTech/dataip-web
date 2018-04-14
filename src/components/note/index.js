import {notification} from 'antd'

const note = (type = 'success', message = '操作成功', description = '') => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const warning = note.bind(this, 'warning')
export const success = note.bind(this, 'success')
export const error = note.bind(this, 'error')

export default note;
