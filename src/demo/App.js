import React from 'react';
//import Slider from '../lib';
//import SliderNew from '../new';
import Slider from '../final';

var sliderSettingsHorizontal = {
    type:"segment", //default, segment
    orientation:'horizontal', //'horizontal', 'vertical',
    direction:'ltr', //ltr,rtl (for vertical orientation:ltr=ttb, rtl=btt)
    range:{
        'min':0,
        'max':10
    },
    handles:{
        min:0,
        max:9,
        margin:2
    },
    pips:{
        density:100, //The density value controls how many pips are placed on one percent of the slider range. With the default value of 1, there is one pip per percent. For a value of 10, a pip is placed for every 10 percent.
        label:"" //year, %, $, €
    },
    bars:{
        colors:[ '#D25A53','#FFFFFF', '#20907D', '#20907D' ]
    }
}

var value = [0,9];

/*
var sliderSettingsVertical = {
    type:"default", //default, segment
    orientation:'vertical', //'horizontal', 'vertical',
    direction:'ltr', //ltr,rtl (for vertical orientation:ltr=ttb, rtl=btt)
    range:{
        'min':0,
        'max':100
    },
    handles:{
        min:10,
        max:90,
        margin: 1 //The minimum distance between the handles can be set using the margin option.,
    },
    pips:{
        density:10, //The density value controls how many pips are placed on one percent of the slider range. With the default value of 1, there is one pip per percent. For a value of 10, a pip is placed for every 10 percent.
        label:"" //year, %, $, €
    },
    bars:{
        colors:[ '#D25A53','#FFFFFF', '#20907D', '#20907D' ]
    }
}
*/

/*
var sliderSettingsOld = {
    mode:'segment', //range,segment
    scale:{
        density:10, //The density value controls how many pips are placed on one percent of the slider range. With the default value of 1, there is one pip per percent. For a value of 10, a pip is placed for every 10 percent.
        label:"%" //year, %, $, €
    },
    range:{
        'min':0,
        'max':10
    },
    orientation:'vertical', //'horizontal', 'vertical'
    direction:'ltr', //ltr,rtl (for vertical orientation:ltr=ttb, rtl=btt)
    margin:25, //The minimum distance between the handles can be set using the margin option.,
    bar:{
        colors:[ 'red','grey', 'green' ]
    }
}
*/

function handleDragMove(value){


}

function handleDragEnd(value){
    //console.log( "Slider value recieved" );
    //console.log(value)
}
const App = () => (

    <div>
        <div style={{border:"1px solid #efefef", width:"450px", height:"70px", padding:"15px",float:"left",position:"relative"}}>
            <Slider value={value} settings={sliderSettingsHorizontal} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>
        </div>
        {/*<div style={{border:"1px solid #efefef",padding:"20px 20px 20px 60px",height:"500px",float:"left",position:"relative"}}>
            <SliderNew value={value} settings={sliderSettingsVertical} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>
        </div>*/}
        <div style={{padding:"50px",height:"500px",float:"left"}}>
            {/*<Slider value={value} settings={sliderSettingsOld} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>*/}
        </div>
    </div>
);

export default App;
