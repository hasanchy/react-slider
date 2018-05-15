import React, { Component } from 'react';

import SliderPipsHorizontal from './horizontal/SliderPipsHorizontal';
import SliderHandlesHorizontal from './horizontal/SliderHandlesHorizontal';
import SliderBarsHorizontal from './horizontal/SliderBarsHorizontal';

import SliderPipsVertical from './vertical/SliderPipsVertical';
import SliderHandlesVertical from './vertical/SliderHandlesVertical';
import SliderBarsVertical from './vertical/SliderBarsVertical';

class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderId: "slider" + Math.floor((Math.random() * 100000) + 1),
            sliderLength:0,
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
        var topHadleIndex = parseInt(this.props.topHadleIndex,10);
        this.setState({
            values: JSON.parse(JSON.stringify(this.props.value)),
            handleSettings: this.getHandleSettings(this.props.value),
            zIndex: this.getzIndex(topHadleIndex)
        })
    }

    componentDidMount(){
        var element = document.getElementById(this.state.sliderId);
        var sliderLength = 0

        if(element){
            sliderLength = (this.props.settings.orientation == "horizontal") ? element.clientWidth : element.clientHeight;
        }

        if( sliderLength > 0 ){
            this.setSliderLenght();
        }else{
            this.setState({
                intervalId: setInterval(this.setSliderLenght, 100)
            })
        }
    }

    getHandleBoundery(valueMin,valueMax){
        var min, max;
        if( this.props.settings.type == "segment" ){
            min = ( this.props.settings.handles && this.props.settings.handles.min) ? parseInt(this.props.settings.handles.min, 10) : valueMin-1;
            max = ( this.props.settings.handles && this.props.settings.handles.max ) ? parseInt(this.props.settings.handles.max, 10) : valueMax;
        }else{
            min = ( this.props.settings.handles && this.props.settings.handles.min) ? parseInt(this.props.settings.handles.min, 10) : valueMin;
            max = ( this.props.settings.handles && this.props.settings.handles.max ) ? parseInt(this.props.settings.handles.max, 10) : valueMax;
        }

        if( this.props.settings.range.margin ){
            var marginRange = parseInt( this.props.settings.range.margin, 10 );
            min += marginRange;
            max -= marginRange;
        }
        return({
            min:min,
            max:max
        })
    }

    getHandleSettings( value ){
        var handleSettings = []

        var valueMin = parseInt(this.props.settings.range.min, 10);
        var valueMax = parseInt(this.props.settings.range.max, 10);

        var handleBoundery = this.getHandleBoundery(valueMin,valueMax);

        var firstIndex = 0;
        var lastIndex = value.length-1;

        var marginHandle = ( this.props.settings.handles && this.props.settings.handles.margin ) ? parseInt(this.props.settings.handles.margin, 10) : 0;

        for( var i = firstIndex; i<=lastIndex; i++ ){
            var previousIndex = i - 1;
            var nextIndex = i + 1;

            var rangeMin = ( i === firstIndex ) ? handleBoundery['min'] : value[previousIndex] + marginHandle;
            var rangeMax = ( i === lastIndex ) ? handleBoundery['max'] : value[nextIndex] - marginHandle;
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

        if(!zIndex.length){
            for( var j = minIndex; j<= maxIndex; j++){
                zIndex.push(j);
            }
        }

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

        return zIndex;
    }

    setSliderLenght(){
        var element = document.getElementById(this.state.sliderId);
        var sliderLength = 0;
        if(element){
            sliderLength = (this.props.settings.orientation == "horizontal") ? element.clientWidth : element.clientHeight;
        }

        if(sliderLength > 0 ){
            this.setState({
                sliderLength:sliderLength
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

    renderPips(SliderPips){
        return <SliderPips sliderLength={this.state.sliderLength} min={this.props.settings.range.min} max={this.props.settings.range.max} density={this.props.settings.pips.density} onClick={this.handleValueClick.bind(this)}/>
    }

    renderBars(SliderBars){
        return <SliderBars positions={this.state.barPositions} color={this.props.settings.bars.colors} />
    }

    renderHandles(SliderHandles){
        var handles = [];

        for( var i in this.state.handleSettings ){
            handles.push(<SliderHandles key={i} type={this.props.settings.type} sliderLength={this.state.sliderLength} index={i} zIndex={this.state.zIndex[i]} value={this.state.handleSettings[i].value} valueMin={this.state.handleSettings[i].valueMin}
            valueMax={this.state.handleSettings[i].valueMax} rangeMin={this.state.handleSettings[i].rangeMin} rangeMax={this.state.handleSettings[i].rangeMax} onLoad={this.handleOnLoad.bind(this)} onDragStart={this.handleDragStart.bind(this)} onDrag={this.handleDrag.bind(this)} onDragEnd={this.handleDragEnd.bind(this)}/>)
        }

        return handles;
    }

    renderHorizontalSlider(){
        var pips,bars,handles;

        if( this.state.sliderLength > 0 ){
            pips = this.renderPips( SliderPipsHorizontal );
            bars = this.renderBars( SliderBarsHorizontal );
            handles = this.renderHandles( SliderHandlesHorizontal );
        }

        return(
            <div style={{height:"40px",width:"100%",backgroundColor:"#EDF2F4",borderRadius:"20px",position:"relative",border:"1px solid #e6ebed"}}>
                <div style={{height:"100%",position:"absolute", left:"17px", right:"17px"}} id={this.state.sliderId}>
                    {pips}
                    {bars}
                    {handles}
                </div>
            </div>
        )
    }

    renderVerticalSlider(){
        var pips,bars,handles;

        if( this.state.sliderLength > 0 ){
            pips = this.renderPips( SliderPipsVertical );
            bars = this.renderBars( SliderBarsVertical );
            handles = this.renderHandles( SliderHandlesVertical );
        }

        return(
            <div style={{height:"100%",width:"40px",backgroundColor:"#EDF2F4",borderRadius:"20px",position:"relative",border:"1px solid #e6ebed"}}>
                <div style={{width:"100%",position:"absolute", top:"17px", bottom:"17px"}} id={this.state.sliderId}>
                    {pips}
                    {bars}
                    {handles}
                </div>
            </div>
        )
    }

    render() {

        var sliderHtml = (this.props.settings.orientation == "horizontal") ? this.renderHorizontalSlider() : this.renderVerticalSlider();

        return (
            sliderHtml
        );
    }
}

export default Slider;
