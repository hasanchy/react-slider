import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderPipsVertical extends Component {

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
        var min = parseInt(this.props.min, 10);
        var max = parseInt(this.props.max, 10);
        var density = parseInt(this.props.density, 10);

        var pips = [];

        var pipValue = min;
        var increament = density;
        while( pipValue <= max ){
            var position = this.getPipPosition(pipValue);
            pips.push(<div style={{top:position+"px",right:"0px",position:"absolute",padding:"3px 0px 3px 3px"}} key={Math.random()} onClick={this.handleValueClick.bind(this,pipValue)}>{pipValue}</div>);
            pipValue += increament;
        }
        return pips;
    }

    render() {
        return (
            <div style={{height:"100%",marginLeft:"-10px",position:"absolute",textAlign:"right",fontSize:"11px",color:"#134F63",opacity:".5",marginTop:"-10px"}}>
                {this.renderPips()}
            </div>
        )
    }
}

export default SliderPipsVertical;
