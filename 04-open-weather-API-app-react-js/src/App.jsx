import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('patna');
  const [country, setCountry] = useState('IN');
  const [temp, setTemp] = useState(30);
  const [max_temp, setMax_temp] = useState(34);
  const [min_temp, setMin_temp] = useState(28);
  const [descp, setDescp] = useState('sunny');
  const [feels_like, setFeels_like] = useState(33);
  const [gd_lvl, setGd_lvl] = useState(244);
  const [humidity, setHumidity] = useState(50);
  const [pressure, setPressure] = useState(89);
  const [sea_lvl, setSea_lvl] = useState(897);
  const [wind_deg, setWind_deg] = useState(45);
  const [wind_spd, setWind_spd] = useState(43);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [date, setDate] = useState('');






  const api = {
    key: "edb635ccfd65bae10289896a8dcfd1b2",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const searchWeather = async (city) =>{
    const response = await fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    );
    const data = await response.json();
    paintUI(data);
    console.log(data);
    
  }

  const paintUI = (data) => {
    let date = new Date();

    setCity(data.name);
    setCountry(data.sys.country);
    setTemp(data.main.temp);
    setMax_temp(data.main.temp_max);
    setMin_temp(data.main.temp_min);
    setDescp(data.weather[0].description);
    setFeels_like(data.main.feels_like);
    setGd_lvl(data.main.grnd_level);
    setHumidity(data.main.humidity);
    setPressure(data.main.pressure);
    setSea_lvl(data.main.sea_level);
    setWind_deg(data.wind.deg);
    setWind_spd(data.wind.speed);
    setSunrise(unixTimeStampConvertor(data.sys.sunrise));
    setSunset(unixTimeStampConvertor(data.sys.sunset));
    setDate(date.toLocaleString());
  }

  const unixTimeStampConvertor = (timeStamp) =>{
    let date = new Date(timeStamp*1000);
    return date.toLocaleTimeString();
  }



  return (
    <>
      <div className="wrapper rounded-3xl w-80 bg-cyan-950 text-amber-400 h-screen m-auto p-6 flex flex-col items-center">
        <div className="srch flex w-full ">
          <input
            className="w-full bg-cyan-700  p-2 rounded-s-2xl outline-none pl-4"
            type="text"
            value={query}
            onInput={e=>{setQuery(e.target.value)}}
          />
          <button className="bg-cyan-700 flex justify-center items-center w-10 rounded-e-2xl"
          onClick={e=>searchWeather(query)}
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
        <div className="city mt-4 text-l text-yellow-100">{city}, {country}</div>
        <div className="temp ">
          <div className="main-temp text-3xl mt-2">
            {temp}°c
            <i className="fa-solid fa-temperature-low"></i>
          </div>
          <div className="flex gap-3">
            <div className="max text-red-500">H : {max_temp}°c</div>
            <div className="min text-blue-400">L : {min_temp}°c</div>
          </div>
        </div>
        <div className="descp text-2xl">{descp}</div>
        <div className="date text-indigo-300">{date}</div>

        <div className="sun flex mt-4 gap-3">
          <div className="rise text-yellow-300">
            Sunrise <i className="fa-solid fa-mountain-sun"></i> {sunrise}
          </div>
          <div className="set text-red-600">
            Sunset <i className="fa-solid fa-sun-plant-wilt"></i> {sunset}
          </div>
        </div>
        <div className="more-info flex flex-col text-sm mt-3 items-start">
          <div className="feels-like text-orange-400">
            feels like
            <i className="fa-solid fa-cat"></i>: {feels_like}°c
          </div>
          <div className="grd-lvl text-fuchsia-400">
            ground level
            <i className="fa-solid fa-arrow-up-from-water-pump"></i>: {gd_lvl}
          </div>
          <div className="hmdty text-cyan-300">
            Humidity
            <i className="fa-solid fa-droplet"></i>: {humidity}%
          </div>
          <div className="prsr text-green-400">
            pressure
            <i className="fa-regular fa-gem"></i>: {pressure} Npm<sup>2</sup>
          </div>
          <div className="sea-lvl text-blue-300">
            sea level
            <i className="fa-solid fa-water"></i>: {sea_lvl} MSL
          </div>
          <div className="deg text-purple-400">
            Wind degree
            <i className="fa-solid fa-wind"></i>: {wind_deg}°
          </div>
          <div className="spd text-lime-200">
            Wind speed
            <i className="fa-solid fa-gauge"></i>: {wind_spd}kmph
          </div>
        </div>
      </div>
    </>
  );
}

export default App
