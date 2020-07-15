import React, {Component} from 'react';
import './style.scss';

class Button extends Component {
    render() {
        return (
            <button onClick={() => {window.location.href = this.props.link}} className='anchor-button'>
                {this.props.children}
            </button>
        );
    }
}

export default Button;