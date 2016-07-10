import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Settings.css';

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
        proxy: PropTypes.string.isRequired
    }

    static defaultProps = {
        proxy: ""
    }

    constructor(props) {
        super(props);

        this.state = {
            proxy: props.proxy
        }
    }

    getFormData() {
        return {
            proxy: this.refs.proxy.getDOMNode().value
        }
    }

    renderTextInput(id, label, value) {
        return this.renderField(id, label,
                                <input type="text" className="form-control" id={id} ref={id} value={value}/>
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

    render() {
        return (
            <div>
              {this.renderTextInput('proxy', 'Proxy Address', this.state.proxy)}
              <Link to="/">Back</Link>
            </div>
        );
    }
}
