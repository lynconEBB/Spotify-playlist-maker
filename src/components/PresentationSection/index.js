import React, {Component} from 'react';
import background from '../../assets/background.png';
import './style.scss';

class PresentationSection extends Component {
    render() {
        return (
            <section className="presentation-section">
                <img src={background} alt="Headphones on background"/>
                <div className="overlay"></div>
            </section>
        );
    }
}

export default PresentationSection;