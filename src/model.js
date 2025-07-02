import { weatherApi } from "./api/weather.api.js";
import { Weather } from "./classes/Weather.js";
export class Model {
  constructor() {
    this.weatherApi = weatherApi;
    this.weather = new Weather("كفركنا");
    this.init();
  }
  async init() {
    this.current = await this.weather.getCurrentData();
  }

  getCurrentWeather() {
    const data = this.weather.getCurrentData();
    return data;
  }
  async getWeather(location = "كفركنا", unit = "metric") {
    this.weather = new Weather(location, unit);
    await this.weather.init();
    return this.weather;
  }
}
