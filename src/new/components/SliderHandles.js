import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderHandles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drag:false,
            pageY:0,
            handleId: "handle" + Math.floor((Math.random() * 100000) + 1),
            value:0,
            position:0,
            positionMin:0,
            positionMax:0
        };
    }
    componentWillMount(){
        var value = parseInt(this.props.value, 10);
        var rangeMin = parseInt(this.props.rangeMin, 10);
        var rangeMax = parseInt(this.props.rangeMax, 10);

        var position = this.getPosition(value);
        var positionMin = this.getPosition(rangeMin);
        var positionMax = this.getPosition(rangeMax);
        this.setState({
            value:value,
            position: position,
            positionMin: positionMin,
            positionMax: positionMax
        })
    }
    componentDidMount(){
        var that = this;
        document.getElementById( this.state.handleId ).addEventListener('mousedown', function(e) {
            e.preventDefault();
            that.handleDragStart(e);
        }, false);

        document.addEventListener('mousemove', function(e) {
            e.preventDefault();
            that.handleDragMove(e);
        }, false);

        document.addEventListener('mouseup', function(e) {
            e.preventDefault();
            that.handleDragEnd(e);
        }, false);


        document.getElementById( this.state.handleId ).addEventListener('touchstart', function(e) {
            e.preventDefault();
            that.handleDragStart(e);
        }, false);

        document.getElementById( this.state.handleId ).addEventListener('touchmove', function(e) {
            e.preventDefault();
            that.handleDragMove(e);
        }, false);

        document.getElementById( this.state.handleId ).addEventListener('touchend', function(e) {
            e.preventDefault();
            that.handleDragEnd(e);
        }, false);

        var obj = {
            value:this.state.value,
            position:this.state.position
        }
        this.props.onLoad(obj)
    }

    componentWillReceiveProps( nextProps ){
        var nextPropsValue = parseInt(nextProps.value, 10);
        //console.log( nextPropsValue + " = " + this.props.value );
        if( nextPropsValue !== this.props.value ){

            var position = this.getPosition(nextPropsValue);
            this.setState({
                value:nextPropsValue,
                position: position
            })
        }
    }

    shouldComponentUpdate( nextProps, nextState ){
		return ( JSON.stringify(this.state) !== JSON.stringify(nextState) ) ? true : false;
	}

    componentDidUpdate( prevProps, prevState ){
        if(this.state.drag){
            var obj = {
                value:this.state.value,
                position:this.state.position
            }
            this.props.onDrag(obj)
        }
    }

    getPosition(value){
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10);
        var sliderHeight = parseInt(this.props.sliderHeight, 10);
        return ( (value-min) / (max-min) ) * sliderHeight;
    }

    getValue( postion ){
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10);
        var sliderHeight = parseInt(this.props.sliderHeight, 10);

      	return ( Math.round( (max-min) * (postion/sliderHeight) ) + min );
  	}

    handleDragStart(e){
        var pageY = this.getPageY(e);
        this.setState({
            drag:true,
            pageY:pageY
        });
    }

    handleDragMove(e){
        if(this.state.drag){
            var pageY = this.getPageY(e);
            var newPosition = this.state.position + (pageY - this.state.pageY);

            if( newPosition <= this.state.positionMin ){
                pageY = pageY + (this.state.positionMin - newPosition);
                newPosition = this.state.positionMin;
            }else if( newPosition >= this.state.positionMax ){
                pageY = pageY - (newPosition - this.state.positionMax);
                newPosition = this.state.positionMax;
            }
            var newValue = this.getValue(newPosition);

            this.setState({
                pageY:pageY,
                value:newValue,
                position: newPosition
            });
        }
    }

    handleDragEnd(e){
        if(this.state.drag){
            var position = this.getPosition(this.state.value);
            this.setState({
                drag:false,
                position:position
            })
            this.props.onDragEnded();
        }
    }

    getPageY( e ){
        var pageY;

        if(e.touches){
            pageY = e.touches[0].clientY;
        }else{
            pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return pageY;
    }

    renderHandles(){
        var display = (this.state.drag)?"block":"block";
        return (
            <div style={{position:"absolute",top:this.state.position,cursor:"pointer"}} id={this.state.handleId}>
                <div style={{width:"12px",height:"12px",backgroundColor:"white",border:"solid 7px #134F63",borderRadius:"50%",position:"absolute",left:"8px",marginTop:"-13px",opacity:"1",transform:"scale(1)",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}></div>
                <div style={{width:"16px",height:"1px",backgroundColor:"#134F63",position:"absolute",left:"-8px",marginTop:"-.5px"}}></div>
                <div style={{display:display,marginTop:"-7px",right:"10px",position:"absolute",fontSize:"14px",color:"#134F63",fontWeight:"bold",backgroundColor:"#FFFFFF"}}>{this.state.value}</div>
            </div>
        )
    }

    render() {
        return this.renderHandles();
    }
}

export default SliderHandles;
