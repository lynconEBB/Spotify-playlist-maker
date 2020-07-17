import React, {Component} from 'react';
import './style.scss';


class ChannelIcon extends Component {
    constructor(props) {
        super(props);
        this.showPopOver = this.showPopOver.bind(this);
        this.hidePopOver = this.hidePopOver.bind(this);
        this.state = {
            popOverActive:false
        }
    }

    showPopOver() {
        this.setState({
            popOverActive: true
        });
    }

    hidePopOver() {
        this.setState({
            popOverActive:false
        })
    }

    render() {
        return (
            <div className='icon-container' onMouseEnter={this.showPopOver} onMouseLeave={this.hidePopOver}>
                <img src={this.props.img} alt={this.props.channelName}/>
                <div className={this.state.popOverActive?'pop-over':'pop-over-closed'} >
                    <span>{this.props.channelName}</span>
                </div>
            </div>
        );
    }
}

export default ChannelIcon;