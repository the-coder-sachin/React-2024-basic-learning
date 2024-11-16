import { useEffect, useState } from 'react'
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
  const [visibility, setVisibility] = useState(8);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [date, setDate] = useState('');
  const [geoLocation, setGeoLocation] = useState(true);
  const [locationSearchingDelay, setLocationSearchingDelay] = useState(true);






  const api = {
    key: "edb635ccfd65bae10289896a8dcfd1b2",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const searchWeather = async (city) =>{
    setQuery('')
    const response = await fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    );
    const data = await response.json();
    paintUI(data);
    
  }

  const paintUI = (data) => {
    let date = new Date();

    setCity(data.name);
    setCountry(data.sys.country);
    setTemp(Math.round(data.main.temp));
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
    setVisibility(data.visibility)
  }

  const unixTimeStampConvertor = (timeStamp) =>{
    let date = new Date(timeStamp*1000);
    return date.toLocaleTimeString();
  }

  useEffect(() => {
    if(geoLocation){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
            let res = await fetch(url);
            let data = await res.json();
            paintUI(data);
            setLocationSearchingDelay(false)
          },
          (error) => {
            alert('please allow location permission')
            console.error("Error: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

    }

  }, [geoLocation])
  
  if(locationSearchingDelay){
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="bg-gray-800 cursor-pointer shadow-lg rounded-3xl p-8 max-w-md text-center transform hover:scale-105 transition duration-300">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-600 opacity-20"></div>
              <svg
                className="w-20 h-20 mx-auto text-blue-400 relative"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-2.708 2.708C2.05 18.052 1 15.15 1 12H0c0 4.418 3.582 8 8 8v-4a3.992 3.992 0 01-2-.709z"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-200 mt-6">
              Searching Your Location
            </h1>
            <p className="text-gray-400 mt-2">
              Please hold on while we find your location.
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="block h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="block h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                <span className="block h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }else{
    return (
      <>
        <div className="wrapper rounded-3xl w-full max-w-xl bg-gradient-to-br from-cyan-900 to-cyan-950 text-amber-400 h-[600px] m-auto p-6 flex flex-col items-center shadow-2xl">
          {/* Search Section */}
          <div className="srch flex w-full mb-4">
            <input
              className="w-full bg-cyan-700 p-3 rounded-l-2xl outline-none text-amber-200 placeholder-amber-300 shadow-inner "
              type="text"
              placeholder="Search city..."
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchWeather(query);
                }
              }}
              onInput={(e) => {
                setQuery(e.target.value);
                setGeoLocation(false);
              }}
            />
            <button
              className="bg-cyan-700 flex justify-center items-center w-12 rounded-r-2xl hover:bg-cyan-600 transition-all duration-200"
              onClick={() => searchWeather(query)}
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </div>

          {/* City and Temperature Info */}
          <div className="city text-lg font-semibold text-yellow-200 text-center">
            {city}, {country}
          </div>
          <div className="temp text-center mt-2">
            <div className="main-temp text-4xl font-bold text-amber-400 animate-pulse">
              {temp}°C <i className="fa-solid fa-temperature-low"></i>
            </div>
            <div className="flex justify-center gap-4 text-sm mt-2">
              <div className="max text-red-500">H: {max_temp}°C</div>
              <div className="min text-blue-400">L: {min_temp}°C</div>
            </div>
          </div>
          <div className="descp text-xl italic text-yellow-300 mt-2 text-center">
            {descp}
          </div>
          <div className="date text-sm text-indigo-300 mt-1 text-center">
            {date}
          </div>

          {/* Sunrise and Sunset Info */}
          <div className="sun flex justify-between mt-4 gap-4 w-full">
            <div className="rise flex items-center gap-2 text-yellow-300 text-sm">
              <i className="fa-solid fa-mountain-sun"></i> {sunrise}
            </div>
            <div className="set flex items-center gap-2 text-red-600 text-sm">
              <i className="fa-solid fa-sun-plant-wilt"></i> {sunset}
            </div>
          </div>

          {/* Additional Weather Info */}
          <div className="more-info flex justify-between mt-4 text-sm w-full">
            <div className="col flex flex-col gap-4">
              <div className="feels-like flex items-center gap-2 text-orange-400">
                <i className="fa-solid fa-cat"></i> Feels like: {feels_like}°C
              </div>
              <div className="grd-lvl flex items-center gap-2 text-fuchsia-400">
                <i className="fa-solid fa-arrow-up-from-water-pump"></i> Ground
                level: {gd_lvl}
              </div>
              <div className="hmdty flex items-center gap-2 text-cyan-300">
                <i className="fa-solid fa-droplet"></i> Humidity: {humidity}%
              </div>
              <div className="prsr flex items-center gap-2 text-green-400">
                <i className="fa-regular fa-gem"></i> Pressure: {pressure} N/m²
              </div>
            </div>
            <div className="col flex flex-col gap-4">
              <div className="sea-lvl flex items-center gap-2 text-blue-300">
                <i className="fa-solid fa-water"></i> Sea level: {sea_lvl} MSL
              </div>
              <div className="deg flex items-center gap-2 text-purple-400">
                <i className="fa-solid fa-wind"></i> Wind Degree: {wind_deg}°
              </div>
              <div className="spd flex items-center gap-2 text-lime-200">
                <i className="fa-solid fa-gauge"></i> Wind Speed: {wind_spd}{" "}
                km/h
              </div>
              <div className="visibility flex items-center gap-2 text-pink-300">
                <i className="fa-solid fa-eye-low-vision"></i> Visibility:{" "}
                {visibility} m
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      
    </>
  );
}

export default App
