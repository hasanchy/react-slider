import React from 'react';
//import Slider from '../lib';
import SliderNew from '../new';

/*var sliderSettingsHorizontal = {
    mode:'range', //range,segment
    scale:{
        density:10, //The density value controls how many pips are placed on one percent of the slider range. With the default value of 1, there is one pip per percent. For a value of 10, a pip is placed for every 10 percent.
        label:"" //year, %, $, €
    },
    range:{
        'min':-100,
        'max':100
    },
    orientation:'horizontal', //'horizontal', 'vertical'
    direction:'ltr', //ltr,rtl (for vertical orientation:ltr=ttb, rtl=btt)
    margin:25, //The minimum distance between the handles can be set using the margin option.,
    bar:{
        colors:[ 'red','grey', 'green', 'red', 'grey' ]
    }
}*/

var sliderSettingsVertical = {
    mode:'range', //range,segment
    scale:{
        density:10, //The density value controls how many pips are placed on one percent of the slider range. With the default value of 1, there is one pip per percent. For a value of 10, a pip is placed for every 10 percent.
        label:"%" //year, %, $, €
    },
    range:{
        'min':0,
        'max':100
    },
    orientation:'vertical', //'horizontal', 'vertical'
    direction:'ltr', //ltr,rtl (for vertical orientation:ltr=ttb, rtl=btt)
    margin:25, //The minimum distance between the handles can be set using the margin option.,
    bar:{
        colors:[ 'green','white', 'red', 'red', 'grey' ]
    }
}


var value = [20,30];

function handleDragMove(value){


}

function handleDragEnd(value){
    console.log( "Slider value recieved" );
    console.log(value)
}
const App = () => (

    <div>
        <div style={{padding:"50px",height:"500px",float:"left"}}>
            <SliderNew value={value} settings={sliderSettingsVertical} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>
        </div>
        {/*<div style={{padding:"50px",height:"500px",float:"left"}}>
            <Slider value={value} settings={sliderSettingsVertical} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>
        </div>*/}
    </div>
);

export default App;
