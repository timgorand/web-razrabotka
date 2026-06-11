import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';
const TASKS_STORAGE_KEY = 'tasks-list-project-web';
const weatherApiKey = 'c7616da4b68205c2f3ae73df2c31d177';
function App() {
EURrate
});
// Определяем позицию пользователя
navigator.geolocation.getCurrentPosition(async position => {
const lat = position.coords.latitude;
const lon = position.coords.longitude;
// Получаем данные о погоде по широте и долготе
const weatherResponse = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon
}&appid=${weatherApiKey}`
);
}, []);
return (
<>
{loading && <p>Загрузка...</p>}
{!loading && error && <p style={{ color: 'red' }}>{error}</p>}
{!loading && !error && (
<>
<div id="USD">
Доллар США $ — {rates.USDrate} руб.
</div>
<div id="EUR">
Евро € — {rates.EURrate} руб.
</div>
{/* Отображение погоды */}
{weatherData && (
<div className="weather-info">
<h3>Погода в вашем регионе:</h3>
<p>Температура: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
</div>
)}
</>
)}
</>
);