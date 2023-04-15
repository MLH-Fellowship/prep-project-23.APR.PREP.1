function Essentials (props){
    if (props.today === "Sunny")  {
          return (
            <p>Make sure to bring sunscreen, sunglasses, a hat, and a water bottle for the sunny weather. Also, wear light and breathable clothing.</p>)
                        }
    else if (props.today === "Cloudy") {
        return (
          // <h1>Essentials</h1>
          <p>Bring a light jacket or sweater for potential temperature changes. also get sunglasses in case the clouds break and the sun comes out</p>)
                      }
    else if (props.today === "Rain") {
        return (
          // <h1>Essentials</h1>
          <p>Prepare for the rain with an umbrella or raincoat, waterproof footwear, and extra clothing layers.</p>)
                      }
    else if (props.today === "Snow") {
        return (
          // <h1>Essentials</h1>
          <p>Be ready for the snow with snow boots, warm and waterproof clothing layers like an insulated jacket and pants, gloves, hat, and scarf. </p>)
                      }
    else if (props.today === "Thunderstorm") {
        return (
          // <h1>Essentials</h1>
          <p>Stay indoors and avoid going outside until the storm passes. </p>)
                      }
    else if (props.today === "Drizzle" || props.today === "Mist") {
        return (
          // <h1>Essentials</h1>
          <p>Consider bringing a waterproof jacket or a raincoat to stay dry. It's also a good idea to have an umbrella</p>)
                      }
                      
    else {
      return <></>
    }
        }
    

export default Essentials;
    
