import React, { Component } from 'react';
import './Slider.css';

class SliderPointer extends Component {

    constructor(props) {
        super(props);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.state = {
            drag:false,
            pageX:0
        };
    }

    componentDidMount(){
        this.scrubber.addEventListener('mousedown', this.handleDragStart);
        this.scrubber.addEventListener('touchstart', this.handleDragStart);
        this.scrubber.addEventListener('touchmove', this.handleDragMove);
        this.scrubber.addEventListener('touchend', this.handleDragEnd);
        document.addEventListener('mousemove', this.handleDragMove);
        document.addEventListener('mouseup', this.handleDragEnd);
    }

    handleDragStart(e){
        var pageX = this.getPageX(e);
        this.setState({
            drag:true,
            pageX:pageX
        });
    }

    handleDragMove(e){
        if(this.state.drag){
            var pageX = this.getPageX(e);
            var newPosition = this.props.settings.position.current + (pageX - this.state.pageX);

            var limit1 = this.props.settings.position.min;
            var limit2 = this.props.settings.position.max;
            var obj;
            var limitPageX;

            if( newPosition < limit1 || newPosition > limit2 ){

                if( newPosition < limit1 ){
                    var a = limit1 - newPosition
                    limitPageX = pageX + a;

                    obj = {
                        index:this.props.settings.index,
                        position:limit1
                    }
                }else{
                    var b = newPosition - limit2
                    limitPageX = pageX - b;

                    obj = {
                        index:this.props.settings.index,
                        position:limit2
                    }
                }

                this.setState({
                    pageX:limitPageX
                })

                this.props.onDrag(obj)

            }else{

                //var margin =  pageX - this.state.pageX;

                this.setState({
                    pageX:pageX
                })
                obj = {
                    index:this.props.settings.index,
                    position:newPosition
                }
                this.props.onDrag(obj)
            }
        }
    }

    handleDragEnd(e){
        if(this.state.drag){
            this.setState({
                drag:false
            })
            this.props.onDragEnd();
        }
    }

    getPageX( e ){
        var pageX;

        if( this.props.orientation === "vertical" ){

            if(e.touches){
                pageX = e.touches[0].clientY;
            }else{
                pageX = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            }

        }else{
            if(e.touches){
                pageX = e.touches[0].clientX;
            }else{
                pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            }
        }

        return pageX;
    }

    renderPointerInfo(){
        if( typeof this.props.settings.value !== "undefined" && this.props.settings.value.length > 0 ){
            if(this.props.settings.mode === "segment" ){
                var valueStart = this.props.settings.value[0];
                var valueEnd = this.props.settings.value[1];

                if( this.props.orientation === "vertical" ){
                    return <div style={this.getPointerInfoStyle()}>
                        <div>{valueStart}</div>
                        <div style={{fontSize:"14px"}}>-</div>
                        <div>{valueEnd}</div>
                    </div>
                }else{
                    return <div style={this.getPointerInfoStyle()}>
                        <span>{valueStart}</span>
                        <span> &nbsp; </span>
                        <span style={{fontSize:"14px"}}>|</span>
                        <span> &nbsp; </span>
                        <span>{valueEnd}</span>
                    </div>
                }
            }else{
                var value = this.props.settings.value[0];
                return <div style={this.getPointerInfoStyle()}>
                    <span>{value}</span>
                </div>
            }
        }
    }

    getPointerInfoStyle(){
        var pointerInfoStyle = {}
        var top, left;

        if( this.props.orientation === "vertical" ){
            if(this.props.settings.mode === "segment" ){
                left = ( (this.props.settings.index % 2) === 0 ) ? "-65" : "-15"; //bottom = 12
                top = "-20";
            }else{
                left = "-65";
                top = "-5";
            }

        }else{
            if(this.props.settings.mode === "segment" ){
                top = ( (this.props.settings.index % 2) === 0 ) ? "-30" : "12"; //bottom = 12
            }else{
                top = "-30";
            }
            left = "-39";
        }

        pointerInfoStyle = {
            top:top+"px",
            width:"80px",
            height:"20px",
            color:"black",
            backgroundColor:"transparent",
            border:"none",
            fontSize:"10px",
            textAlign:"center",
            position:"absolute",
            left:left+"px",
            borderRadius:"3px"
        }
        return pointerInfoStyle;
    }

    getPointerStyle(){
        var pointerStyle={};
        if( this.props.orientation === "vertical" ){
            pointerStyle = {
                zIndex:this.props.settings.zIndex,
                top:this.props.settings.position.current + "px",
                overflow:"visible",
                width:"0px",
                height:"0px",
                backgroundColor:"grey",
                position:"absolute",
                left:"18px",
                cursor:"pointer"
            }
        }else{
            pointerStyle = {
                zIndex:this.props.settings.zIndex,
                left:this.props.settings.position.current + "px",
                overflow:"visible",
                width:"0px",
                height:"0px",
                backgroundColor:"grey",
                position:"absolute",
                top:"19px",
                cursor:"pointer"
            }
        }
        return pointerStyle;
    }

    getCircleStyle(){
        var circleStyle = {
            width:"24px",
            height:"24px",
            backgroundColor:"black",
            border:"solid 2px white",
            borderRadius:"50%",
            position:"absolute",
            top:"-14px",
            cursor:"pointer",
            opacity:"0.5",
            left:"-13px"
        }
        return circleStyle;
    }

    render() {
        return (
            <div ref={(scrubber) => { this.scrubber = scrubber; }} style={this.getPointerStyle()}>
                <div style={this.getCircleStyle()}></div>
                {this.renderPointerInfo()}
            </div>
        );
    }
}

export default SliderPointer;
