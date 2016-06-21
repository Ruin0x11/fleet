import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Tabs.css'

export default class Tabs extends Component {
    static propTypes = {
        selected: React.PropTypes.number,
        children: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.element
        ]).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({
            selected: index
        });
    }

    _renderTitles() {
        function labels(child, index) {
            let activeClass = (this.state.selected === index ? styles.active : '');
            return (
                <li key={index} className={styles.labels}>
                  <a href="#"
                     className={activeClass}
                     onClick={this.handleClick.bind(this, index)}>
                    {child.props.label}
                  </a>
                </li>
            );
        }
        return (
            <ul className={styles.labels}>
              {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }

    _renderContent() {
        return (
            <div>
              {this.props.children[this.state.selected]}
            </div>
        );
    }

    render() {
        return (
            <div className={styles.tabs}>
              {this._renderTitles()}
              {this._renderContent()}
            </div>
        );
    }
}

export class Pane extends Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired,
        children: React.PropTypes.element.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              {this.props.children}
            </div>
        );
    }
}
