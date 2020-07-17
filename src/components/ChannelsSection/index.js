import React, {Component} from 'react';
import './style.scss'
import ChannelIcon from "../ChannelIcon";
import xKitoLogo from '../../assets/xKito.png';
import dubstepGutterLogo from '../../assets/dubstepGutter.png';
import monsterCatLogo from '../../assets/monsterCat.png';
import proximtyLogo from '../../assets/proximity.png';
import trapNationLogo from '../../assets/trapNation.png';
import trapCityLogo from '../../assets/TrapCity.png';
import indieAirLogo from '../../assets/indieAir.png';
import suicideSheepLogo from '../../assets/suicideSheep.png';
import ukfLogo from '../../assets/ukf.png';
import waveMusicLogo from '../../assets/waveMusic.png';

class ChannelsSection extends Component {
    render() {
        return (
            <div className='channels-section'>
                <h3>Canais como os listados abaixo e muitos outros já estão disponíveis para fazer parte de suas playlists!</h3>
                <div className='channels-container'>
                    <ChannelIcon img={xKitoLogo} channelName='xKito'/>
                    <ChannelIcon img={indieAirLogo} channelName='Indie Air'/>
                    <ChannelIcon img={monsterCatLogo} channelName='Monster Cat'/>
                    <ChannelIcon img={dubstepGutterLogo} channelName='DubstepGutter'/>
                    <ChannelIcon img={proximtyLogo} channelName='Proximity'/>
                    <ChannelIcon img={trapCityLogo} channelName='Trap City'/>
                    <ChannelIcon img={trapNationLogo} channelName='Trap Nation'/>
                    <ChannelIcon img={suicideSheepLogo} channelName='Suicide Sheep'/>
                    <ChannelIcon img={ukfLogo} channelName='UKF'/>
                    <ChannelIcon img={waveMusicLogo} channelName='Wave Music'/>
                </div>
            </div>
        );
    }
}

export default ChannelsSection;