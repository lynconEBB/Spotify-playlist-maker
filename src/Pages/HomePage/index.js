import React, {Component} from 'react';
import NavBar from "../../components/NavBar";
import PresentationSection from "../../components/PresentationSection";

export default class HomePage extends Component{
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <PresentationSection/>
            </React.Fragment>
        )
    }
}