import React, { useEffect, useState, FC } from "react";
import styled from "styled-components";

const WeatherContainer = styled.div`
  padding: 15px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  text-align: center;
`;
const api_key = import.meta.env.VITE_API_KEY;
const Weather: FC = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
          );
          const res = await response.json();
          setWeather(res.list.slice(0, 5));
        });
      } catch (error) {
        console.error("error", error);
      }
    };

    getWeather();
  }, []);

  return (
    <WeatherContainer>
      <Title>Weather for the next 5 days</Title>
      {weather ? (
        <Container>
          {weather.map((item, index) => (
            <div key={index}>
              <p>Day {index + 1}</p>
              <p>{item.dt_txt}</p>
              <p>Temperature: {item.main.temp}</p>
            </div>
          ))}
        </Container>
      ) : (
        <p>Loading weather data...</p>
      )}
    </WeatherContainer>
  );
};

export default Weather;
