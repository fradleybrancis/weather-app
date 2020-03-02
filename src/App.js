import React from 'react';
import './App.css';
import weather from 'weather-gov-api';
import FontAwesome from 'react-fontawesome';
import Geocode from "react-geocode";
import Cloudy from './images/cloudy.svg';
import Fog from './images/fog.svg';
import FreezingRain from './images/freezing_rain.svg';
import Hail from './images/hail.svg';
import LightRain from './images/light_rain.svg';
import LightThunderstorm from './images/light_thunderstorms.svg';
import MostlyCloudy from './images/mostly_cloudy.svg';
import MostlySunny from './images/mostly_sunny.svg';
import Rain from './images/rain.svg';
import SlightCloudy from './images/slight_cloudy.svg';
import Snow from './images/snow.svg';
import Sunny from './images/sunny.svg';
import SunShowers from './images/sunshowers.svg';
import ThunderStorm from './images/thunderstorm.svg';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      city: '',
      state: '',
      temperature: '',
      text: '',
      shortForecast: '',
      images: {
        'Sunny': Sunny,
        'Cloudy': Cloudy,
        'Fog': Fog,
        'Freezing Rain': FreezingRain,
        'Hail': Hail,
        'Light Rain': LightRain,
        'Light Thunderstorm': LightThunderstorm,
        'Mostly Cloudy': MostlyCloudy,
        'Mostly Sunny': MostlySunny,
        'Rain': Rain,
        'Slight Cloudy': SlightCloudy,
        'Snow': Snow,
        'Sun Showers': SunShowers,
        'Thunderstorm': ThunderStorm,
      },
    };

    this.api = 'AIzaSyA86NiO-oBF0jsQmiwWD2VPJHFPRsoGzSA';
    this.updateText = this.updateText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    Geocode.setApiKey("AIzaSyA86NiO-oBF0jsQmiwWD2VPJHFPRsoGzSA");
  };

  updateText(e) {
    this.setState({ text: e.target.value });
  };

  handleSubmit() {
    const { text } = this.state;
    Geocode.fromAddress(text).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        weather.getForecast('default', lat, lng)
          .then(response => { 
            let info = response.data.properties.periods[0];
            this.setState({
              shortForecast: info.shortForecast,
              temperature: info.temperature,

            
            })
          })
          .catch(err => console.log(err))
          console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { temperature, shortForecast, images } = this.state;
    let d = new Date();
    let minutes = d.getMinutes();
    let hour = d.getHours();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dateStr = date + "/" + month + "/" + year;
    return (
      <div className="App">
        <div>{dateStr}</div>
        <div>{hour + ":" + minutes}</div>
        <div className="forecast">
          {
            !shortForecast &&
            <div>Search for a city to get a forecast</div>
          }
          {
            shortForecast &&
            <img src={images[shortForecast]} alt="" height="150px" width="150px"></img>
          }
          {
            temperature &&
            <h1>{temperature}&#176;</h1>
          }
        </div>
        <div>
          <label>
            <FontAwesome className="fa fa-search"></FontAwesome>
            <input type='text' placeholder='city' onChange={this.updateText} onSubmit={this.handleSubmit} />
            <button type='button' onClick={this.handleSubmit}>Go!</button>
          </label>
        </div>
      </div>
    )
  }
}

export default App;
