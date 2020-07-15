import React, {Component} from 'react';
import background from '../../assets/background.png';
import './style.scss';
import Button from "../Button";

class PresentationSection extends Component {
    render() {
        return (
            <section className="presentation-section">
                <img src={background} alt="Headphones on background"/>
                <div className="overlay">
                    <h1>Todas suas descobertas musicais em um uníco lugar!</h1>
                    <h2>Playlists automáticas e customizáveis feitas a partir dos uploads de seus canais de música favoritos.</h2>
                    <Button link='#'>Cadastre-se com seu Spotify</Button>
                </div>
            </section>
        );
    }
}

export default PresentationSection;