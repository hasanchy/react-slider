import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderHandlesHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drag:false,
            pageX:0,
            handleId: "handle" + Math.floor((Math.random() * 100000) + 1),
            value:0,
            position:0,
            positionMin:0,
            positionMax:0,
            zIndex:0
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
            positionMax: positionMax,
            zIndex:this.props.zIndex
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

        this.props.onLoad(this.props.index, this.state.value, this.state.position)
    }

    componentWillReceiveProps( nextProps ){

        if(this.props.rangeMin !== nextProps.rangeMin || this.props.rangeMax !== nextProps.rangeMax || this.props.zIndex !== nextProps.zIndex){
            var rangeMin = parseInt(nextProps.rangeMin, 10);
            var rangeMax = parseInt(nextProps.rangeMax, 10);

            var positionMin = this.getPosition(rangeMin);
            var positionMax = this.getPosition(rangeMax);

            this.setState({
                positionMin: positionMin,
                positionMax: positionMax,
                zIndex: nextProps.zIndex
            })
        }
    }

    shouldComponentUpdate( nextProps, nextState ){
		return ( JSON.stringify(this.state) !== JSON.stringify(nextState) ) ? true : false;
	}

    componentDidUpdate( prevProps, prevState ){
        if(this.state.drag){
            this.props.onDrag(this.props.index, this.state.value, this.state.position)
        }
    }

    getPosition(value){
        var min = parseInt(this.props.valueMin, 10)-1;
        var max = parseInt(this.props.valueMax, 10);
        var sliderLength = parseInt(this.props.sliderLength, 10);
        return ( (value-min) / (max-min) ) * sliderLength;
    }

    getValue( postion ){
        var min = parseInt(this.props.valueMin, 10)-1;
        var max = parseInt(this.props.valueMax, 10);
        var sliderLength = parseInt(this.props.sliderLength, 10);

      	return ( Math.round( (max-min) * (postion/sliderLength) ) + min );
  	}

    handleDragStart(e){
        var pageX = this.getPageX(e);
        this.setState({
            drag:true,
            pageX:pageX
        });
        this.props.onDragStart(this.props.index, this.state.value, this.state.position)
    }

    handleDragMove(e){
        if(this.state.drag){
            var pageX = this.getPageX(e);
            var newPosition = this.state.position + (pageX - this.state.pageX);

            if( newPosition <= this.state.positionMin ){
                pageX = pageX + (this.state.positionMin - newPosition);
                newPosition = this.state.positionMin;
            }else if( newPosition >= this.state.positionMax ){
                pageX = pageX - (newPosition - this.state.positionMax);
                newPosition = this.state.positionMax;
            }
            var newValue = this.getValue(newPosition);

            this.setState({
                pageX:pageX,
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
            this.props.onDragEnd(this.props.index, this.state.value, this.state.position);
        }
    }

    getPageX( e ){
        var pageX;

        if(e.touches){
            pageX = e.touches[0].clientX;
        }else{
            pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        }

        return pageX;
    }

    renderCircle(){
        return <div style={{width:"14px",height:"14px",backgroundColor:"white",border:"solid 7px #134F63",borderRadius:"50%",position:"absolute",top:"7px",marginLeft:"-13px",opacity:"1",transform:"scale(1)",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}></div>
    }

    renderMarker(){
        return <div style={{zIndex:1,height:"30px",width:"1px",backgroundColor:"#134F63",position:"absolute",left:"0.5px",marginTop:"35px"}}></div>
    }

    renderValueLeft(){
        var value = ( this.state.value >= this.props.valueMin ) ? this.state.value : "";
            return <div style={{zIndex:0,width:"100px",textAlign:"right",display:'block',marginTop:"50px",marginLeft:"-100px",position:"absolute",fontSize:"14px",color:"#134F63",fontWeight:"bold"}}>
                <div style={{padding:"0px 5px 0px 5px",display:"inline",border:"0px solid #cccccc",backgroundColor:"#FFFFFF"}}>{value}</div>
            </div>
    }

    renderValueRight(){
        var value = this.state.value + 1;
        var value = ( (this.state.value + 1) <= this.props.valueMax ) ? (this.state.value + 1) : "";
        return <div style={{zIndex:0,width:"100px",display:'block',marginTop:"50px",marginLeft:"0px",position:"absolute",fontSize:"14px",color:"#134F63",fontWeight:"bold"}}>
            <div style={{padding:"0px 5px 0px 7px",display:"inline",border:"0px solid #cccccc",backgroundColor:"#FFFFFF"}}>{value}</div>
        </div>
    }

    renderHandles(){
        return (
            <div style={{position:"absolute",left:this.state.position,cursor:"pointer",zIndex:this.state.zIndex}} id={this.state.handleId}>
                {this.renderCircle()}
                {this.renderMarker()}
                {this.renderValueLeft()}
                {this.renderValueRight()}

            </div>
        )
    }

    render() {
        return this.renderHandles();
    }
}

export default SliderHandlesHorizontal;
