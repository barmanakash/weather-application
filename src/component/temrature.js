import React, { useState } from "react";

function Temperature() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) {
      alert("Enter city name");
      return;
    }

    try {
      const response = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      const data = await response.json();

      setWeather({
        city: city,
        temp: data.current_condition[0].temp_C,
        desc: data.current_condition[0].weatherDesc[0].value,
        humidity: data.current_condition[0].humidity,
        wind: data.current_condition[0].windspeedKmph,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1>Weather App</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid gray",
            marginTop: "10px",
          }}
        />

        <button
          onClick={getWeather}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>

        {weather && (
          <div style={{ marginTop: "20px" }}>
            <h2>{weather.city}</h2>

            <h1>{weather.temp}°C</h1>

            <p>{weather.desc}</p>

            <p>
              <strong>Humidity:</strong> {weather.humidity}%
            </p>

            <p>
              <strong>Wind:</strong> {weather.wind} km/h
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Temperature;