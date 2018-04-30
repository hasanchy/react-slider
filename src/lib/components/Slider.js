import React, { Component } from 'react';
import SliderBar from './SliderBar';
import SliderScale from './SliderScale';
import SliderPointer from './SliderPointer';

class Slider extends Component {

    constructor(props) {
        super(props);
        this.setPosition = this.setPosition.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.getPositionFromValue = this.getPositionFromValue.bind(this);
        this.state = {
            pointerPositions:[],
            value:this.props.value,
            recentPointer:0
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentDidMount(){
        window.addEventListener('resize', this.setPosition);
        this.setPosition();
    }

    setPosition(){
        var positions = [];
        for( var i in this.state.value ){
            positions.push( this.getPositionFromValue(this.state.value[i]) )
        }
        this.setState({
            pointerPositions:positions
        })
    }

    getPositionFromValue( value ){
        if( typeof this.sliderBar !== "undefined"){
            var clientValue = (this.props.settings.orientation === "vertical" )?this.sliderBar.clientHeight:this.sliderBar.clientWidth;
            return ((value -this.props.settings.range.min)/(this.props.settings.range.max-this.props.settings.range.min)) * clientValue;
        }
    }

    getValueFromPosition( postion ){
        var clientValue = (this.props.settings.orientation === "vertical" )?this.sliderBar.clientHeight:this.sliderBar.clientWidth;
        if(this.props.settings.mode === "segment" ){
            return ( Math.round( (this.props.settings.range.max-this.props.settings.range.min) * (postion/clientValue) ) + this.props.settings.range.min );
        }else{
            return ( Math.floor( (this.props.settings.range.max-this.props.settings.range.min) * (postion/clientValue) ) + this.props.settings.range.min );
        }

    }

    handlePositionChange( obj ){
        var positions = this.state.pointerPositions;
        var value = this.state.value.slice();
        var index = obj.index;
        var position = obj.position;

        //var position = positions[index] + margin;
        positions[index] = position;
        value[index] = this.getValueFromPosition(position);

        //console.log( JSON.stringify(value) )
        //console.log( JSON.stringify(this.state.value) );
        if( JSON.stringify(value) !== JSON.stringify(this.state.value) ){
            this.props.onDragMove( value );
        }
        this.setState({
            pointerPositions:positions,
            value:value,
            recentPointer:index
        });
    }

    handleDragEnd(){
        this.props.onDragEnd( this.state.value );
    }

    renderSliderPointers(){
        var sliderPointers = [];
        for( var i in this.state.pointerPositions ){
            var index = parseInt( i, 10);
            var prevIndex = index-1;
            var nextIndex = index+1;
            var maxIndex = this.state.pointerPositions.length - 1;
            var clientValue = (this.props.settings.orientation === "vertical" )?this.sliderBar.clientHeight:this.sliderBar.clientWidth;

            var min = (index===0) ? 0 : this.state.pointerPositions[prevIndex];
            var max = ( index === maxIndex ) ? clientValue : this.state.pointerPositions[nextIndex];
            var zIndex = ( i === this.state.recentPointer ) ? "1":"auto";

            var value = [];
            if( this.state.value[i] === this.props.settings.range.min || this.state.value[i] === this.props.settings.range.max ){
                value = [ this.state.value[i], this.state.value[i]]
            }else{
                var minValue = this.state.value[i];
                var maxValue = this.state.value[i] + 1;
                value = [minValue, maxValue]
            }

            var settings = {
                index:i,
                position:{
                    current:this.state.pointerPositions[i],
                    min:min,
                    max:max
                },
                zIndex:zIndex,
                value:value,
                mode:this.props.settings.mode
            }
            sliderPointers.push(<SliderPointer key={i} settings={settings} orientation={this.props.settings.orientation} onDrag={this.handlePositionChange} onDragEnd={this.handleDragEnd}/>)
        }
        return sliderPointers;
    }

    renderSliderScale(){
        var clientLength = 0;
        if(this.sliderBar){
            clientLength = (this.props.settings.orientation === "vertical" )?this.sliderBar.clientHeight:this.sliderBar.clientWidth;
        }
        return <SliderScale orientation={this.props.settings.orientation} settings={this.props.settings.scale} lenght={clientLength} mode={this.props.settings.mode} range={this.props.settings.range} pointer={this.state.pointerPositions.length} getPositionFromValue={this.getPositionFromValue}/>
    }

    renderSliderBar(){
        return <SliderBar orientation={this.props.settings.orientation} colors={this.props.settings.bar.colors} positions={this.state.pointerPositions} direction={this.props.settings.direction}/>
    }

    getSliderStyle(){
        var sliderStyle = {};
        if( this.props.settings.orientation === "vertical"){
            sliderStyle = {
                width:"40px",
                height:"100%",
                marginLeft:"10px",
                marginRight:"10px",
                WebkitUserSelect:"none",
                MozUserSelect:"none",
                position:"relative"
            }
        }else{
            sliderStyle = {
                width:"100%",
                height:"40px",
                marginTop:"10px",
                marginBottom:"10px",
                WebkitUserSelect:"none",
                MozUserSelect:"none",
                position:"relative"
            }
        }
        return sliderStyle;
    }

    render() {
        return (
            <div style={this.getSliderStyle()} ref={(sliderBar) => { this.sliderBar = sliderBar; }}>
            {this.renderSliderBar()}
            {this.renderSliderPointers()}
            {this.renderSliderScale()}
            </div>
        );
    }
}

export default Slider;
