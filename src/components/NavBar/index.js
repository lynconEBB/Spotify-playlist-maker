import React, {Component} from 'react';
import './style.scss';
import NavBarItem from "../NavBarItem";
import logo from '../../assets/logo.png';

export default class NavBar extends Component{
    render() {
        return (
            <header className="nav-bar">
                <NavBarItem text="Sobre" link="#"/>
                <NavBarItem text="Sobre" link="#"/>
                <img src={logo} alt="logo"/>
                <NavBarItem text="Sobre" link="#"/>
                <NavBarItem text="Sobre" link="#"/>
            </header>
        )
    }
}