import React, { Component } from 'react';
import SliderPips from './SliderPips';
import SliderHandles from './SliderHandles';
import SliderBars from './SliderBars';

class SliderNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderId: "slider" + Math.floor((Math.random() * 100000) + 1),
            sliderHeight:0,
            handlePosition:250,
            value:30
        };
    }

    componentDidMount(){
        var sliderHeight = document.getElementById(this.state.sliderId).clientHeight;
        this.setState({
            sliderHeight: sliderHeight
        })
    }

    handleChange( obj ){
        this.setState({
            handlePosition: obj.position
        })
    }

    handleValueClick(value){
        this.setState({
            value: value
        })
    }

    renderPips(){
        return <SliderPips sliderHeight={this.state.sliderHeight} min="0" max="50" density="10" onClick={this.handleValueClick.bind(this)}/>
    }

    renderBars(){
        var position = this.state.handlePosition+"px";
        return <SliderBars barPosition={position}/>
    }

    renderHandles(){
        return <SliderHandles sliderHeight={this.state.sliderHeight} value={this.state.value} valueMin="0" valueMax="50" rangeMin="0" rangeMax="50" onLoad={this.handleChange.bind(this)} onDrag={this.handleChange.bind(this)}/>
    }

    renderVerticalSlider(){
        var pips,bars,handles;

        if( this.state.sliderHeight > 0 ){
            pips = this.renderPips();
            bars = this.renderBars();
            handles = this.renderHandles();
        }

        return(
            <div style={{height:"100%",width:"40px",backgroundColor:"#EDF2F4",float:"right",borderRadius:"20px",position:"relative",border:"1px solid #e6ebed"}}>
                <div style={{width:"100%",position:"absolute",top:"17px",bottom:"17px"}} id={this.state.sliderId}>
                    {pips}
                    {bars}
                    {handles}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{height:"100%", width:"80px"}}>
                {this.renderVerticalSlider()}
            </div>
        );
    }
}

export default SliderNew;
