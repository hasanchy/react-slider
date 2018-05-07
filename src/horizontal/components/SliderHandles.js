import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderHandles extends Component {

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

        // var obj = {
        //     value:this.state.value,
        //     position:this.state.position
        // }
        this.props.onLoad(this.props.index, this.state.value, this.state.position)
    }

    componentWillReceiveProps( nextProps ){
        /*var nextPropsValue = parseInt(nextProps.value, 10);
        if( nextPropsValue !== this.props.value ){

            var position = this.getPosition(nextPropsValue);
            this.setState({
                value:nextPropsValue,
                position: position
            })
        }*/


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
            // var obj = {
            //     value:this.state.value,
            //     position:this.state.position
            // }
            this.props.onDrag(this.props.index, this.state.value, this.state.position)
        }
    }

    getPosition(value){
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10)-1;
        var sliderHeight = parseInt(this.props.sliderHeight, 10);
        return ( (value-min) / (max-min) ) * sliderHeight;
    }

    getValue( postion ){
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10)-1;
        var sliderHeight = parseInt(this.props.sliderHeight, 10);

      	return ( Math.round( (max-min) * (postion/sliderHeight) ) + min );
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

    renderHandles(){
        var display = (this.state.drag)?"block":"block";
        var fontSize = (this.state.drag)?14:14;
        var fontMarginTop = (fontSize/2)+1;
        var maxValue = this.state.value + 1;
        return (
            <div style={{position:"absolute",left:this.state.position,cursor:"pointer",zIndex:this.state.zIndex}} id={this.state.handleId}>
                <div style={{width:"14px",height:"14px",backgroundColor:"white",border:"solid 7px #134F63",borderRadius:"50%",position:"absolute",top:"7px",marginLeft:"-13px",opacity:"1",transform:"scale(1)",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}></div>
                <div style={{height:"30px",width:"1px",backgroundColor:"#134F63",position:"absolute",left:"0.5px",marginTop:"35px"}}></div>
                <div style={{display:display,marginTop:"50px",marginLeft:"-10px",position:"absolute",fontSize:fontSize+"px",color:"#134F63",fontWeight:"bold",backgroundColor:"#FFFFFF"}}>{this.state.value}</div>
                <div style={{display:display,marginTop:"50px",marginLeft:"6px",position:"absolute",fontSize:fontSize+"px",color:"#134F63",fontWeight:"bold",backgroundColor:"#FFFFFF"}}>{maxValue}</div>
            </div>
        )
    }

    render() {
        return this.renderHandles();
    }
}

export default SliderHandles;
