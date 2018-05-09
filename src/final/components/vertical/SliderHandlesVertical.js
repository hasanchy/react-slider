import React, { Component } from 'react';
//import SliderBar from './SliderBar';

class SliderHandlesVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drag:false,
            pageY:0,
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
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10);
        var sliderLength = parseInt(this.props.sliderLength, 10);
        return ( (value-min) / (max-min) ) * sliderLength;
    }

    getValue( postion ){
        var min = parseInt(this.props.valueMin, 10);
        var max = parseInt(this.props.valueMax, 10);
        var sliderLength = parseInt(this.props.sliderLength, 10);

        return ( Math.round( (max-min) * (postion/sliderLength) ) + min );
    }

    handleDragStart(e){
        var pageY = this.getPageY(e);
        this.setState({
            drag:true,
            pageY:pageY
        });
        this.props.onDragStart(this.props.index, this.state.value, this.state.position)
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
            this.props.onDragEnd(this.props.index, this.state.value, this.state.position);
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

    renderCircle(){
        return <div id={this.state.handleId} style={{cursor:"pointer",width:"28px", height:"28px",backgroundColor:"#134F63",border:"solid 0px #134F63",borderRadius:"50%",position:"absolute",left:"7px",marginTop:"-14px",opacity:"1",transform:"scale(1)",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div style={{borderRadius:"50%",backgroundColor:"#FFFFFF",width:"14px",height:"14px",top:"7px",left:"7px",position:"absolute"}}></div>
            </div>
    }

    renderMarker(){
        return <div style={{width:"16px",height:"1px",backgroundColor:"#134F63",position:"absolute",left:"-8px",marginTop:"-.5px"}}></div>
    }

    renderValue(){
        var display = (this.state.drag)?"block":"block";
        var fontSize = (this.state.drag)?16:14;
        var fontMarginTop = (fontSize/2)+1;
        return <div style={{display:display,marginTop:"-"+fontMarginTop+"px",right:"10px",position:"absolute",fontSize:fontSize+"px",color:"#134F63",fontWeight:"bold",backgroundColor:"#FFFFFF"}}>{this.state.value}</div>
    }

    renderHandles(){
        return (
            <div style={{position:"absolute",top:this.state.position,zIndex:this.state.zIndex}}>
                {this.renderCircle()}
                {this.renderMarker()}
                {this.renderValue()}
            </div>
        )
    }

    render() {
        return this.renderHandles();
    }
}

export default SliderHandlesVertical;
