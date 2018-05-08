import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderBarsVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    shouldComponentUpdate( nextProps, nextState ){
        return true;
		//return ( JSON.stringify(this.props) !== JSON.stringify(nextProps) ) ? true : false;
	}

    renderInnerBars(){
        var innerBars = [];
        for(var i in this.props.positions){
            var colorIndex = parseInt(i,10)+1;
            innerBars.push(<div key={Math.random()} style={{position:"absolute",width:"100%",top:this.props.positions[i],bottom:"0px",backgroundColor:this.props.color[colorIndex],borderRadius:"20px"}}></div>);
        }
        return innerBars;
    }

    renderBars(){
        return (
            <div style={{backgroundColor:"#FFFFFF",width:"8px",borderRadius:"20px",height:"100%",left:"16px",position:"absolute",border:"1px solid #e6ebed"}}>
                <div style={{position:"absolute",width:"100%",top:"0px",bottom:"0px",backgroundColor:this.props.color[0],borderRadius:"20px"}}></div>
                {this.renderInnerBars()}
            </div>
        )
    }

    render() {
        return this.renderBars();
    }
}

export default SliderBarsVertical;
