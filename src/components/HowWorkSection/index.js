import React, {Component} from 'react';
import './style.scss';
import screen1 from '../../assets/step1.svg';
import screen2 from '../../assets/step2.svg';
import screen3 from '../../assets/step3.svg';

class HowWorkSection extends Component {
    render() {
        return (
            <div className='howwork-container'>
                <h1>Como Funciona?</h1>
                <div className='howwork-items'>
                    <div className='howwork-item'>
                        <p>1. Conecte em sua conta do Spotify.</p>
                        <img src={screen1} alt='Tela de autorização Spotify'/>
                    </div>
                    <div className='howwork-item'>
                        <p>2.Escolha de quais canais deseja que sua playlist receba as músicas.</p>
                        <img src={screen2} alt='Tela de seleção de canais'/>
                    </div>
                    <div className='howwork-item'>
                        <p>3.Curta todas as músicas de seus canais em uma única playlist. </p>
                        <img src={screen3} alt='Tela com a playlist gerada'/>
                    </div>

                </div>
            </div>
        );
    }
}

export default HowWorkSection;