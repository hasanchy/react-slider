import React, { Component } from 'react';

class SliderScaleCell extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    //console.log(this.sliderScaleCell.clientWidth)
    var cellWidth = this.sliderScaleCell.clientWidth;
    var margin = "";
    var marginLeft;
    var marginTop = "0";

    if(this.props.align === "first"){
      marginLeft = cellWidth;
      margin = "0px 0px 0px -"+marginLeft+"px";
    }else if(this.props.align === "lastBottom"){
        marginLeft = cellWidth;
    }else if(this.props.align === "lastTop"){
      marginLeft = cellWidth;
      margin = "-40px 0px 0px -"+marginLeft+"px";
    }else if(this.props.align === "lastLeft"){
      margin = "0px 0px 0px -55px";
    }else if(this.props.align === "lastRight"){
      margin = "0px 0px 0px -5px";
    }else{
      if( this.props.orientation === "vertical" ){
        margin = marginTop+"px 0px 0px -5px";
      }else{
        marginLeft = cellWidth/2;
        margin = marginTop+"px 0px 0px -"+marginLeft+"px";
      }

    }
    this.sliderScaleCell.style.margin = margin
  }

  getCellStyle(){
    var cellStyle;
    if( this.props.orientation === "vertical" ){
      cellStyle = {
        position:"absolute",
        top:this.props.position,
        fontSize:"10px"
      }
    }else{
      cellStyle = {
        position:"absolute",
        left:this.props.position,
        fontSize:"10px"
      }
    }
    return cellStyle;
  }

  render() {
    var value = this.props.value;
    if( this.props.label === "year" ){
      value = value + " year";
    }else if( this.props.label === "percentage" ){
      value = value + "%";
    }
    return (
      <span style={this.getCellStyle()} ref={(sliderScaleCell) => { this.sliderScaleCell = sliderScaleCell; }}>
      {value}
      </span>
    );
  }
}

export default SliderScaleCell;
