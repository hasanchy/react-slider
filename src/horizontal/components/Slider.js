import React, { Component } from 'react';
import SliderPips from './SliderPips';
import SliderHandles from './SliderHandles';
import SliderBars from './SliderBars';

class SliderHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderId: "slider" + Math.floor((Math.random() * 100000) + 1),
            sliderHeight:0,
            handlePosition:0,
            value:0,
            values:[],
            intervalId :false,
            handleSettings:[],
            zIndex:[],
            barPositions:[]
        };
    }

    componentWillMount(){
        var value = parseInt(this.props.value[0], 10);
        this.setState({
            value:value,
            values: this.props.value,
            handleSettings:this.getHandleSettings(this.props.value),
            zIndex:this.getzIndex(0)
        })
    }

    componentDidMount(){
        var element = document.getElementById(this.state.sliderId);
        if(element && element.clientWidth > 0 ){
            this.setClientWidth();
        }else{
            this.setState({
                intervalId: setInterval(this.setClientWidth, 100)
            })
        }
    }

    getHandleSettings( value ){
        var valueMin = parseInt(this.props.settings.range.min, 10);
        var valueMax = parseInt(this.props.settings.range.max, 10);

        var handleSettings = []

        var firstIndex = 0;
        var lastIndex = value.length-1;

        for( var i = firstIndex; i<=lastIndex; i++ ){
            var previousIndex = i - 1;
            var nextIndex = i + 1;

            var rangeMin = ( i === firstIndex ) ? valueMin+1 : value[previousIndex];
            var rangeMax = ( i === lastIndex ) ? valueMax-2 : value[nextIndex];
            var settingsObj = {
                value: value[i],
                valueMin: valueMin,
                valueMax: valueMax,
                rangeMin: rangeMin,
                rangeMax: rangeMax
            }

            handleSettings.push( settingsObj );
        }

        return handleSettings;
    }

    getzIndex(currentIndex){
        var zIndex = this.state.zIndex;
        var minIndex = 0;
        var maxIndex = this.props.value.length - 1;

        if(zIndex.length){
            var replacedzIndex = maxIndex;
            for(var i in zIndex){
                if(i == currentIndex){
                    replacedzIndex = zIndex[i];
                    zIndex[i] = maxIndex;
                    break;
                }
            }

            for(i in zIndex){
                if( i != currentIndex && zIndex[i] > replacedzIndex){
                    var nextIndex = zIndex[i] - 1;
                    zIndex[i] = nextIndex;
                }
            }
        }else{
            for( var j = minIndex; j<= maxIndex; j++){
                zIndex.push(j);
            }
        }
        return zIndex;
    }

    setClientWidth(){
        var element = document.getElementById(this.state.sliderId);
        if(element && element.clientWidth > 0 ){
            this.setState({
                sliderHeight:element.clientWidth
            })
            if(this.state.intervalId){
                clearInterval(this.state.intervalId);
            }
        }
    }

    handleValueClick(value){
        this.setState({
            value: value
        })
    }

    handleOnLoad(index, value, position){
        var barPositions = this.state.barPositions;
        barPositions[index] = position;
        this.setState({
            barPositions: barPositions
        })
    }

    handleDragStart( index, value, position ){
        this.setState({
            zIndex:this.getzIndex(parseInt(index,10))
        })
    }

    handleDrag( index, value, position ){
        var barPositions = this.state.barPositions;
        barPositions[index] = position;
        this.setState({
            barPositions: barPositions
        })
    }

    handleDragEnd(index, value, position){
        var values = this.state.values;
        values[index] = value;

        var barPositions = this.state.barPositions;
        barPositions[index] = position;
        this.setState({
            handleSettings:this.getHandleSettings(values,index),
            barPositions: barPositions
        })
        this.props.onDragEnd(values)
    }

    renderPips(){
        return <SliderPips sliderHeight={this.state.sliderHeight} min="0" max="10" density="10" onClick={this.handleValueClick.bind(this)}/>
    }

    renderBars(){
        var position = this.state.handlePosition+"px";
        return <SliderBars barPosition={position} positions={this.state.barPositions} color={this.props.settings.bars.colors} />
    }

    renderHandles(){
        var handles = [];
        for( var i in this.state.handleSettings ){
            handles.push(<SliderHandles key={i} sliderHeight={this.state.sliderHeight} index={i} zIndex={this.state.zIndex[i]} value={this.state.handleSettings[i].value} valueMin={this.state.handleSettings[i].valueMin}
            valueMax={this.state.handleSettings[i].valueMax} rangeMin={this.state.handleSettings[i].rangeMin} rangeMax={this.state.handleSettings[i].rangeMax} onLoad={this.handleOnLoad.bind(this)} onDragStart={this.handleDragStart.bind(this)} onDrag={this.handleDrag.bind(this)} onDragEnd={this.handleDragEnd.bind(this)}/>)
        }

        return handles;
    }

    renderHorizontalSlider(){
        var pips,bars,handles;

        if( this.state.sliderHeight > 0 ){
            pips = this.renderPips();
            bars = this.renderBars();
            handles = this.renderHandles();
        }

        return(
            <div style={{height:"100%",position:"absolute", left:"17px", right:"17px"}} id={this.state.sliderId}>
                {pips}
                {bars}
                {handles}
            </div>
        )
    }

    render() {
        return (
            <div style={{height:"width%",height:"40px",backgroundColor:"#EDF2F4",borderRadius:"20px",position:"relative",border:"1px solid #e6ebed"}}>
                {this.renderHorizontalSlider()}
            </div>
        );
    }
}

export default SliderHorizontal;
