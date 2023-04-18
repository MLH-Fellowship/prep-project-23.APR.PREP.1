import './essentials.css';

const Essentials = (props) =>{

const weatherConditions={
      Clear:'Protect yourself from the sun by wearing sunscreen, sunglasses, a hat, and carry a water bottle 😎',
      Clouds:'Make sure to grab sunglasses and a light jacket or sweater for potential temperature changes ⛅',
      Rain:'Prepare for the rain with an umbrella or raincoat, waterproof footwear, and extra clothing layers ☔',
      Snow:'Bundle up for the snowy weather! Wear a warm coat, hat, and gloves to stay warm ❄️ ',
      Thunderstorm:'Stay indoors and avoid going outside until the storm passes ⚡',
      Drizzle:"Ensure you stay dry by bringing along an umbrella and a waterproof jacket or raincoat🌧️ ",
      Mist:"Consider bringing an umbrella and a waterproof jacket or a raincoat to stay dry 🌫️ "
    }

  return (
    <div className='essentials'>
      <p><i>{weatherConditions[props.today]}</i></p>
    </div>
  );
};

export default Essentials;
    
