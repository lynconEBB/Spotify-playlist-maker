import React, {Component} from 'react';
import './style.scss';
import footerBackground from '../../assets/footerBackground.svg';

class Footer extends Component {
    render() {
        return (
            <div className='footer-wrapper'>
                <div className='footer-container'></div>
                <img src={footerBackground} alt='Footer Background'/>
                <div className='social-container'></div>
                <h3>Copyrigth© 2020 | Criado por Lyncon Baez</h3>
            </div>

        );
    }
}

export default Footer;