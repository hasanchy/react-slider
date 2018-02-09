import React, { Component } from 'react';
import SliderBarSegment from './SliderBarSegment';

class SliderBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors:{
				red: "#F77975",
				grey: "#D8DADC",
        darkGrey: "#626262",
				green: "#0A7C71",
        blue: "#48B0F7",
        black: "#000000",
        white: "#FFFFFF",
        orange: "#F8D053"
			}
    };
  }

  componentDidMount(){}

  renderBarSegments(){
    var barSegments = [];

    var baseColor = this.props.colors[0];
    barSegments.push( <SliderBarSegment key={Math.random()} orientation={this.props.orientation} direction={this.props.direction} position="0" backgroundColor={this.state.colors[baseColor]} />)
    for( var i in this.props.positions ){
      var colorIndex = parseInt(i, 10) + 1;
      var segmentColor = this.props.colors[colorIndex]
      barSegments.push( <SliderBarSegment key={Math.random()} orientation={this.props.orientation} direction={this.props.direction} position={this.props.positions[i]} backgroundColor={this.state.colors[segmentColor]} />)
    }

    return barSegments;
  }

  getBarStyle(){
    var barStyle={};
    if( this.props.orientation === "vertical" ){
      barStyle = {
      	width:"16px",
      	height:"100%",
      	backgroundColor:this.state.colors.grey,
      	position:"absolute",
      	left:"10px",
      	borderRadius:"3px",
      	border:"1px solid grey"
      }
    }else {
      barStyle = {
      	width:"100%",
      	height:"16px",
      	backgroundColor:this.state.colors.grey,
      	position:"absolute",
      	top:"10px",
      	borderRadius:"3px",
      	border:"1px solid grey"
      }
    }
    return barStyle;
  }

  render() {
    return (
      <div style={this.getBarStyle()}>
        {this.renderBarSegments()}
      </div>
    );
  }
}

export default SliderBar;
