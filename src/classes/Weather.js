import { weatherApi } from "../api/weather.api.js";
import "./Weather.css";

export class Weather {
  constructor(location, unit = "metric") {
    this.location = location;
    this.unit = unit;
    this.data = null;
    this.init();
  }
  async init() {
    if (this.data) return this.data;
    const data = await this.fetchWeather(this.location, this.unit);
    this.resolvedAddress = data.resolvedAddress;
    this.data = data;
    return data;
  }
  async getData() {
    if (!this.data) await this.init();
    return this.data;
  }
  async getCurrentData() {
    const data = await this.getData();
    const current = data.currentConditions;
    return this.parse(current);
  }
  parse(data) {
    return {
      humidity: data.humidity,
      icon: data.icon,
      temp: data.temp,
      condition: data.conditions,
      address: this.resolvedAddress,
      date: data.datetimeEpoch,
    };
  }
  renderDay(day) {
    const display = document.createElement("div");

    display.classList.add("flex-col");
    display.innerHTML = `
    <h2>${day.address}</h2>
    <h3>${new Date(day.date * 1000).toLocaleDateString("en-US", { weekday: "long" })}</h3>
    <img width="60" src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Color/${day.icon}.svg" alt="${day.condition}" />
    <p><strong>${day.temp}°${this.unit === "metric" ? "C" : "F"}</strong> — ${day.condition}</p>
  `;
    return display;
  }
  async renderCurrent() {
    const currentData = await this.getCurrentData();
    return this.renderDay(currentData);
  }
  async renderForeCast() {
    const forecast = await this.getForecast();
    return forecast.map((day) => this.renderDay(day));
  }
  async getForecast() {
    const data = await this.getData();

    return [data.currentConditions, ...data.days.slice(1, 5)].map((day) =>
      this.parse(day),
    );
  }

  async fetchWeather(location, unit) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unit}&key=${weatherApi}&contentType=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Location not found");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error;
    }
  }
}
