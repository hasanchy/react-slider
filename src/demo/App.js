import React from 'react';
import Slider from '../lib';

var sliderSettings = {
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
        colors:[ 'red','green', 'green', 'red', 'grey' ]
      }
    }
    var value = [0];

function handleDragMove(value){


}

function handleDragEnd(value){
console.log(value)
}
const App = () => (

  <div style={{padding:"50px"}}>
    <Slider value={value} settings={sliderSettings} onDragMove={handleDragMove} onDragEnd={handleDragEnd}/>
  </div>
);

export default App;
