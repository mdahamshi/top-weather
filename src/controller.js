import { Model } from "./model";
import { View } from "./view";

const form = document.getElementById("locationForm");
const loading = document.getElementById("loading");

export class Controller {
  constructor(appName) {
    this.model = new Model();
    this.view = new View(appName);
    this.init();
    this.initEvents();
  }

  async init() {
    try {
      loading.hidden = false;
      const weather = await this.model.getWeather();
      this.view.renderWeather(weather);
    } catch (error) {
      this.view.showMessage(error);
    } finally {
      loading.hidden = true;
    }
  }

  initEvents() {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.view.disableButton();
      const input = document.getElementById("locationInput");
      const location = input.value.trim();
      if (!location) return;
      const unit = form.unit.value;
      loading.hidden = false;

      try {
        const weatherRaw = await this.model.getWeather(location, unit);

        this.view.renderWeather(weatherRaw);
        this.view.enableButton();
      } catch (err) {
        this.view.showMessage(err.message);
      } finally {
        loading.hidden = true;
      }
    });
  }
}
