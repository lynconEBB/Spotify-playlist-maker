import React, {Component} from 'react';
import arrow from '../../assets/arrow.svg';
import './style.scss';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: 'PT',
            menuOpen:false
        }
        this.openMenu = this.openMenu.bind(this);
        this.changeLang = this.changeLang.bind(this);
    }

    openMenu() {
        console.log("deu");
        const currentState =  this.state.menuOpen
        this.setState({menuOpen: !currentState});
    }

    changeLang(lang) {
        this.setState(
            {
                currentLang:lang,
                menuOpen:false
            }
        )
    }
    render() {
        return (
            <div>
                <button className='drop-down-button' onClick={this.openMenu}>
                    <img src={arrow} alt="Arrow"/>
                    {this.state.currentLang}
                </button>
                <ul className={this.state.menuOpen?'drop-down-menu':'drop-down-menu-closed'}>
                    <li className='drop-down-menu-item' onClick={() => this.changeLang('PT')}>PT</li>
                    <li className='drop-down-menu-item' onClick={() => this.changeLang('EN')}>EN</li>
                </ul>
            </div>
        );
    }
}

export default DropDown;