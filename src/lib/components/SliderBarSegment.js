import React, { Component } from 'react';

class SliderBarSegment extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){}

  shouldComponentUpdate(nextProps, nextState){
    var shouldUpdate = ( JSON.stringify(nextProps) !== JSON.stringify(this.props) ) ? true : false;
    return shouldUpdate;
  }

  render() {
    var barSegmentStyle={};
    if( this.props.orientation === "vertical" ){
      var top, bottom;
      if( this.props.direction === "rtl" ){
        top = 0;
        bottom = this.props.position;
      }else{
        top = this.props.position;
        bottom = 0;
      }

      barSegmentStyle = {
        top:top+"px",
        bottom:bottom+"px",
        width:"100%",
        backgroundColor:this.props.backgroundColor,
        position:"absolute"
      }
    }else{
      var left, right;
      if( this.props.direction === "rtl" ){
        left = 0;
        right = this.props.position;
      }else{
        left = this.props.position;
        right = 0;
      }

      barSegmentStyle = {
        left:left+"px",
        right:right+"px",
        height:"100%",
        backgroundColor:this.props.backgroundColor,
        position:"absolute"
      }
    }

    return <div style={barSegmentStyle}></div>
  }
}

export default SliderBarSegment;
