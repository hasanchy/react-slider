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
            handlePosition:0,
            value:0
        };
    }

    componentWillMount(){
        var value = parseInt(this.props.value[0], 10);
        this.setState({
            value:value
        })
    }

    componentDidMount(){
        this.setClientHeight();
    }

    componentDidUpdate(){
        if( this.state.sliderHeight === 0 ){
            this.setClientHeight();
        }
    }

    setClientHeight(){
        var element = document.getElementById(this.state.sliderId);
        var clientHeight = (element) ? element.clientHeight : 0;
        this.setState({
            sliderHeight:clientHeight
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

    handleDragEnd(value){
        this.props.onDragEnd([value])
    }

    renderPips(){
        return <SliderPips sliderHeight={this.state.sliderHeight} min="0" max="100" density="10" onClick={this.handleValueClick.bind(this)}/>
    }

    renderBars(){
        var position = this.state.handlePosition+"px";
        return <SliderBars barPosition={position}/>
    }

    renderHandles(){
        return <SliderHandles sliderHeight={this.state.sliderHeight} value={this.state.value} valueMin="0" valueMax="100" rangeMin="0" rangeMax="100" onLoad={this.handleChange.bind(this)} onDrag={this.handleChange.bind(this)} onDragEnd={this.handleDragEnd.bind(this)}/>
    }

    renderVerticalSlider(){
        var pips,bars,handles;

        if( this.state.sliderHeight > 0 ){
            pips = this.renderPips();
            bars = this.renderBars();
            handles = this.renderHandles();
        }

        return(
            <div style={{height:"100%",width:"40px",backgroundColor:"#EDF2F4",float:"right",borderRadius:"20px",position:"relative",border:"1px solid #e6ebed",padding:"17px 0 17px 0"}}>
                <div style={{width:"100%",position:"relative",height:"100%"}} id={this.state.sliderId}>
                    {pips}
                    {bars}
                    {handles}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{height:"100%", width:"60px"}}>
                {this.renderVerticalSlider()}
            </div>
        );
    }
}

export default SliderNew;
