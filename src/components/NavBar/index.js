import React, {Component} from 'react';
import './style.scss';
import logo from '../../assets/logo.png';
import DropDown from "../DropDown";


export default class NavBar extends Component{
    render() {
        return (
            <header className="nav-bar">
                <div className='logo-n-name'>
                    <img src={logo} alt="logo"/>
                    <p className='prod-name'>PromotionSpace</p>
                </div>
                <DropDown/>
            </header>
        )
    }
}