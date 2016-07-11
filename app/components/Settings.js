import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Settings.css';

var PROTOCOLS = ['http', 'https', 'socks']

var trim = function() {
    var TRIM_RE = /^\s+|\s+$/g
    return function trim(string) {
        return string.replace(TRIM_RE, '')
    }
}()

function $c(staticClassName, conditionalClassNames) {
    var classNames = []
    if (typeof conditionalClassNames == 'undefined') {
        conditionalClassNames = staticClassName
    }
    else {
        classNames.push(staticClassName)
    }
    for (var className in conditionalClassNames) {
        if (!!conditionalClassNames[className]) {
            classNames.push(className)
        }
    }
    return classNames.join(' ')
}

export default class Settings extends Component {
    static propTypes = {
        proxy: PropTypes.string.isRequired,
        proxyProtocol: PropTypes.string.isRequired,
        proxyPort: PropTypes.number.isRequired
    }

    static defaultProps = {
        proxy: "",
        proxyProtocol: "http",
        proxyPort: 80
    }

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
        }
    }

    componentDidMount() {
        this.refs.proxy.value = this.props.proxy;
        this.refs.proxyProtocol.value = this.props.proxyProtocol;
        this.refs.proxyPort.value = this.props.proxyPort;
    }

    getFormData() {
        return {
            proxy: this.refs.proxy.value,
            proxyProtocol: this.refs.proxyProtocol.value,
            proxyPort: this.refs.proxyPort.value
        }
    }

    renderTextInput(id, label, type) {
        return this.renderField(id, label,
                                <input type={type} className="form-control" id={id} ref={id}/>
        )
    }

    renderField(id, label, field) {
        return (
            <div className={$c('form-group', {'has-error': id in this.state.errors})}>
              <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
              <div className="col-sm-6">
                {field}
              </div>
            </div>
        );
    }

    renderSelect(id, label, values) {
        var options = values.map(function(value) {
            return <option value={value}>{value}</option>
        })
        return this.renderField(id, label,
                                <select className="form-control" id={id} ref={id}>
                                  {options}
                                </select>
        )
    }

    render() {
        return (
            <div>
              {this.renderTextInput('proxy', 'Proxy Address (leave blank for none)', "text")}
              {this.renderTextInput('proxyPort', 'Proxy Port', "number")}
              {this.renderSelect('proxyProtocol', 'Proxy Protocol', PROTOCOLS)}
              <Link to="/">Back</Link>
            </div>
        );
    }
}
