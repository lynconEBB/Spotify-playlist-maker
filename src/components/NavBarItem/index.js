import React, {Component} from 'react';
import './style.scss'
class NavBarItem extends Component {
    render() {
        return (
            <a className='nav-bar-item' href={this.props.link}>{this.props.text}</a>
        );
    }
}

export default NavBarItem;