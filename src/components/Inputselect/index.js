import React from 'react';
import {Select} from 'antd'

const Option = Select.Option;
import './index.less'

/**å
 |- options array  ['1','1'] / [{value:'test', name: 'test'}] 两种方式，第二种方式是固定字段
 |- style
 |- value
 |- defaultValue
 |- needAll
 |- needAllName
 |- disabled
 |- needAllvalue
 |- disableInput
 |- url
 |- query = {}
 */

class InputSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastOption: [],
            selfValue: this.props.multiple ? [] : ''
        };
    }

    componentDidMount() {

    }

    onSearch = (value, e) => {

        value = value.trim();
        const {options = [], disableInput} = this.props;
        const {_options} = this.state;
        let opts = _options || options;

        if (disableInput) {
            return;
        }

        let names = opts.concat();
        if (typeof opts[0] === 'object') {
            names = opts.map(item => item.name);
        }
        //判断是否已存在
        let index = names.indexOf(value);
        if (index === -1 && value) {//如果不存在就在选项后添ota加一项
            this.setState({
                lastOption: [value]
            });
        } else {
            this.setState({
                lastOption: []
            });
        }
    };

    onChange = (e) => {
        const {
            onChange = () => {
            }, multiple, options = [], value
        } = this.props;
        const {_options} = this.state;
        let opts = _options || options;

        const {lastOption} = this.state;

        let keys = [], names = [];
        if (typeof opts[0] === 'object') {
            names = opts.map((item) => item.name).concat(lastOption);
            keys = opts.map((item) => item.value).concat(lastOption);
        } else {
            keys = names = opts.concat(lastOption);
        }

        if (multiple && e[e.length - 1] === 'selectAll') {
            if (value !== undefined && value.length === keys.length) {
                keys = [];
            }
            onChange(keys);
            return;
        }
        let index = keys.indexOf(e), name;
        if (index !== -1) {
            name = names[index];
        }

        this.setState({
            selfValue: e
        });
        if (multiple) {
            onChange(e);
        } else {
            onChange(e, name);
        }
    };

    transformOpts = (data = []) => {
        data.map((item) => {
            if (typeof item === 'string') {
                return <Option key={item} value={item}>{item}</Option>;
            } else {
                return <Option key={item.value} value={item.value}>{item.name}</Option>;
            }

        });
    };

    filterOptionByInput = (inputValue, option) => {
        /*console.log("inputValue", inputValue);
        console.log("option", option);*/
        const {props = {}} = option;
        const {title, children} = props;
        return (title || children).toLowerCase().includes(inputValue.toLowerCase());
    };

    render() {
        const {
            options = [], style = {}, value, defaultValue, disabled,

            needAll, needAllName, needAllValue, multiple, dropdownMatchSelectWidth = true, children = []
        } = this.props;
        const {lastOption, selfValue, _options} = this.state;
        let opts = _options || options;
        let mixedStyle = Object.assign({width: multiple ? 600 : 200}, style);
        let keys = [];
        let names = [];
        if (typeof opts[0] === 'object') {
            names = opts.map((item) => item.name).concat(lastOption);
            keys = opts.map((item) => item.value).concat(lastOption);
        } else {
            keys = names = opts.concat(lastOption);
        }

        if (needAll) {
            let allName = needAllName || '全部';
            if (multiple && value !== undefined) {
                allName = value.length === keys.length ? '取消全选' : '全选'
            }

            keys = [multiple ? 'selectAll' : (needAllValue || ''), ...keys];
            names = [allName, ...names]
        }
        let _children = children;
        if (children.length === undefined) {
            _children = [children]
        }
        return (
            <Select
                showSearch
                style={mixedStyle}
                onSearch={this.onSearch}
                placeholder='请选择'
                onChange={this.onChange}
                disabled={disabled}
                dropdownMatchSelectWidth={false}
                mode={multiple ? 'multiple' : 'normal'}
                defaultValue={defaultValue}
                optionFilterProp="children"
                filterOption={this.filterOptionByInput}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                value={value !== undefined ? value : selfValue}
                className={multiple ? 'multiple-select inputselect' : 'inputselect'}
            >

                {
                    [..._children, ...keys.map((key, index) => <Option title={names[index]}
                                                                       className={(multiple && needAll && index === 0) ? 'multiple-select-option' : ''}
                                                                       key={key}
                                                                       value={key}>{names[index]}</Option>)]
                }
            </Select>
        );
    }
}

export default InputSelect;
