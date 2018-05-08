import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderPipsHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    shouldComponentUpdate( nextProps, nextState ){
        return (nextProps.sliderLength !== this.props.sliderLength) ? true : false;
    }

    getPipPosition(value){
        var min = parseInt(this.props.min, 10);
        var max = parseInt(this.props.max, 10);
        var sliderLength = parseInt(this.props.sliderLength, 10);
        return ( (value-min) / (max-min) ) * sliderLength;
    }

    handleValueClick(value, e){
        //console.log(e.target.value);
        //this.props.onClick(value)
    }

    renderPips(){
        var pipValue = []
        pipValue.push(parseInt(this.props.min, 10));
        pipValue.push(parseInt(this.props.max, 10));

        var pips = [];

        for( var i in pipValue ){
            var position = this.getPipPosition(pipValue[i]);
            pips.push(<div style={{left:position+"px",bottom:"0px",position:"absolute",padding:"3px 0px 3px 3px"}} key={Math.random()} onClick={this.handleValueClick.bind(this,pipValue[i])}>{pipValue[i]}</div>);
        }
        return pips;
    }

    render() {
        return (
            <div style={{width:"100%",marginTop:"68px",position:"absolute",textAlign:"top",fontSize:"11px",color:"#134F63",opacity:".5",marginLeft:"-10px"}}>
                {this.renderPips()}
            </div>
        )
    }
}

export default SliderPipsHorizontal;
