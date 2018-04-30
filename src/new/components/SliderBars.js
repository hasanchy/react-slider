import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderBars extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    shouldComponentUpdate(){
        return true;
    }

    renderBars(){
        return (
            <div style={{backgroundColor:"#FFFFFF",width:"6px",borderRadius:"20px",height:"100%",left:"17px",position:"absolute",cursor:"pointer",border:"1px solid #e6ebed"}}>
                <div style={{position:"absolute",width:"100%",top:"0px",bottom:"0px",backgroundColor:"#20907D",borderRadius:"20px"}}></div>
                <div style={{position:"absolute",width:"100%",top:this.props.barPosition,bottom:"0px",backgroundColor:"#FFFFFF",borderRadius:"20px"}}></div>
            </div>
        )
    }

    render() {
        return this.renderBars();
    }
}

export default SliderBars;
