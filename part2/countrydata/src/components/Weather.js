import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = (capital) => {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: capital
    }

    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => { setWeatherData(response.data) })
  }, [capital])

  console.log(weatherData)
  
  return (
    <div>
      <p><b>temperature:</b> {weatherData.current.temperature} Celcius</p>
      <img src={weatherData.current.weather_icons} alt={weatherData.current.weather_descriptions} width="50" height="50"></img>
      <p><b>wind:</b> {weatherData.current.wind_speed} km/h direction {weatherData.current.wind_dir}</p>
    </div>
  )
}

export default Weather
