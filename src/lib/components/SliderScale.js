import React, { Component } from 'react';
import SliderScaleCell from './SliderScaleCell';

class SliderScale extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){}

  shouldComponentUpdate(nextProps, nextState){
    return ( JSON.stringify(nextProps) !== JSON.stringify(this.props) ) ? true : false;
  }
  renderValue( scale, label ){
    return <SliderScaleCell key={Math.random()} value={scale.value} position={scale.position} align={scale.align} orientation={this.props.orientation} label={label}/>
  }

  renderScaleLabel(){

    var scales = [];
    if( this.props.mode === "segment" ){
      var lastAlign;
      if( this.props.orientation === "vertical" ){
        lastAlign = ( (this.props.pointer % 2) === 0 ) ? "lastLeft" : "lastRight";
      }else{
        lastAlign = ( (this.props.pointer % 2) === 0 ) ? "lastTop" : "lastBottom";
      }

      scales.push({value:this.props.range.min,position:this.props.getPositionFromValue(this.props.range.min),align:"first"});
      scales.push({value:this.props.range.max,position:this.props.getPositionFromValue(this.props.range.max),align:lastAlign});
    }else {

      var nextOne = this.props.range.min;
      var interval = Math.round( (this.props.range.max - this.props.range.min)*(this.props.settings.density/100) )
      for( var i=this.props.range.min; i<=this.props.range.max; i++ ){
        if( i === nextOne || i === this.props.range.max ){
          scales.push({value:i,position:this.props.getPositionFromValue(i),align:"center"});
          nextOne = nextOne + interval;
        }
      }
    }

    var info = [];
    for(var j in scales){
      info.push( this.renderValue(scales[j], this.props.settings.label ))
    }
    return info;
  }

  getScaleStyle(){
    var scaleStyle;
    if( this.props.orientation === "vertical" ){
      scaleStyle = {
        left:"40px",
        top:"-5px",
        position:"absolute",
        backgroundColor:"#ccc",
        width:"100%"
      }
    }else{
      scaleStyle = {
        top:"35px",
        position:"absolute",
        backgroundColor:"#ccc",
        width:"100%"
      }
    }

    return scaleStyle;
  }

  render() {
    return (
      <div style={this.getScaleStyle()}>
        {this.renderScaleLabel()}
      </div>
    );
  }
}

export default SliderScale;
