import './dayplanner.css';
import React, { useEffect } from "react";


const Activities = () => {
    useEffect(()=>{
        var weather=localStorage.getItem('weatherCondition')
    })
    const activitiesByTemp = {
                Snow: [
                    "Skiing",
                    "Snowboarding",
                    "Ice skating",
                    "Hot springs/ sauna"
                    ],
        
                Mist: [
                    "Hiking",
                    "Mountain biking",
                    "Hunting",
                    "Football",
                    "Rugby",
                    "Soccer"
                    ],
        
                Rain:[
                    "Picnics",
                    "Gardening",
                    "Landscaping",
                    "Beach activities",
                    "Swimming",
                    "Paddleboarding",
                    "Kayaking",
                    "Outdoor concerts or festivals",
                    "Outdoor markets"
                    ],
            
                Clouds: [
                "Swimming",
                "Beach activities",
                "Outdoor yoga or exercise classes",
                "Barbecues or outdoor parties",
                "Visiting amusement parks or water parks",
                "Visiting the park"
                    ],
            
                Clear:[
                    "Visiting an indoor pool or water park",
                    "Visiting an indoor museum or art gallery",
                    "Catching movies at the movie theater",
                    "Eating ice cream"
                    ]
            };
        // const activityList = activitiesByTemp[0];
        // console.log(activitiesByTemp[0]);

    return(<>
      <h1>Weather: </h1>
      {/* {activityList}
      {activitiesByTemp[0]} */}
    </>
    )
}



export default Activities;

